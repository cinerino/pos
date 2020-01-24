import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { IMovieTicket } from '../models';

export interface IScreeningEventWork {
    info: factory.chevre.event.screeningEvent.IEvent;
    data: factory.chevre.event.screeningEvent.IEvent[];
}

export interface IGmoTokenObject {
    token: string;
    toBeExpiredAt: string;
    maskedCardNo: string;
    isSecurityCodeSet: boolean;
}

export interface IEventOrder {
    event: factory.chevre.event.screeningEvent.IEvent;
    data: factory.order.IAcceptedOffer<factory.order.IItemOffered>[];
}

/**
 * 作品別イベントへ変換
 */
export function screeningEventsToWorkEvents(params: {
    screeningEvents: factory.chevre.event.screeningEvent.IEvent[]
}) {
    const films: IScreeningEventWork[] = [];
    const screeningEvents = params.screeningEvents;
    screeningEvents.forEach((screeningEvent) => {
        const registered = films.find((film) => {
            return (film.info.superEvent.id === screeningEvent.superEvent.id);
        });
        if (registered === undefined) {
            films.push({
                info: screeningEvent,
                data: [screeningEvent]
            });
        } else {
            registered.data.push(screeningEvent);
        }
    });

    return films;
}

/**
 * GMOトークンオブジェクト生成
 */
export function createGmoTokenObject(params: {
    creditCard: {
        cardno: string;
        expire: string;
        holderName: string;
        securityCode: string;
    },
    seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;
}) {
    return new Promise<IGmoTokenObject>((resolve, reject) => {
        if (params.seller.paymentAccepted === undefined) {
            throw new Error('seller.paymentAccepted is undefined');
        }
        const findPaymentAcceptedResult = params.seller.paymentAccepted.find((paymentAccepted) => {
            return (paymentAccepted.paymentMethodType === factory.paymentMethodType.CreditCard);
        });
        if (findPaymentAcceptedResult === undefined
            || findPaymentAcceptedResult.paymentMethodType !== factory.paymentMethodType.CreditCard) {
            throw new Error('paymentMethodType CreditCard not found');
        }
        (<any>window).someCallbackFunction = function someCallbackFunction(response: {
            resultCode: string;
            tokenObject: IGmoTokenObject
        }) {
            if (response.resultCode === '000') {
                resolve(response.tokenObject);
            } else {
                reject(new Error(response.resultCode));
            }
        };
        const Multipayment = (<any>window).Multipayment;
        Multipayment.init((<any>findPaymentAcceptedResult).gmoInfo.shopId);
        Multipayment.getToken(params.creditCard, (<any>window).someCallbackFunction);
    });
}

/**
 * ムビチケ検索
 */
export function sameMovieTicketFilter(args: {
    checkMovieTicketActions: factory.action.check.paymentMethod.movieTicket.IAction[];
    checkMovieTicketAction: factory.action.check.paymentMethod.movieTicket.IAction;
}) {
    const checkMovieTicketAction = args.checkMovieTicketAction;
    const checkMovieTicketActions = args.checkMovieTicketActions;
    if (checkMovieTicketAction.result === undefined
        || checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut === null
        || checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut[0].ykknInfo === null) {
        return [];
    }
    const result: factory.action.check.paymentMethod.movieTicket.IAction[] = [];
    checkMovieTicketActions.forEach((action) => {
        if (action.result === undefined
            || action.result.purchaseNumberAuthResult.knyknrNoInfoOut === null
            || action.result.purchaseNumberAuthResult.knyknrNoInfoOut[0].ykknInfo === null) {
            return;
        }
        if (action.object.movieTickets[0].identifier !== checkMovieTicketAction.object.movieTickets[0].identifier) {
            return;
        }
        result.push(action);
    });

    return result;
}

/**
 * ムビチケ有効
 */
export function isAvailabilityMovieTicket(checkMovieTicketAction: factory.action.check.paymentMethod.movieTicket.IAction) {
    return (checkMovieTicketAction.result !== undefined
        && checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut !== null
        && checkMovieTicketAction.result.purchaseNumberAuthResult.knyknrNoInfoOut[0].ykknInfo !== null);
}

/**
 *  予約情報からムビチケ情報作成
 */
export function createMovieTicketsFromAuthorizeSeatReservation(args: {
    authorizeSeatReservation: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier>;
    pendingMovieTickets: IMovieTicket[];
    seller: factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>
}) {
    const results: factory.paymentMethod.paymentCard.movieTicket.IMovieTicket[] = [];
    const authorizeSeatReservation = args.authorizeSeatReservation;
    const pendingMovieTickets = args.pendingMovieTickets;
    const seller = args.seller;
    if (authorizeSeatReservation.result === undefined) {
        return [];
    }
    const pendingReservations =
        (<factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[]>
            (<any>authorizeSeatReservation.result.responseBody).object.reservations);

    pendingReservations.forEach((pendingReservation) => {
        if (pendingReservation.price === undefined
            || typeof pendingReservation.price === 'number') {
            return;
        }
        const findMovieTicketTypeChargeSpecification =
            pendingReservation.price.priceComponent.find(
                p => p.typeOf === factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification
            );
        if (findMovieTicketTypeChargeSpecification === undefined) {
            return;
        }
        const findPendingMovieTicket = pendingMovieTickets.find((pendingMovieTicket) => {
            return (pendingMovieTicket.id === authorizeSeatReservation.id);
        });
        if (findPendingMovieTicket === undefined) {
            return;
        }
        const findReservation = findPendingMovieTicket.movieTickets.find((movieTicket) => {
            const seatNumber = movieTicket.serviceOutput.reservedTicket.ticketedSeat.seatNumber;
            const seatSection = movieTicket.serviceOutput.reservedTicket.ticketedSeat.seatSection;
            return (pendingReservation.reservedTicket.ticketedSeat !== undefined
                && seatNumber === pendingReservation.reservedTicket.ticketedSeat.seatNumber
                && seatSection === pendingReservation.reservedTicket.ticketedSeat.seatSection);
        });
        if (findReservation === undefined) {
            return;
        }

        results.push({
            typeOf: factory.paymentMethodType.MovieTicket,
            project: seller.project,
            identifier: findReservation.identifier,
            accessCode: findReservation.accessCode,
            serviceType: findReservation.serviceType,
            serviceOutput: findReservation.serviceOutput
        });
    });

    return results;
}

/**
 * 支払い方法作成
 */
export function createPaymentMethodFromType(params: {
    paymentMethodType: factory.paymentMethodType;
    paymentMethodName?: 'RegiGrow';
}) {
    switch (params.paymentMethodType) {
        case factory.paymentMethodType.Cash: {
            return {
                paymentMethodType: params.paymentMethodType,
                name: 'common.paymentMethodType.cash'
            };
        }
        case factory.paymentMethodType.CreditCard: {
            return {
                paymentMethodType: params.paymentMethodType,
                name: 'common.paymentMethodType.creditCard'
            };
        }
        case factory.paymentMethodType.EMoney: {
            return {
                paymentMethodType: params.paymentMethodType,
                name: 'common.paymentMethodType.eMoney'
            };
        }
        case factory.paymentMethodType.Others: {
            return {
                paymentMethodType: params.paymentMethodType,
                paymentMethodName: params.paymentMethodName,
                name: (params.paymentMethodName === 'RegiGrow')
                    ? 'common.paymentMethodType.regiGrow'
                    : 'common.paymentMethodType.others'
            };
        }
        default: {
            return {
                paymentMethodType: params.paymentMethodType,
                name: 'common.paymentMethodType.others'
            };
        }
    }
}

/**
 * 券種金額取得
 */
export function getTicketPrice(
    ticket: factory.chevre.event.screeningEvent.ITicketOffer
        | factory.order.IAcceptedOffer<factory.order.IItemOffered>
        | factory.action.authorize.offer.seatReservation.IAcceptedOffer4chevre
) {
    const result = {
        unitPriceSpecification: 0,
        videoFormatCharge: 0,
        soundFormatCharge: 0,
        movieTicketTypeCharge: 0,
        total: 0,
        single: 0
    };
    if (ticket.priceSpecification === undefined) {
        return result;
    }
    const priceComponent = (<factory.chevre.event.screeningEvent.ITicketPriceSpecification>ticket.priceSpecification).priceComponent;
    const priceSpecificationType = factory.chevre.priceSpecificationType;
    const unitPriceSpecifications = priceComponent.filter((s) => s.typeOf === priceSpecificationType.UnitPriceSpecification);
    const videoFormatCharges = priceComponent.filter((s) => s.typeOf === priceSpecificationType.VideoFormatChargeSpecification);
    const soundFormatCharges = priceComponent.filter((s) => s.typeOf === priceSpecificationType.SoundFormatChargeSpecification);
    const movieTicketTypeCharges = priceComponent.filter((s) => s.typeOf === priceSpecificationType.MovieTicketTypeChargeSpecification);

    result.unitPriceSpecification += unitPriceSpecifications[0].price;
    videoFormatCharges.forEach((videoFormatCharge) => {
        result.videoFormatCharge += videoFormatCharge.price;
    });
    soundFormatCharges.forEach((soundFormatCharge) => {
        result.soundFormatCharge += soundFormatCharge.price;
    });
    movieTicketTypeCharges.forEach((movieTicketTypeCharge) => {
        result.movieTicketTypeCharge += movieTicketTypeCharge.price;
    });
    result.total = result.unitPriceSpecification + result.videoFormatCharge + result.soundFormatCharge + result.movieTicketTypeCharge;
    const unitPriceSpecification = unitPriceSpecifications[0];
    if (unitPriceSpecification.typeOf === priceSpecificationType.UnitPriceSpecification) {
        const referenceQuantityValue = (unitPriceSpecification.referenceQuantity.value === undefined)
            ? 1
            : unitPriceSpecification.referenceQuantity.value;
        result.single = result.total / referenceQuantityValue;
    }

    return result;
}

/**
 * ムビチケ認証購入管理番号無効事由区分変換
 */
export function movieTicketAuthErroCodeToMessage(code?: string): { ja: string; en: string; } {
    const table = [
        { code: '01', ja: '存在無', en: 'no existence' },
        { code: '02', ja: 'PINｺｰﾄﾞ必須', en: 'PIN code required' },
        { code: '03', ja: 'PINｺｰﾄﾞ認証ｴﾗｰ', en: 'PIN code authentication error' },
        { code: '04', ja: '作品不一致', en: 'Work disagreement' },
        { code: '05', ja: '未ｱｸﾃｨﾍﾞｰﾄ', en: 'unactivated' },
        { code: '06', ja: '選択興行対象外', en: 'Not eligible for selection box' },
        { code: '07', ja: '有効期限切れ', en: 'expired' },
        { code: '08', ja: '座席予約期間外', en: 'outside the seat reservation period' },
        { code: '09', ja: 'その他', en: 'other' },
        { code: '11', ja: '座席予約開始前', en: 'Before starting seat reservation' },
        { code: '12', ja: '仮お直り購入番号数不一致', en: 'temporary redemption purchase number mismatch' }
    ];
    const findResult = table.find(data => data.code === code);
    return (findResult === undefined) ? { ja: 'その他', en: 'other' } : { ja: findResult.ja, en: findResult.en };
}


/**
 * 予約金額取得
 */
export function getAmount(
    authorizeSeatReservations: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier>[]
) {
    const amounts = authorizeSeatReservations.map(
        reservations => (reservations.result === undefined)
            ? 0
            : reservations.result.price
    );
    const amount = amounts.reduce((previousValue, currentValue) => previousValue + currentValue);

    return amount;
}

/**
 * イベント別オーダーへ変換
 */
export function orderToEventOrders(params: {
    order: factory.order.IOrder
}) {
    const results: IEventOrder[] = [];
    const order = params.order;
    order.acceptedOffers.forEach((acceptedOffer) => {
        const itemOffered = acceptedOffer.itemOffered;
        if (itemOffered.typeOf !== factory.chevre.reservationType.EventReservation) {
            return;
        }
        const registered = results.find((result) => {
            return (result.event.id === itemOffered.reservationFor.id);
        });
        if (registered === undefined) {
            results.push({
                event: itemOffered.reservationFor,
                data: [acceptedOffer]
            });
        } else {
            registered.data.push(acceptedOffer);
        }
    });

    // 公開日順（降順）へソート
    const sortResult = results.sort((a, b) => {
        if (a.event.workPerformed === undefined
            || b.event.workPerformed === undefined
            || a.event.workPerformed.datePublished === undefined
            || b.event.workPerformed.datePublished === undefined) {
            return 0;
        }
        const unixA = moment(a.event.workPerformed.datePublished).unix();
        const unixB = moment(b.event.workPerformed.datePublished).unix();
        if (unixA > unixB) { return -1; }
        if (unixA < unixB) { return 1; }
        return 0;
    });

    return sortResult;
}

/**
 * 座席予約をイベントごとに変換
 */
export function authorizeSeatReservationToEvent(params: {
    authorizeSeatReservations: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier>[]
}) {
    const results: {
        event: factory.chevre.event.screeningEvent.IEvent;
        reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[]
    }[] = [];
    const authorizeSeatReservations = params.authorizeSeatReservations;
    authorizeSeatReservations.forEach((authorizeSeatReservation) => {
        if (authorizeSeatReservation.result === undefined) {
            return;
        }
        const reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[] =
            (<any>authorizeSeatReservation.result.responseBody).object.reservations;
        reservations.forEach((reservation) => {
            const registered = results.find((result) => {
                return (result.event.id === reservation.reservationFor.id);
            });
            if (registered === undefined) {
                results.push({
                    event: reservation.reservationFor,
                    reservations: [reservation]
                });
            } else {
                registered.reservations.push(reservation);
            }
        });
    });

    return results;
}

/**
 * スケジュールステータス判定
 */
export function isScheduleStatusThreshold(
    screeningEvent: factory.chevre.event.screeningEvent.IEvent,
    status: 'success' | 'warning' | 'danger'
) {
    const limitSeatNumber = (screeningEvent.workPerformed === undefined
        || screeningEvent.workPerformed.additionalProperty === undefined)
        ? undefined : screeningEvent.workPerformed.additionalProperty.find(a => a.name === 'limitSeatNumber');
    let remainingAttendeeCapacity = screeningEvent.remainingAttendeeCapacity;
    let maximumAttendeeCapacity = screeningEvent.maximumAttendeeCapacity;
    if (remainingAttendeeCapacity === undefined || maximumAttendeeCapacity === undefined) {
        return false;
    }
    if (limitSeatNumber !== undefined && maximumAttendeeCapacity > Number(limitSeatNumber.value)) {
        // 作品追加特性（limitSeatNumber）で座席数制御
        remainingAttendeeCapacity = (remainingAttendeeCapacity < (maximumAttendeeCapacity - Number(limitSeatNumber.value)))
            ? 0 : remainingAttendeeCapacity - (maximumAttendeeCapacity - Number(limitSeatNumber.value));
        maximumAttendeeCapacity = Number(limitSeatNumber.value);
    }
    let result = false;
    const unit = environment.PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT;
    const value = Number(environment.PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE);
    if (unit === '%') {
        switch (status) {
            case 'success':
                result = (remainingAttendeeCapacity !== 0
                    && Math.floor(remainingAttendeeCapacity / maximumAttendeeCapacity * 100) >= value);
                break;
            case 'warning':
                result = (remainingAttendeeCapacity !== 0
                    && Math.floor(remainingAttendeeCapacity / maximumAttendeeCapacity * 100) < value
                    && remainingAttendeeCapacity > 0);
                break;
            case 'danger':
                result = remainingAttendeeCapacity === 0;
                break;
            default:
                break;
        }
        return result;
    } else if (unit === 'count') {
        switch (status) {
            case 'success':
                result = (remainingAttendeeCapacity !== 0
                    && remainingAttendeeCapacity >= value);
                break;
            case 'warning':
                result = (remainingAttendeeCapacity !== 0
                    && remainingAttendeeCapacity < value
                    && remainingAttendeeCapacity > 0);
                break;
            case 'danger':
                result = remainingAttendeeCapacity === 0;
                break;
            default:
                break;
        }
        return result;
    } else {
        return false;
    }
}

/**
 * 販売判定
 */
export function isSales(
    screeningEvent: factory.chevre.event.screeningEvent.IEvent,
    status?: 'window' | 'start' | 'end'
) {
    const offers = screeningEvent.offers;
    if (offers === undefined) {
        return false;
    }
    let result = false;
    switch (status) {
        case 'window':
            result = false;
            break;
        case 'start':
            result = !(moment(offers.validFrom).unix() < moment().unix());
            break;
        case 'end':
            result = !(moment(offers.validThrough).unix() > moment().unix());
            break;
        default:
            result = (moment(offers.validFrom).unix() < moment().unix()
                && moment(offers.validThrough).unix() > moment().unix());
            break;
    }
    return result;
}

/**
 * 座席指定あり判定
 */
export function isTicketedSeatScreeningEvent(screeningEvent: factory.chevre.event.screeningEvent.IEvent) {
    return (screeningEvent.offers !== undefined
        && screeningEvent.offers.itemOffered.serviceOutput !== undefined
        && screeningEvent.offers.itemOffered.serviceOutput.reservedTicket !== undefined
        && screeningEvent.offers.itemOffered.serviceOutput.reservedTicket.ticketedSeat !== undefined);
}

/**
 * 券種情報を枚数別へ変換
 */
export function changeTicketCount(
    acceptedOffer: factory.chevre.event.screeningEvent.ITicketOffer[]
        | factory.action.authorize.offer.seatReservation.IAcceptedOffer4chevre[]
) {
    const result: {
        acceptedOffer: factory.chevre.event.screeningEvent.ITicketOffer
        | factory.action.authorize.offer.seatReservation.IAcceptedOffer4chevre;
        count: number
    }[] = [];
    acceptedOffer.forEach((a: factory.chevre.event.screeningEvent.ITicketOffer
        | factory.action.authorize.offer.seatReservation.IAcceptedOffer4chevre) => {
        const findResult = result.find(r => r.acceptedOffer.id === a.id);
        if (findResult === undefined) {
            result.push({ acceptedOffer: a, count: 1 });
        } else {
            findResult.count += 1;
        }
    });
    return result;
}

/**
 * 残席数取得
 */
export function getRemainingSeatLength(
    screeningEventOffers: factory.chevre.event.screeningEvent.IScreeningRoomSectionOffer[],
    screeningEvent: factory.chevre.event.screeningEvent.IEvent
) {
    let result = 0;
    const limitSeatNumber = (screeningEvent.workPerformed === undefined
        || screeningEvent.workPerformed.additionalProperty === undefined)
        ? undefined : screeningEvent.workPerformed.additionalProperty.find(a => a.name === 'limitSeatNumber');
    screeningEventOffers.forEach((s) => {
        const sectionResult = s.containsPlace.filter(c => {
            if (limitSeatNumber !== undefined) {
                // 作品追加特性（limitSeatNumber）で座席数制御
                return (c.offers !== undefined
                    && c.offers[0].availability === factory.chevre.itemAvailability.InStock
                    && Number(c.branchCode) <= Number(limitSeatNumber.value));
            }
            return (c.offers !== undefined
                && c.offers[0].availability === factory.chevre.itemAvailability.InStock);
        });
        result += sectionResult.length;
    });

    return result;
}
