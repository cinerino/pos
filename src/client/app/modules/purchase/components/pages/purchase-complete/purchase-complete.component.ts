import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss'],
})
export class PurchaseCompleteComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public moment = moment;
    public eventOrders: Functions.Purchase.IEventOrder[];
    public environment = getEnvironment();
    public qrcode?: string;
    public paymentMethodType = factory.paymentMethodType;
    public customPaymentMethodType = Models.Purchase.Payment.PaymentMethodType;
    public connectionType = Models.Util.Printer.ConnectionType;
    public createOrderLink = Functions.Order.createOrderLink;
    public paymentTypes: factory.chevre.categoryCode.ICategoryCode[];

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private actionService: ActionService,
        private utilService: UtilService,
        private translate: TranslateService,
        private masterService: MasterService
    ) {}

    public async ngOnInit() {
        this.eventOrders = [];
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.paymentTypes = [];
        try {
            const { order } = await this.actionService.purchase.getData();
            if (order === undefined) {
                throw new Error('order not found');
            }
            this.eventOrders = Functions.Purchase.order2EventOrders({ order });
            this.paymentTypes = await this.masterService.searchCategoryCode({
                categorySetIdentifier:
                    factory.chevre.categoryCode.CategorySetIdentifier
                        .PaymentMethodType,
            });
        } catch (error) {
            this.router.navigate(['/error']);
            return;
        }
        try {
            await this.regiGrowProcess();
            await this.print();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * RegiGrow連携
     */
    public async regiGrowProcess() {
        try {
            const { order } = await this.actionService.purchase.getData();
            if (order === undefined) {
                throw new Error('order not found');
            }
            if (this.environment.REGIGROW_QRCODE !== '') {
                const qrcodeText = this.environment.REGIGROW_QRCODE;
                this.qrcode = await Functions.Order.createCooperationQRCode({
                    order,
                    qrcodeText,
                });
            }
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.complete.alert.regiGrow'
                ),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 印刷
     */
    public async print() {
        try {
            const purchase = await this.actionService.purchase.getData();
            const user = await this.actionService.user.getData();
            if (purchase.order === undefined || user.printer === undefined) {
                throw new Error('printer undefined');
            }
            const orders = [purchase.order];
            const pos = user.pos;
            const printer = user.printer;
            await this.actionService.order.print({ orders, pos, printer });
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.complete.alert.print'),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 領収書印刷
     */
    public async printReceipt() {
        try {
            const purchase = await this.actionService.purchase.getData();
            const user = await this.actionService.user.getData();
            if (purchase.order === undefined || user.printer === undefined) {
                throw new Error('printer undefined');
            }
            const orders = [purchase.order];
            const pos = user.pos;
            const printer = user.printer;
            await this.actionService.order.printReceipt({
                orders,
                pos,
                printer,
            });
        } catch (error) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('purchase.complete.alert.print'),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }
}
