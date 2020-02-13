import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap';
import * as platform from 'platform';
import { getEnvironment } from '../../../../../../../environments/environment';
import {
    createRegiGrowQrcode,
    getTransactionAgentIdentifier,
    IEventOrder,
    order2EventOrders
} from '../../../../../../functions';

@Component({
    selector: 'app-order-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit {
    @Input() public order: factory.order.IOrder;
    public moment: typeof moment = moment;
    public eventOrders: IEventOrder[];
    public environment = getEnvironment();
    public regiGrow?: string;
    public getTransactionAgentIdentifier = getTransactionAgentIdentifier;
    public platform = platform;

    constructor(
        public modal: BsModalRef,
        private elementRef: ElementRef
    ) { }

    public ngOnInit() {
        const order = this.order;
        this.eventOrders = order2EventOrders({ order: this.order });
        const element: HTMLElement = this.elementRef.nativeElement.querySelector('.scroll-vertical');
        setTimeout(() => {
            element.scrollTop = 0;
        }, 0);
        if (order.paymentMethods.find(p => p.name === 'RegiGrow') !== undefined) {
            createRegiGrowQrcode(order).then((code) => {
                this.regiGrow = code;
            }).catch(() => { });
        }
    }

}

