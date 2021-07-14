import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as platform from 'platform';
import { Functions, Models } from '../../../../../..';
import { getEnvironment } from '../../../../../../../environments/environment';

@Component({
    selector: 'app-order-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss'],
})
export class OrderDetailModalComponent implements OnInit {
    @Input() public order: factory.order.IOrder;
    @Input() public paymentTypes: factory.chevre.categoryCode.ICategoryCode[];
    public moment = moment;
    public eventOrders: Functions.Purchase.IEventOrder[];
    public environment = getEnvironment();
    public qrcode?: string;
    public getTransactionAgentIdentifier =
        Functions.Order.getTransactionAgentIdentifier;
    public platform = platform;
    public paymentMethodType = factory.paymentMethodType;
    public customPaymentMethodType = Models.Purchase.Payment.PaymentMethodType;
    public createOrderLink = Functions.Order.createOrderLink;

    constructor(public modal: BsModalRef, private elementRef: ElementRef) {}

    public async ngOnInit() {
        const order = this.order;
        this.eventOrders = Functions.Purchase.order2EventOrders({
            order: this.order,
        });
        const element: HTMLElement =
            this.elementRef.nativeElement.querySelector('.scroll-vertical');
        setTimeout(() => {
            element.scrollTop = 0;
        }, 0);
        try {
            if (this.environment.REGIGROW_QRCODE !== '') {
                const qrcodeText = this.environment.REGIGROW_QRCODE;
                this.qrcode = await Functions.Order.createCooperationQRCode({
                    order,
                    qrcodeText,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
}
