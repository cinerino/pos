import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { getAmount, getTicketPrice } from '../../../../functions';
import { ViewType } from '../../../../models';
import { UtilService } from '../../../../services';
import { purchaseAction } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-purchase-confirm',
    templateUrl: './purchase-confirm.component.html',
    styleUrls: ['./purchase-confirm.component.scss']
})
export class PurchaseConfirmComponent implements OnInit {
    public purchase: Observable<reducers.IPurchaseState>;
    public isLoading: Observable<boolean>;
    public user: Observable<reducers.IUserState>;
    public moment: typeof moment = moment;
    public paymentMethodType: typeof factory.paymentMethodType = factory.paymentMethodType;
    public viewType: typeof ViewType = ViewType;
    public depositAmount: string;
    public amount: number;
    public getTicketPrice = getTicketPrice;
    public environment = environment;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private util: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.amount = 0;
        this.depositAmount = '0';
        this.purchase.subscribe((purchase) => {
            this.amount = getAmount(purchase.authorizeSeatReservations);
        }).unsubscribe();
    }

    public registerContact() {
        this.purchase.subscribe((purchase) => {
            this.user.subscribe((user) => {
                if (purchase.transaction === undefined
                    || user.customerContact === undefined) {
                    this.router.navigate(['/error']);
                    return;
                }
                const transaction = purchase.transaction;
                const contact = user.customerContact;
                this.store.dispatch(new purchaseAction.RegisterContact({ transaction, contact }));
            }).unsubscribe();
        }).unsubscribe();
        const success = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.RegisterContactSuccess),
            tap(() => {
                this.reserve();
            })
        );

        const fail = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.RegisterContactFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public authorizeAnyPayment() {
        this.purchase.subscribe((purchase) => {
            if (purchase.transaction === undefined
                || purchase.paymentMethod === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            const transaction = purchase.transaction;
            const amount = this.amount;
            const additionalProperty = [];
            if (purchase.paymentMethod.typeOf === factory.paymentMethodType.Cash) {
                // 現金
                additionalProperty.push({ name: 'depositAmount', value: Number(this.depositAmount) });
                additionalProperty.push({
                    name: 'change',
                    value: Number(this.depositAmount) - this.amount
                });
            }
            this.store.dispatch(new purchaseAction.AuthorizeAnyPayment({
                transaction: transaction,
                typeOf: purchase.paymentMethod.typeOf,
                amount: amount,
                additionalProperty: additionalProperty
            }));
        }).unsubscribe();
        const success = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.AuthorizeAnyPaymentSuccess),
            tap(() => {
                this.registerContact();
            })
        );

        const fail = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.AuthorizeAnyPaymentFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public reserve() {
        this.user.subscribe((user) => {
            this.purchase.subscribe((purchase) => {
                if (user.seller === undefined || purchase.transaction === undefined) {
                    this.router.navigate(['/error']);
                    return;
                }
                const transaction = purchase.transaction;
                const authorizeSeatReservations = purchase.authorizeSeatReservations;
                const seller = user.seller;
                this.store.dispatch(new purchaseAction.Reserve({ transaction, authorizeSeatReservations, seller }));
            }).unsubscribe();
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.ReserveSuccess),
            tap(() => {
                this.router.navigate(['/purchase/complete']);
            })
        );

        const fail = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.ReserveFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * authorizeMovieTicket
     */
    private authorizeMovieTicket() {
        this.purchase.subscribe((purchase) => {
            if (purchase.transaction === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            this.store.dispatch(new purchaseAction.AuthorizeMovieTicket({
                transaction: purchase.transaction,
                authorizeMovieTicketPayments: purchase.authorizeMovieTicketPayments,
                authorizeSeatReservations: purchase.authorizeSeatReservations,
                pendingMovieTickets: purchase.pendingMovieTickets
            }));
        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.AuthorizeMovieTicketSuccess),
            tap(() => {
                if (this.amount > 0) {
                    this.authorizeAnyPayment();
                } else {
                    this.reserve();
                }
            })
        );

        const fail = this.actions.pipe(
            ofType(purchaseAction.ActionTypes.AuthorizeMovieTicketFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public onSubmit() {
        this.purchase.subscribe((purchase) => {
            if (purchase.paymentMethod === undefined) {
                this.router.navigate(['/error']);
                return;
            }
            if (purchase.paymentMethod.typeOf === factory.paymentMethodType.Cash) {
                if (Number(this.depositAmount) < this.amount) {
                    this.util.openAlert({
                        title: this.translate.instant('common.error'),
                        body: this.translate.instant('purchase.confirm.alert.custody')
                    });
                    return;
                }
            }
            if (purchase.pendingMovieTickets.length > 0) {
                this.authorizeMovieTicket();
            } else if (this.amount > 0) {
                this.authorizeAnyPayment();
            } else {
                this.registerContact();
            }
        }).unsubscribe();
    }

    public changeDepositAmount(value: string) {
        this.depositAmount = String(Number(value));
    }

}
