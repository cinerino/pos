import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { deepCopy } from '../../../../../functions';
import { IReservation, IReservationTicket } from '../../../../../models/purchase/reservation';
import { PurchaseService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { MvtkCheckModalComponent } from '../../../../shared/components/parts/mvtk/check-modal/check-modal.component';
import { PurchaseSeatTicketModalComponent } from '../../../../shared/components/parts/purchase/seat-ticket-modal/seat-ticket-modal.component';

@Component({
    selector: 'app-purchase-ticket',
    template: ''
})
export class PurchaseTicketComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public additionalTicketText: string;
    public environment = getEnvironment();
    public translateName: string;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private modal: BsModalService,
        private purchaseService: PurchaseService,
        private utilService: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.translateName = (this.environment.VIEW_TYPE === 'cinema')
            ? 'purchase.cinema.ticket' : 'purchase.event.seatTicket';
        this.additionalTicketText = '';
    }

    /**
     * 確定
     */
    public async onSubmit() {
        const purchase = await this.purchaseService.getData();
        const transaction = purchase.transaction;
        const screeningEvent = purchase.screeningEvent;
        const reservations = purchase.reservations;
        if (transaction === undefined
            || screeningEvent === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        const unselectedReservations = reservations.filter((reservation) => {
            return (reservation.ticket === undefined);
        });
        if (unselectedReservations.length > 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(`${this.translateName}.alert.unselected`)
            });
            return;
        }
        const validResult = reservations.filter((reservation) => {
            if (reservation.ticket === undefined) {
                return false;
            }
            const priceComponent = reservation.ticket.ticketOffer.priceSpecification.priceComponent;
            const UnitPriceSpecification = factory.chevre.priceSpecificationType.UnitPriceSpecification;
            const unitPriceSpecifications = priceComponent.filter(p => p.typeOf === UnitPriceSpecification);
            const filterResult = reservations.filter((targetReservation) => {
                return (reservation.ticket !== undefined
                    && targetReservation.ticket !== undefined
                    && reservation.ticket.ticketOffer.id === targetReservation.ticket.ticketOffer.id);
            });
            const findResult = unitPriceSpecifications.find((unitPriceSpecification) => {
                const value = (unitPriceSpecification.typeOf === UnitPriceSpecification
                    && unitPriceSpecification.referenceQuantity.value !== undefined)
                    ? unitPriceSpecification.referenceQuantity.value : 1;

                return (filterResult.length % value !== 0);
            });

            return (findResult !== undefined);
        });
        if (validResult.length > 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(`${this.translateName}.alert.ticketCondition`)
            });
            return;
        }
        try {
            const additionalTicketText = this.additionalTicketText;
            const screeningEventSeats = await this.purchaseService.getScreeningEventSeats();
            await this.purchaseService.temporaryReservation({
                reservations,
                additionalTicketText,
                screeningEventSeats
            });
            const navigate = (this.environment.VIEW_TYPE === 'cinema')
                ? '/purchase/payment'
                : '/purchase/event/ticket';
            this.router.navigate([navigate]);
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: `
                <p class="mb-4">${this.translate.instant(`${this.translateName}.alert.temporaryReservation`)}</p>
                <div class="p-3 bg-light-gray select-text text-left">
                    <code>${error}</code>
                </div>`
            });
        }
    }

    /**
     * 券種一覧表示
     */
    public async openTicketList(reservation?: IReservation) {
        const purchase = await this.purchaseService.getData();
        this.modal.show(PurchaseSeatTicketModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: {
                screeningEventTicketOffers: purchase.screeningEventTicketOffers,
                checkMovieTicketActions: purchase.checkMovieTicketActions,
                reservations: purchase.reservations,
                reservation: reservation,
                pendingMovieTickets: purchase.pendingMovieTickets,
                cb: (ticket: IReservationTicket) => {
                    if (reservation === undefined) {
                        const reservations = deepCopy<IReservation[]>(purchase.reservations);
                        reservations.forEach(r => r.ticket = ticket);
                        this.purchaseService.selectTickets(reservations);
                        return;
                    }
                    this.purchaseService.selectTickets([{ ...reservation, ticket }]);
                }
            },
        });
    }

    /**
     * ムビチケ認証表示
     */
    public openMovieTicket() {
        this.modal.show(MvtkCheckModalComponent, {
            class: 'modal-dialog-centered'
        });
    }


}