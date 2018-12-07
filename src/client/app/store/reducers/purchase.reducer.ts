import { factory } from '@cinerino/api-javascript-client';
import { IState } from '.';
import {
    createPaymentMethodFromType,
    createScreeningFilmEvents,
    isAvailabilityMovieTicket,
    IScreeningEventFilm,
    sameMovieTicketFilter
} from '../../functions';
import { IScreen, Reservation } from '../../models';
import {Actions, ActionTypes} from '../actions/purchase.action';

/**
 * IPurchaseState
 */
export interface IPurchaseState {
    movieTheaters: factory.organization.movieTheater.IOrganization[];
    movieTheater?: factory.organization.movieTheater.IOrganization;
    screeningEvents: factory.chevre.event.screeningEvent.IEvent[];
    screeningEvent?: factory.chevre.event.screeningEvent.IEvent;
    scheduleDate?: string;
    screeningFilmEvents: IScreeningEventFilm[];
    transaction?: factory.transaction.placeOrder.ITransaction;
    screeningEventOffers: factory.chevre.event.screeningEvent.IScreeningRoomSectionOffer[];
    screenData?: IScreen;
    reservations: Reservation[];
    screeningEventTicketOffers: factory.chevre.event.screeningEvent.ITicketOffer[];
    authorizeSeatReservation?: factory.action.authorize.offer.seatReservation.IAction;
    customerContact?: factory.transaction.placeOrder.ICustomerContact;
    authorizeCreditCardPayment?: factory.action.authorize.paymentMethod.creditCard.IAction;
    authorizeMovieTicketPayments: factory.action.authorize.paymentMethod.movieTicket.IAction[];
    gmoTokenObject?: any;
    orderCount: number;
    order?: factory.order.IOrder;
    checkMovieTicketActions: factory.action.check.paymentMethod.movieTicket.IAction[];
    checkMovieTicketAction?: factory.action.check.paymentMethod.movieTicket.IAction;
    authorizeAnyPayment?: factory.action.authorize.paymentMethod.any.IAction<any>;
    paymentMethod?: { name: string; typeOf: factory.paymentMethodType | string; };
    isUsedMovieTicket: boolean;
}

export interface IHistoryState {
    purchase: factory.order.IOrder[];
}

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(    state: IState,    action: Actions): IState {
    switch (action.type) {
        case ActionTypes.Delete: {
            state.purchase = {
                movieTheaters: [],
                screeningEvents: [],
                screeningFilmEvents: [],
                screeningEventOffers: [],
                reservations: [],
                screeningEventTicketOffers: [],
                orderCount: 0,
                checkMovieTicketActions: [],
                authorizeMovieTicketPayments: [],
                isUsedMovieTicket: false
            };
            return { ...state };
        }
        case ActionTypes.GetTheaters: {
            return { ...state, loading: true };
        }
        case ActionTypes.GetTheatersSuccess: {
            const movieTheaters = action.payload.movieTheaters;
            return { ...state, loading: false, error: null, purchase: { ...state.purchase, movieTheaters } };
        }
        case ActionTypes.GetTheatersFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.SelectTheater: {
            const movieTheater = action.payload.movieTheater;
            state.purchase.movieTheater = movieTheater;
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.GetSchedule: {
            const scheduleDate = action.payload.scheduleDate;
            state.purchase.scheduleDate = scheduleDate;
            return { ...state, loading: true };
        }
        case ActionTypes.GetScheduleSuccess: {
            const screeningEvents = action.payload.screeningEvents;
            const screeningFilmEvents = createScreeningFilmEvents({ screeningEvents });
            state.purchase.screeningEvents = screeningEvents;
            state.purchase.screeningFilmEvents = screeningFilmEvents;

            return { ...state, loading: false, error: null };
        }
        case ActionTypes.GetScheduleFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.SelectSchedule: {
            const screeningEvent = action.payload.screeningEvent;
            return {
                ...state, loading: false, purchase: {
                    ...state.purchase,
                    screeningEvent
                }
            };
        }
        case ActionTypes.StartTransaction: {
            return { ...state, loading: true };
        }
        case ActionTypes.StartTransactionSuccess: {
            state.purchase.transaction = action.payload.transaction;
            state.purchase.screeningEvents = [];
            state.purchase.movieTheaters = [];
            state.purchase.screeningFilmEvents = [];
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.StartTransactionFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.GetScreen: {
            return { ...state, loading: true };
        }
        case ActionTypes.GetScreenSuccess: {
            const screeningEventOffers = action.payload.screeningEventOffers;
            const screenData = action.payload.screenData;
            return {
                ...state, loading: false, error: null, purchase: {
                    ...state.purchase,
                    screeningEventOffers,
                    screenData
                }
            };
        }
        case ActionTypes.GetScreenFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.SelectSeats: {
            const reservations = state.purchase.reservations;
            action.payload.seats.forEach((seat) => {
                reservations.push(new Reservation({ seat }));
            });
            state.purchase.reservations = reservations;
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.CancelSeats: {
            const reservations: Reservation[] = [];
            const seats = action.payload.seats;
            state.purchase.reservations.forEach((reservation) => {
                const findResult = seats.find((seat) => {
                    return (reservation.seat.seatNumber === seat.seatNumber
                        && reservation.seat.seatSection === seat.seatSection);
                });
                if (findResult === undefined) {
                    reservations.push(reservation);
                }
            });
            state.purchase.reservations = reservations;
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.GetTicketList: {
            return { ...state, loading: true };
        }
        case ActionTypes.GetTicketListSuccess: {
            const screeningEventTicketOffers = action.payload.screeningEventTicketOffers;
            const movieTicketTypeOffers = screeningEventTicketOffers.filter((offer) => {
                const movieTicketTypeChargeSpecifications = offer.priceSpecification.priceComponent.filter((priceComponent) => {
                    return (priceComponent.typeOf === factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification);
                });
                return (movieTicketTypeChargeSpecifications.length > 0);
            });
            state.purchase.screeningEventTicketOffers = screeningEventTicketOffers;
            state.purchase.isUsedMovieTicket = (movieTicketTypeOffers.length > 0);
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.GetTicketListFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.SelectTickets: {
            const reservations: Reservation[] = [];
            const selectedReservations = action.payload.reservations;
            state.purchase.reservations.forEach((reservation) => {
                const findResult =
                    selectedReservations.find(selectedReservation => Object.is(reservation, selectedReservation));
                if (findResult === undefined) {
                    reservations.push(reservation);
                } else {
                    reservations.push(findResult);
                }
            });
            state.purchase.reservations = reservations;
            return { ...state };
        }
        case ActionTypes.TemporaryReservation: {
            return { ...state, loading: true };
        }
        case ActionTypes.TemporaryReservationSuccess: {
            const authorizeSeatReservation = action.payload.authorizeSeatReservation;
            return {
                ...state, loading: false, error: null, purchase: {
                    ...state.purchase,
                    authorizeSeatReservation
                }
            };
        }
        case ActionTypes.TemporaryReservationFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.RegisterContact: {
            return { ...state, loading: true };
        }
        case ActionTypes.RegisterContactSuccess: {
            const customerContact = action.payload.customerContact;
            return {
                ...state, loading: false, error: null, purchase: {
                    ...state.purchase,
                    customerContact
                }
            };
        }
        case ActionTypes.RegisterContactFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.AuthorizeCreditCard: {
            return { ...state, loading: true };
        }
        case ActionTypes.AuthorizeCreditCardSuccess: {
            const authorizeCreditCardPayment = action.payload.authorizeCreditCardPayment;
            const orderCount = state.purchase.orderCount + 1;
            return {
                ...state, loading: false, error: null, purchase: {
                    ...state.purchase,
                    authorizeCreditCardPayment,
                    orderCount
                }
            };
        }
        case ActionTypes.AuthorizeCreditCardFail: {
            const error = action.payload.error;
            const orderCount = state.purchase.orderCount + 1;
            state.purchase.orderCount = orderCount;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.AuthorizeMovieTicket: {
            return { ...state, loading: true };
        }
        case ActionTypes.AuthorizeMovieTicketSuccess: {
            state.purchase.authorizeMovieTicketPayments = action.payload.authorizeMovieTicketPayments;
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.AuthorizeMovieTicketFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.CheckMovieTicket: {
            return { ...state, loading: true };
        }
        case ActionTypes.CheckMovieTicketSuccess: {
            const checkMovieTicketAction = action.payload.checkMovieTicketAction;
            const checkMovieTicketActions = state.purchase.checkMovieTicketActions;
            const sameMovieTicketFilterResults = sameMovieTicketFilter({
                checkMovieTicketAction, checkMovieTicketActions
            });
            if (sameMovieTicketFilterResults.length === 0
                && isAvailabilityMovieTicket(checkMovieTicketAction)) {
                state.purchase.checkMovieTicketActions.push(checkMovieTicketAction);
            }

            return {
                ...state, loading: false, error: null, purchase: {
                    ...state.purchase,
                    checkMovieTicketAction: checkMovieTicketAction
                }
            };
        }
        case ActionTypes.CheckMovieTicketFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.Reserve: {
            return { ...state, loading: true };
        }
        case ActionTypes.ReserveSuccess: {
            const order = action.payload.order;
            state.purchase.order = order;
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.ReserveFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.Print: {
            return { ...state, loading: true };
        }
        case ActionTypes.PrintSuccess: {
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.PrintFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.GetPurchaseHistory: {
            return { ...state, loading: true };
        }
        case ActionTypes.GetPurchaseHistorySuccess: {
            const result = action.payload.result;
            return {
                ...state, loading: false, error: null, history: {
                    ...state.history,
                    purchase: result
                }
            };
        }
        case ActionTypes.GetPurchaseHistoryFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.OrderAuthorize: {
            return { ...state, loading: true };
        }
        case ActionTypes.OrderAuthorizeSuccess: {
            const authorizeOrder = action.payload.order;
            const historyData = state.history.purchase.map((order) => {
                if (order.orderNumber !== authorizeOrder.orderNumber) {
                    return order;
                }
                return authorizeOrder;
            });
            const history = state.history;
            history.purchase = historyData;

            return { ...state, loading: false, error: null, history };
        }
        case ActionTypes.OrderAuthorizeFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.AuthorizeAnyPayment: {
            return { ...state, loading: true };
        }
        case ActionTypes.AuthorizeAnyPaymentSuccess: {
            const authorizeAnyPayment = action.payload.authorizeAnyPayment;

            return {
                ...state, loading: false, error: null, purchase: {
                    ...state.purchase,
                    authorizeAnyPayment
                }
            };
        }
        case ActionTypes.AuthorizeAnyPaymentFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: JSON.stringify(error) };
        }
        case ActionTypes.SelectPaymentMethodType: {
            const paymentMethod = createPaymentMethodFromType({
                paymentMethodType: action.payload.paymentMethodType
            });
            state.purchase.paymentMethod = paymentMethod;

            return { ...state, loading: false, error: null };
        }
        default: {
            return state;
        }
    }
}
