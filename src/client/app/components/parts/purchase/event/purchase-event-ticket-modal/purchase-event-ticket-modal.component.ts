import { Component, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from '../../../../../../environments/environment';
import { getRemainingSeatLength, getTicketPrice, isTicketedSeatScreeningEvent } from '../../../../../functions';
import { IReservationTicket } from '../../../../../models';

@Component({
    selector: 'app-purchase-event-ticket-modal',
    templateUrl: './purchase-event-ticket-modal.component.html',
    styleUrls: ['./purchase-event-ticket-modal.component.scss']
})
export class PurchaseEventTicketModalComponent implements OnInit {

    @Input() public screeningEventTicketOffers: factory.chevre.event.screeningEvent.ITicketOffer[];
    @Input() public screeningEventOffers: factory.chevre.event.screeningEvent.IScreeningRoomSectionOffer[];
    @Input() public screeningEvent: factory.event.screeningEvent.IEvent;
    @Input() public cb: (reservationTickets: IReservationTicket[]) => void;
    public tickets: factory.chevre.event.screeningEvent.ITicketOffer[];
    public getTicketPrice = getTicketPrice;
    public values: Number[];
    public selectedTickets: { [key: string]: string; };
    public moment: typeof moment = moment;
    public getRemainingSeatLength = getRemainingSeatLength;
    public isTicketedSeatScreeningEvent = isTicketedSeatScreeningEvent;

    constructor(
        public modal: BsModalRef
    ) { }

    /**
     * 初期化
     */
    public ngOnInit() {
        this.tickets = [];
        this.tickets = this.screeningEventTicketOffers.filter((offer) => {
            const movieTicketTypeChargeSpecification = offer.priceSpecification.priceComponent.find(
                (component) => component.typeOf === factory.chevre.priceSpecificationType.MovieTicketTypeChargeSpecification
            );
            return movieTicketTypeChargeSpecification === undefined;
        });
        this.values = [];
        let limit = Number(environment.PURCHASE_ITEM_MAX_LENGTH);
        if (isTicketedSeatScreeningEvent(this.screeningEvent)) {
            const remainingSeatLength = this.getRemainingSeatLength(this.screeningEventOffers, this.screeningEvent);
            limit = (limit > remainingSeatLength) ? remainingSeatLength : limit;
        }
        for (let i = 0; i < limit; i++) {
            this.values.push(i + 1);
        }
        const selectedTickets: { [key: string]: string; } = {};
        this.tickets.forEach((ticket) => {
            selectedTickets[ticket.id] = '0';
        });
        this.selectedTickets = selectedTickets;
    }

    /**
     * 閉じる
     */
    public close() {
        this.modal.hide();
        const reservationTickets = this.createReservationTickets();
        this.cb(reservationTickets);
    }

    /**
     * 予約チケット作成
     */
    public createReservationTickets() {
        const reservationTickets: IReservationTicket[] = [];
        Object.keys(this.selectedTickets).forEach((key) => {
            const value = Number(this.selectedTickets[key]);
            for (let i = 0; i < value; i++) {
                const findResult = this.screeningEventTicketOffers.find(s => s.id === key);
                if (findResult === undefined) {
                    break;
                }
                reservationTickets.push({ ticketOffer: findResult });
            }
        });

        return reservationTickets;
    }

}
