import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import {
    BsDatepickerContainerComponent,
    BsDatepickerDirective,
    BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Functions, Models } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import { OrderDetailModalComponent } from '../../../../shared/components/parts/order/detail-modal/detail-modal.component';

@Component({
    selector: 'app-order-search',
    templateUrl: './order-search.component.html',
    styleUrls: ['./order-search.component.scss'],
})
export class OrderSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public user: Observable<reducers.IUserState>;
    public orders: factory.order.IOrder[];
    public nextOrders: factory.order.IOrder[];
    public totalCount: number;
    public maxSize: number;
    public currentPage: number;
    public moment = moment;
    public orderStatus: typeof factory.orderStatus = factory.orderStatus;
    public paymentMethodType: typeof factory.paymentMethodType =
        factory.paymentMethodType;
    public limit: number;
    public conditions: Models.Order.Search.IOrderSearchConditions;
    public selectedOrders: factory.order.IOrder[];
    public OrderActions = Models.Order.Action.OrderActions;
    public actionSelect: Models.Order.Action.OrderActions | '';
    public environment = getEnvironment();
    public order2EventOrders = Functions.Purchase.order2EventOrders;
    public connectionType = Models.Util.Printer.ConnectionType;
    public scheduleDate: Date;
    public screeningEventsGroup: Functions.Purchase.IScreeningEventsGroup[];
    public creativeWorks: factory.chevre.creativeWork.movie.ICreativeWork[];
    public contentRatingTypes: factory.chevre.categoryCode.ICategoryCode[];
    public screeningEvent: factory.chevre.event.screeningEvent.IEvent;
    public searchType: 'input' | 'event';
    public paymentTypes: factory.chevre.categoryCode.ICategoryCode[];
    @ViewChild('datepicker') private datepicker: BsDatepickerDirective;

    constructor(
        protected store: Store<reducers.IOrderState>,
        protected modal: BsModalService,
        protected utilService: UtilService,
        protected actionService: ActionService,
        protected masterService: MasterService,
        protected translate: TranslateService,
        protected localeService: BsLocaleService,
        protected router: Router
    ) {}

    public async ngOnInit() {
        this.actionSelect = '';
        this.selectedOrders = [];
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.orders = [];
        this.maxSize = 1;
        this.currentPage = 1;
        this.limit = 20;
        this.totalCount = this.limit;
        this.screeningEventsGroup = [];
        this.creativeWorks = [];
        this.contentRatingTypes = [];
        this.scheduleDate = moment(
            moment().format('YYYYMMDD'),
            'YYYYMMDD'
        ).toDate();
        this.searchType = 'input';
        this.paymentTypes = [];
        try {
            this.contentRatingTypes =
                await this.masterService.searchCategoryCode({
                    categorySetIdentifier:
                        factory.chevre.categoryCode.CategorySetIdentifier
                            .ContentRatingType,
                });
            this.paymentTypes = await this.masterService.searchCategoryCode({
                categorySetIdentifier:
                    factory.chevre.categoryCode.CategorySetIdentifier
                        .PaymentMethodType,
            });
        } catch (error) {
            this.router.navigate(['/error']);
            return;
        }
    }

    public toggleOrder(order: factory.order.IOrder) {
        const findResult = this.selectedOrders.find(
            (o) => o.orderNumber === order.orderNumber
        );
        if (findResult === undefined) {
            // 選択中へ変更
            this.selectedOrders.push(order);
            return;
        }
        // 選択中解除
        const findIndex = this.selectedOrders.findIndex(
            (o) => o.orderNumber === order.orderNumber
        );
        this.selectedOrders.splice(findIndex, 1);
    }

    /**
     * 検索
     */
    public async search() {
        try {
            this.currentPage = this.conditions.page;
            this.selectedOrders = [];
            const params = Functions.Order.input2OrderSearchCondition({
                input: this.conditions,
                theater: (await this.actionService.user.getData()).theater,
                page: this.currentPage,
                limit: this.limit,
            });
            this.orders = (await this.actionService.order.search(params)).data;
            this.nextOrders = (
                await this.actionService.order.search({
                    ...params,
                    page: this.currentPage + 1,
                })
            ).data;
            const totalCount =
                this.nextOrders.length === 0
                    ? this.currentPage * this.limit
                    : (this.currentPage + 1) * this.limit;
            this.totalCount =
                this.totalCount < totalCount ? totalCount : this.totalCount;
            const maxSize = this.totalCount / this.limit;
            const maxSizeLimit = 5;
            this.maxSize = maxSize > maxSizeLimit ? maxSizeLimit : maxSize;
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.search.alert.search'),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 条件変更
     */
    public async changeConditions(
        conditions: Models.Order.Search.IOrderSearchConditions
    ) {
        this.conditions = conditions;
        this.totalCount = this.limit;
        this.maxSize = 1;
        await this.search();
    }

    /**
     * ページ変更
     */
    public async changePage(event: { page: number }) {
        this.conditions.page = event.page;
        await this.search();
    }

    /**
     * 印刷確認
     */
    public printConfirm(orders: factory.order.IOrder[]) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.print'),
            cb: async () => {
                try {
                    const user = await this.actionService.user.getData();
                    if (user.printer === undefined) {
                        throw new Error('printer undefined');
                    }
                    const pos = user.pos;
                    const printer = user.printer;
                    await this.actionService.order.print({
                        orders,
                        pos,
                        printer,
                    });
                } catch (error) {
                    console.error(error);
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: this.translate.instant(
                            'order.search.alert.print'
                        ),
                        error:
                            JSON.stringify(error) === '{}'
                                ? error
                                : JSON.stringify(error),
                    });
                }
            },
        });
    }

    /**
     * 領収書印刷確認
     */
    public printReceiptConfirm(orders: factory.order.IOrder[]) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.print'),
            cb: async () => {
                try {
                    const user = await this.actionService.user.getData();
                    if (user.printer === undefined) {
                        throw new Error('printer undefined');
                    }
                    const pos = user.pos;
                    const printer = user.printer;
                    await this.actionService.order.printReceipt({
                        orders,
                        pos,
                        printer,
                    });
                } catch (error) {
                    console.error(error);
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: this.translate.instant(
                            'order.search.alert.print'
                        ),
                        error:
                            JSON.stringify(error) === '{}'
                                ? error
                                : JSON.stringify(error),
                    });
                }
            },
        });
    }

    /**
     * キャンセル確認
     */
    public cancelConfirm(orders: factory.order.IOrder[]) {
        const code = Functions.Util.createRandomString(6, /[^0-9]/g);
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('order.search.confirm.cancel', {
                value: code,
            }),
            code,
            cb: async () => {
                try {
                    const userData = await this.actionService.user.getData();
                    await this.actionService.order.cancel({
                        orders,
                        language: userData.language,
                    });
                    this.changePage({ page: this.conditions.page });
                } catch (error) {
                    console.error(error);
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: this.translate.instant(
                            'order.search.alert.cancel'
                        ),
                        error:
                            JSON.stringify(error) === '{}'
                                ? error
                                : JSON.stringify(error),
                    });
                }
            },
        });
    }

    /**
     * 詳細を表示
     */
    public openDetail(order: factory.order.IOrder) {
        this.modal.show(OrderDetailModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: {
                order,
                paymentTypes: this.paymentTypes,
            },
        });
    }

    /**
     * 選択した注文へのアクション
     */
    public selectedAction() {
        if (this.selectedOrders.length === 0) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('order.search.alert.unselected'),
            });
            return;
        }
        if (this.actionSelect === Models.Order.Action.OrderActions.Cancel) {
            const code = Functions.Util.createRandomString(6, /[^0-9]/g);
            this.utilService.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.confirm.cancel', {
                    value: code,
                }),
                code,
                cb: async () => {
                    try {
                        const userData =
                            await this.actionService.user.getData();
                        await this.actionService.order.cancel({
                            orders: this.selectedOrders,
                            language: userData.language,
                        });
                        this.changePage({ page: this.conditions.page });
                    } catch (error) {
                        console.error(error);
                        this.utilService.openAlert({
                            title: this.translate.instant('common.error'),
                            body: this.translate.instant(
                                'order.search.alert.cancel'
                            ),
                            error:
                                JSON.stringify(error) === '{}'
                                    ? error
                                    : JSON.stringify(error),
                        });
                    }
                },
            });
        } else if (
            this.actionSelect === Models.Order.Action.OrderActions.Print
        ) {
            this.utilService.openConfirm({
                title: this.translate.instant('common.confirm'),
                body: this.translate.instant('order.search.confirm.print'),
                cb: async () => {
                    try {
                        const user = await this.actionService.user.getData();
                        if (user.printer === undefined) {
                            throw new Error('printer undefined');
                        }
                        const pos = user.pos;
                        const printer = user.printer;
                        const orders = this.selectedOrders;
                        await this.actionService.order.print({
                            orders,
                            pos,
                            printer,
                        });
                    } catch (error) {
                        console.error(error);
                        this.utilService.openAlert({
                            title: this.translate.instant('common.error'),
                            body: this.translate.instant(
                                'order.search.alert.print'
                            ),
                            error:
                                JSON.stringify(error) === '{}'
                                    ? error
                                    : JSON.stringify(error),
                        });
                    }
                },
            });
        }
    }

    /**
     * 日付選択
     */
    public async selectDate(date?: Date | null) {
        if (date === undefined || date === null) {
            return;
        }
        this.scheduleDate = date;
        const user = await this.actionService.user.getData();
        const theater = user.theater;
        if (this.scheduleDate === undefined) {
            this.scheduleDate = moment()
                .add(
                    this.environment.PURCHASE_SCHEDULE_DEFAULT_SELECTED_DATE,
                    'day'
                )
                .toDate();
        }
        const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
        if (theater === undefined) {
            return;
        }
        try {
            this.creativeWorks = await this.masterService.searchMovies({
                offers: { availableFrom: moment(scheduleDate).toDate() },
            });
            let workPerformedIdentifiers = this.creativeWorks.map(
                (c) => c.identifier
            );
            if (this.creativeWorks.length === 0) {
                workPerformedIdentifiers = (
                    await this.masterService.searchScreeningEvent({
                        superEvent: {
                            locationBranchCodes: [theater.branchCode],
                        },
                        startFrom: moment(scheduleDate).toDate(),
                        startThrough: moment(scheduleDate)
                            .add(1, 'day')
                            .add(-1, 'millisecond')
                            .toDate(),
                    })
                )
                    .filter((s) => s.workPerformed !== undefined)
                    .map((s) => s.workPerformed?.identifier || '');
            }
            const screeningEventSeries =
                this.environment.PURCHASE_SCHEDULE_SORT ===
                'screeningEventSeries'
                    ? await this.masterService.searchScreeningEventSeries({
                          location: {
                              branchCode: { $eq: theater.branchCode },
                          },
                          workPerformed: {
                              identifiers: Array.from(
                                  new Set(workPerformedIdentifiers)
                              ),
                          },
                      })
                    : [];
            const screeningRooms =
                this.environment.PURCHASE_SCHEDULE_SORT === 'screen'
                    ? await this.masterService.searchScreeningRooms({
                          branchCode: { $eq: theater.branchCode },
                      })
                    : [];
            const screeningEvents =
                await this.masterService.searchScreeningEvent({
                    superEvent: { locationBranchCodes: [theater.branchCode] },
                    startFrom: moment(scheduleDate).toDate(),
                    startThrough: moment(scheduleDate)
                        .add(1, 'day')
                        .add(-1, 'millisecond')
                        .toDate(),
                    screeningEventSeries,
                    screeningRooms,
                });
            const now = moment(
                (await this.utilService.getServerTime()).date
            ).toDate();
            this.screeningEventsGroup =
                Functions.Purchase.screeningEvents2ScreeningEventSeries({
                    screeningEvents,
                    now,
                });
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'order.searchEvent.alert.schedule'
                ),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * スケジュール選択
     */
    public async selectSchedule(
        screeningEvent: factory.chevre.event.screeningEvent.IEvent
    ) {
        this.screeningEvent = screeningEvent;
        await this.changeConditions({
            confirmationNumber: '',
            orderNumber: '',
            customer: {
                id: '',
                familyName: '',
                givenName: '',
                email: '',
                telephone: '',
            },
            orderStatus: '',
            itemOfferedType: 'EventReservation',
            paymentMethodType: '',
            eventIds: [screeningEvent.id],
            posId: '',
            page: 1,
        });
        const element = document.querySelector('#screeningEvent');
        if (element === null) {
            return;
        }
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    /**
     * Datepicker言語設定
     */
    public setDatePicker() {
        this.user
            .subscribe((user) => {
                this.localeService.use(user.language);
            })
            .unsubscribe();
    }

    /**
     * Datepicker開閉
     */
    public toggleDatepicker() {
        this.setDatePicker();
        this.datepicker.toggle();
    }

    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    public onShowPicker(container: BsDatepickerContainerComponent) {
        Functions.Util.iOSDatepickerTapBugFix(container, [this.datepicker]);
    }

    /**
     * 検索タイプ変更
     */
    public changeSearchType(searchType: 'input' | 'event') {
        this.searchType = searchType;
    }

    /**
     * コンテンツ取得
     */
    public getCreativeWorks(identifier: string) {
        return this.creativeWorks.find((c) => c.identifier === identifier);
    }
}
