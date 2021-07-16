import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { BAD_REQUEST, TOO_MANY_REQUESTS } from 'http-status';
import * as moment from 'moment';
import {
    BsDatepickerContainerComponent,
    BsDatepickerDirective,
    BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Functions } from '../../../../../..';
import { getEnvironment } from '../../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';

@Component({
    selector: 'app-purchase-cinema-schedule',
    templateUrl: './purchase-cinema-schedule.component.html',
    styleUrls: ['./purchase-cinema-schedule.component.scss'],
})
export class PurchaseCinemaScheduleComponent implements OnInit, OnDestroy {
    public purchase: Observable<reducers.IPurchaseState>;
    public error: Observable<string | null>;
    public master: Observable<reducers.IMasterState>;
    public user: Observable<reducers.IUserState>;
    public screeningEventsGroup: Functions.Purchase.IScreeningEventsGroup[];
    public creativeWorks: factory.chevre.creativeWork.movie.ICreativeWork[];
    public contentRatingTypes: factory.chevre.categoryCode.ICategoryCode[];
    public isLoading: Observable<boolean>;
    public moment = moment;
    public scheduleDate: Date;
    public environment = getEnvironment();
    private updateTimer: any;
    @ViewChild('datepicker', { static: true })
    private datepicker: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private utilService: UtilService,
        private actionService: ActionService,
        private masterService: MasterService,
        private localeService: BsLocaleService
    ) {}

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.error = this.store.pipe(select(reducers.getError));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.screeningEventsGroup = [];
        this.creativeWorks = [];
        this.contentRatingTypes = [];
        try {
            this.contentRatingTypes =
                await this.masterService.searchCategoryCode({
                    categorySetIdentifier:
                        factory.chevre.categoryCode.CategorySetIdentifier
                            .ContentRatingType,
                });
            this.scheduleDate = moment(
                moment().format('YYYYMMDD'),
                'YYYYMMDD'
            ).toDate();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * 破棄
     */
    public ngOnDestroy() {
        clearTimeout(this.updateTimer);
    }

    /**
     * 更新
     */
    private update() {
        if (this.updateTimer !== undefined) {
            clearTimeout(this.updateTimer);
        }
        const time = 600000; // 10 * 60 * 1000
        this.updateTimer = setTimeout(() => {
            this.selectDate(this.scheduleDate);
        }, time);
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
        this.actionService.purchase.selectScheduleDate(scheduleDate);
        try {
            this.creativeWorks = await this.masterService.searchMovies({
                offers: { availableFrom: moment(scheduleDate).toDate() },
            });
            const screeningEventSeries =
                this.environment.PURCHASE_SCHEDULE_SORT ===
                'screeningEventSeries'
                    ? await this.masterService.searchScreeningEventSeries({
                          location: {
                              branchCode: { $eq: theater.branchCode },
                          },
                          workPerformed: {
                              identifiers: this.creativeWorks.map(
                                  (c) => c.identifier
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
            this.update();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

    /**
     * スケジュール選択
     */
    public async selectSchedule(
        screeningEvent: factory.chevre.event.screeningEvent.IEvent
    ) {
        this.actionService.purchase.unsettledDelete();
        try {
            await this.actionService.purchase.event.getScreeningEvent(
                screeningEvent
            );
            if (screeningEvent.offers?.seller?.id === undefined) {
                throw new Error(
                    'screeningEvent.offers.seller or screeningEvent.offers.seller.id undefined'
                );
            }
            await this.actionService.purchase.getSeller({
                id: screeningEvent.offers.seller.id,
            });
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
            return;
        }
        const { seller, authorizeSeatReservations } =
            await this.actionService.purchase.getData();
        const { pos } = await this.actionService.user.getData();
        if (seller === undefined) {
            this.router.navigate(['/error']);
            return;
        }

        if (authorizeSeatReservations.length > 0) {
            try {
                await this.actionService.purchase.transaction.voidSeatReservation(
                    {
                        authorizeSeatReservations,
                    }
                );
            } catch (error) {
                console.error(error);
                this.router.navigate(['/error']);
                return;
            }
        }
        try {
            await this.actionService.purchase.transaction.start({ pos });
            this.router.navigate(['/purchase/cinema/seat']);
        } catch (error) {
            console.error(error);
            try {
                const errorObject = JSON.parse(error);
                if (errorObject.status === TOO_MANY_REQUESTS) {
                    this.router.navigate(['/congestion']);
                    return;
                }
                if (errorObject.status === BAD_REQUEST) {
                    this.router.navigate(['/maintenance']);
                    return;
                }
                this.router.navigate(['/error']);
            } catch (error2) {
                console.error(error2);
                this.router.navigate(['/error']);
            }
        }
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
     * コンテンツ取得
     */
    public getCreativeWorks(identifier: string) {
        return this.creativeWorks.find((c) => c.identifier === identifier);
    }
}
