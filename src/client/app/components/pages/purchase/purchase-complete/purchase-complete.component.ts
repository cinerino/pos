import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import * as qrcode from 'qrcode';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { getTicketPrice, IEventOrder, orderToEventOrders } from '../../../../functions';
import { UtilService } from '../../../../services';
import { orderAction } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-purchase-complete',
    templateUrl: './purchase-complete.component.html',
    styleUrls: ['./purchase-complete.component.scss']
})
export class PurchaseCompleteComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public moment: typeof moment = moment;
    public getTicketPrice = getTicketPrice;
    public eventOrders: IEventOrder[];
    public environment = environment;
    public regiGrow?: { type: string; qrcode: string; };

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private util: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.eventOrders = [];
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.purchase.subscribe((purchase) => {
            if (purchase.order === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            if (this.isRegiGrow(purchase.order)) {
                const canvas = document.createElement('canvas');
                const qrcodeText = `${purchase.order.orderNumber}=${purchase.order.price}`;
                qrcode.toCanvas(canvas, qrcodeText).then(() => {
                    this.regiGrow = {
                        type: '001',
                        qrcode: canvas.toDataURL()
                    };
                }).catch((error) => {
                    console.error(error);
                    this.regiGrow = {
                        type: '001',
                        qrcode: ''
                    };
                });
            }
            const order = purchase.order;
            this.eventOrders = orderToEventOrders({ order });
        }).unsubscribe();
        this.print();
    }

    public print() {
        this.purchase.subscribe((purchase) => {
            this.user.subscribe((user) => {
                if (purchase.order === undefined
                    || user.pos === undefined
                    || user.printer === undefined) {
                    this.router.navigate(['/error']);
                    return;
                }
                const orders = [purchase.order];
                const pos = user.pos;
                const printer = user.printer;
                this.store.dispatch(new orderAction.Print({ orders, pos, printer }));
            }).unsubscribe();
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(orderAction.ActionTypes.PrintSuccess),
            tap(() => { })
        );

        const fail = this.actions.pipe(
            ofType(orderAction.ActionTypes.PrintFail),
            tap(() => {
                this.error.subscribe((error) => {
                    this.util.openAlert({
                        title: this.translate.instant('common.error'),
                        body: `
                        <p class="mb-4">${this.translate.instant('purchase.complete.alert.print')}</p>
                            <div class="p-3 bg-light-gray select-text">
                            <code>${error}</code>
                        </div>`
                    });
                }).unsubscribe();
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    private isRegiGrow(order: factory.order.IOrder) {
        const findResult = order.paymentMethods.find((p) => {
            const findPropertyResult = p.additionalProperty.find(
                a => a.name === 'paymentMethodName' && a.value === 'RegiGrow'
            );
            return (findPropertyResult !== undefined);
        });

        return (findResult !== undefined);
    }

}
