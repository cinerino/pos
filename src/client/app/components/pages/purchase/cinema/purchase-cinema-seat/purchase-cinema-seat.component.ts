import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { IReservationSeat, Reservation, SeatStatus } from '../../../../../models';
import { UtilService } from '../../../../../services';
import {
    ActionTypes,
    CancelSeats,
    GetScreen,
    GetTicketList,
    SelectSeats,
    TemporaryReservation
} from '../../../../../store/actions/purchase.action';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-cinema-seat',
    templateUrl: './purchase-cinema-seat.component.html',
    styleUrls: ['./purchase-cinema-seat.component.scss']
})
export class PurchaseCinemaSeatComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private util: UtilService,
        private translate: TranslateService
    ) { }

    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.getScreen();
    }

    /**
     * getScreen
     */
    private getScreen() {
        this.purchase.subscribe((purchase) => {
            const screeningEvent = purchase.screeningEvent;
            if (screeningEvent === undefined) {
                console.error('1111');
                this.router.navigate(['/error']);
                return;
            }
            this.store.dispatch(new GetScreen({ screeningEvent }));
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(ActionTypes.GetScreenSuccess),
            tap(() => {
                this.getTickets();
            })
        );

        const fail = this.actions.pipe(
            ofType(ActionTypes.GetScreenFail),
            tap(() => {
                console.error('2222');
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * selectSeat
     */
    public selectSeat(data: {
        seat: IReservationSeat,
        status: SeatStatus
    }) {
        if (data.status === SeatStatus.Default) {
            this.store.dispatch(new SelectSeats({ seats: [data.seat] }));
        } else {
            this.store.dispatch(new CancelSeats({ seats: [data.seat] }));
        }
    }

    public allSelectSeats() {
        const seats: IReservationSeat[] = [];
        this.purchase.subscribe((purchase) => {
            const screeningEventOffers = purchase.screeningEventOffers;
            screeningEventOffers.forEach((screeningEventOffer) => {
                screeningEventOffer.containsPlace.forEach((containsPlace) => {
                    if (containsPlace.offers === undefined
                        || containsPlace.offers[0].availability !== factory.chevre.itemAvailability.InStock) {
                        return;
                    }
                    seats.push({
                        typeOf: containsPlace.typeOf,
                        seatingType: (containsPlace.seatingType === undefined)
                            ? <any>'' : containsPlace.seatingType,
                        seatNumber: containsPlace.branchCode,
                        seatRow: '',
                        seatSection: screeningEventOffer.branchCode
                    });
                });
            });
            if (purchase.authorizeSeatReservation !== undefined) {
                purchase.authorizeSeatReservation.object.acceptedOffer.forEach((acceptedOffer) => {
                    if (acceptedOffer.ticketedSeat === undefined) {
                        return;
                    }
                    seats.push(acceptedOffer.ticketedSeat);
                });
            }
            this.store.dispatch(new SelectSeats({ seats }));
        }).unsubscribe();
    }

    public resetSeats() {
        const seats: IReservationSeat[] = [];
        this.purchase.subscribe((purchase) => {
            purchase.reservations.forEach((reservation) => {
                seats.push(reservation.seat);
            });
            this.store.dispatch(new CancelSeats({ seats }));
        }).unsubscribe();
    }

    /**
     * onSubmit
     */
    public onSubmit() {
        this.purchase.subscribe((purchase) => {
            const transaction = purchase.transaction;
            const screeningEvent = purchase.screeningEvent;
            if (purchase.reservations.length === 0) {
                this.util.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('purchase.cinema.seat.alert.unselected')
                });
                return;
            }
            const reservations = purchase.reservations.map((reservation) => {
                return new Reservation({
                    seat: reservation.seat,
                    ticket: (reservation.ticket === undefined)
                        ? { ticketOffer: purchase.screeningEventTicketOffers[0] }
                        : reservation.ticket
                });
            });
            const authorizeSeatReservation = purchase.authorizeSeatReservation;
            if (transaction === undefined
                || screeningEvent === undefined) {
                console.error('33333');
                this.router.navigate(['/error']);
                return;
            }
            this.store.dispatch(new TemporaryReservation({
                transaction,
                screeningEvent,
                reservations,
                authorizeSeatReservation
            }));
        }).unsubscribe();
        const success = this.actions.pipe(
            ofType(ActionTypes.TemporaryReservationSuccess),
            tap(() => {
                this.router.navigate(['/purchase/cinema/ticket']);
            })
        );

        const fail = this.actions.pipe(
            ofType(ActionTypes.TemporaryReservationFail),
            tap(() => {
                console.error('444444');
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * getTickets
     */
    private getTickets() {
        this.user.subscribe((user) => {
            this.purchase.subscribe((purchase) => {
                const screeningEvent = purchase.screeningEvent;
                const seller = user.seller;
                if (screeningEvent === undefined
                    || seller === undefined) {
                    this.router.navigate(['/error']);
                    return;
                }
                this.store.dispatch(new GetTicketList({ screeningEvent, seller }));
            }).unsubscribe();
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(ActionTypes.GetTicketListSuccess),
            tap(() => { })
        );

        const fail = this.actions.pipe(
            ofType(ActionTypes.GetTicketListFail),
            tap(() => {
                console.error('66666');
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}