import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { Models } from '..';
import { getItemPrice } from './purchase.function';

/**
 * 予約データCSV変換
 */
export function reservation2report(
    reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[]) {
    const data: any[] = [];
    reservations.forEach((reservation) => {
        const customData = {
            bookingTime: reservation.bookingTime,
            bookingTimeJST: moment(reservation.bookingTime).format('YYYY/MM/DD/HH:mm'),
            id: reservation.id,
            reservationNumber: reservation.reservationNumber,
            reservationStatus: reservation.reservationStatus,
            price: (typeof reservation.price === 'number' || reservation.price === undefined)
                ? reservation.price
                : getItemPrice({ priceComponents: reservation.price.priceComponent }),
            priceComponent: (typeof reservation.price === 'number' || reservation.price === undefined)
                ? ''
                : reservation.price.priceComponent.map(p => {
                    const name = (typeof p.name === 'string')
                        ? p.name : (p.name?.ja === undefined)
                            ? '' : p.name.ja;
                    const referenceQuantityValue =
                        ((<any>p).referenceQuantity?.value) ? (<any>p).referenceQuantity.value : 1;
                    return `${name} (${p.priceCurrency} ${p.price} / ${referenceQuantityValue})`;
                }).join(', '),
            reservedTicket: reservation.reservedTicket,
            reservationFor: {
                ...reservation.reservationFor,
                startDateJST: moment(reservation.reservationFor.startDate).format('YYYY/MM/DD/HH:mm')
            },
            checkedIn: reservation.checkedIn,
            attended: reservation.attended
        };
        data.push(customData);
    });
    return data;
}

/**
 * 入力データを検索条件へ変換
 */
export function input2ReservationSearchCondition(params: {
    input: Models.Reservation.IReservationSearchConditions;
    theater?: factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom;
    page?: number;
    limit?: number;
}) {
    const input = params.input;
    const theater = params.theater;
    const page = params.page;
    const limit = params.limit;
    const result: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation> = {
        typeOf: factory.chevre.reservationType.EventReservation,
        bookingFrom: (input.reservationDateFrom === undefined)
            ? undefined
            : moment(moment(input.reservationDateFrom).format('YYYYMMDD')).toDate(),
        bookingThrough: (input.reservationDateThrough === undefined)
            ? undefined
            : moment(moment(input.reservationDateThrough).format('YYYYMMDD')).add(1, 'day').add(-1, 'millisecond').toDate(),
        reservationFor: {
            startFrom: (input.eventStartDateFrom === undefined)
                ? undefined
                : moment(moment(input.eventStartDateFrom).format('YYYYMMDD')).toDate(),
            startThrough: (input.eventStartDateThrough === undefined)
                ? undefined
                : moment(moment(input.eventStartDateThrough).format('YYYYMMDD')).add(1, 'day').add(-1, 'millisecond').toDate(),
            superEvent: {
                location: { branchCodes: (theater === undefined) ? [] : [theater.branchCode] }
            }
        },
        ids: (input.id === '')
            ? undefined : [input.id],
        reservationStatuses: (input.reservationStatus === '')
            ? undefined : [input.reservationStatus],
        reservationNumbers: (input.reservationNumber === '')
            ? undefined : [input.reservationNumber],
        limit,
        page,
        sort: {
            // reservationDate: factory.sortType.Descending
        }
    };
    return result;
}
