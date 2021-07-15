import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Functions, Models } from '../../../../../..';
import { getEnvironment } from '../../../../../../../environments/environment';
import {
    ActionService,
    MasterService,
    UtilService,
} from '../../../../../../services';
import * as reducers from '../../../../../../store/reducers';
import { PurchaseEventTicketModalComponent } from '../../../../../shared/components/parts/purchase/event/ticket-modal/ticket-modal.component';

@Component({
    selector: 'app-purchase-event-schedule',
    templateUrl: './purchase-event-schedule.component.html',
    styleUrls: ['./purchase-event-schedule.component.scss'],
})
export class PurchaseEventScheduleComponent implements OnInit, OnDestroy {
    public purchase: Observable<reducers.IPurchaseState>;
    public user: Observable<reducers.IUserState>;
    public master: Observable<reducers.IMasterState>;
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public screeningEventsGroup: Functions.Purchase.IScreeningEventsGroup[];
    public creativeWorks: factory.chevre.creativeWork.movie.ICreativeWork[];
    public contentRatingTypes: factory.chevre.categoryCode.ICategoryCode[];
    public moment = moment;
    public environment = getEnvironment();
    private updateTimer: any;
    public screeningEventSeats: factory.chevre.place.seat.IPlaceWithOffer[];
    @ViewChild('datepicker')
    private datepicker: BsDatepickerDirective;
    public scheduleDate: Date;

    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private utilService: UtilService,
        private translate: TranslateService,
        private actionService: ActionService,
        private masterService: MasterService,
        private modal: BsModalService,
        private localeService: BsLocaleService
    ) {}

    public async ngOnInit() {
        this.purchase = this.store.pipe(select(reducers.getPurchase));
        this.user = this.store.pipe(select(reducers.getUser));
        this.master = this.store.pipe(select(reducers.getMaster));
        this.error = this.store.pipe(select(reducers.getError));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.actionService.purchase.unsettledDelete();
        this.screeningEventsGroup = [];
        this.creativeWorks = [];
        this.contentRatingTypes = [];
        try {
            const { transaction, scheduleDate } =
                await this.actionService.purchase.getData();
            if (transaction === undefined || scheduleDate === undefined) {
                throw new Error('transaction or scheduleDate undefined');
            }
            this.contentRatingTypes =
                await this.masterService.searchCategoryCode({
                    categorySetIdentifier:
                        factory.chevre.categoryCode.CategorySetIdentifier
                            .ContentRatingType,
                });
            this.scheduleDate = moment(scheduleDate, 'YYYY-MM-DD').toDate();
            await this.getSchedule();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
    }

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
        this.updateTimer = setTimeout(async () => {
            try {
                await this.getSchedule();
            } catch (error) {
                console.error(error);
                this.router.navigate(['/error']);
            }
        }, time);
    }

    /**
     * スケジュール取得
     */
    public async getSchedule() {
        const { theater } = await this.actionService.user.getData();
        const scheduleDate = this.scheduleDate;
        if (theater === undefined || scheduleDate === undefined) {
            throw new Error('theater or scheduleDate undefined');
        }
        this.creativeWorks = await this.masterService.searchMovies({
            offers: { availableFrom: moment(scheduleDate).toDate() },
        });
        const screeningEventSeries =
            this.environment.PURCHASE_SCHEDULE_SORT === 'screeningEventSeries'
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
        const screeningEvents = await this.masterService.searchScreeningEvent({
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
    }

    /**
     * スケジュール選択
     */
    public async selectSchedule(
        screeningEvent: factory.event.screeningEvent.IEvent
    ) {
        const purchase = await this.actionService.purchase.getData();
        if (purchase.seller === undefined) {
            this.router.navigate(['/error']);
            return;
        }
        if (
            purchase.authorizeSeatReservations.length > 0 &&
            Number(this.environment.PURCHASE_ITEM_MAX_LENGTH) === 1
        ) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.schedule.alert.cart'
                ),
            });
            return;
        }
        try {
            await this.actionService.purchase.event.getScreeningEvent(
                screeningEvent
            );
            this.screeningEventSeats =
                await this.actionService.purchase.event.getScreeningEventSeats();
            await this.actionService.purchase.event.searchTicketOffers();
            await this.actionService.purchase.getScreeningRoom({
                branchCode: { $eq: screeningEvent.location.branchCode },
                containedInPlace: {
                    branchCode: {
                        $eq: screeningEvent.superEvent.location.branchCode,
                    },
                },
            });
            this.openTicketList();
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: '',
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 券種表示
     */
    private async openTicketList() {
        const purchase = await this.actionService.purchase.getData();
        const screeningEvent = purchase.screeningEvent;
        const screeningEventTicketOffers = purchase.screeningEventTicketOffers;
        const screeningEventSeats = this.screeningEventSeats;
        const screen = purchase.screen;
        if (screeningEvent === undefined || screen === undefined) {
            return;
        }
        const performance = new Models.Purchase.Performance({ screeningEvent });
        const isInfinitetock = performance.isInfinitetock();
        const isTicketedSeat = performance.isTicketedSeat();
        const isOpenSeatingAllowed =
            screen.openSeatingAllowed === undefined
                ? false
                : screen.openSeatingAllowed;
        const movieTicketTypeOffers =
            Functions.Purchase.getMovieTicketTypeOffers({
                screeningEventTicketOffers,
            });
        // const membershipTypeOffers = Functions.Purchase.getMembershipTypeOffers(
        //     {
        //         screeningEventTicketOffers,
        //     }
        // );
        const isOpenModal =
            isInfinitetock ||
            !isTicketedSeat ||
            (isOpenSeatingAllowed && movieTicketTypeOffers.length === 0);
        if (isOpenModal) {
            // 座席選択なし
            this.modal.show(PurchaseEventTicketModalComponent, {
                class: 'modal-dialog-centered modal-lg',
                backdrop: 'static',
                initialState: {
                    screeningEventTicketOffers,
                    screeningEventSeats,
                    screeningEvent,
                    cb: (params: {
                        reservations: Models.Purchase.Reservation.IReservation[];
                        additionalTicketText?: string;
                    }) => {
                        this.selectTicket(params);
                    },
                },
            });
            return;
        }
        // 座席選択あり
        this.router.navigate(['/purchase/event/seat']);
    }

    /**
     * 券種選択
     */
    private async selectTicket(params: {
        reservations: Models.Purchase.Reservation.IReservation[];
        additionalTicketText?: string;
    }) {
        const reservations = params.reservations;
        const additionalTicketText = params.additionalTicketText;
        if (
            reservations.length >
            Number(this.environment.PURCHASE_ITEM_MAX_LENGTH)
        ) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.schedule.alert.limit',
                    { value: this.environment.PURCHASE_ITEM_MAX_LENGTH }
                ),
            });
            return;
        }
        try {
            this.screeningEventSeats =
                await this.actionService.purchase.event.getScreeningEventSeats();
            const { screeningEvent } =
                await this.actionService.purchase.getData();
            if (
                screeningEvent !== undefined &&
                new Models.Purchase.Performance({
                    screeningEvent,
                }).isTicketedSeat()
            ) {
                const remainingSeatLength =
                    Functions.Purchase.getRemainingSeatLength({
                        screeningEventSeats: this.screeningEventSeats,
                        screeningEvent,
                    });
                if (remainingSeatLength < reservations.length) {
                    this.utilService.openAlert({
                        title: this.translate.instant('common.error'),
                        body: this.translate.instant(
                            'purchase.event.schedule.alert.getScreeningEventSeats'
                        ),
                    });
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: '',
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }

        try {
            await this.actionService.purchase.transaction.authorizeSeatReservation(
                {
                    reservations,
                    additionalTicketText,
                    screeningEventSeats: this.screeningEventSeats,
                }
            );
            this.utilService.openAlert({
                title: this.translate.instant('common.complete'),
                body: this.translate.instant(
                    'purchase.event.schedule.success.temporaryReservation'
                ),
            });
            this.actionService.purchase.unsettledDelete();
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.schedule.alert.temporaryReservation'
                ),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }

    /**
     * 券種確定
     */
    public async onSubmit() {
        const { authorizeSeatReservations, customer } =
            await this.actionService.purchase.getData();
        // チケット枚数上限判定
        let itemCount = 0;
        authorizeSeatReservations.forEach(
            (a) => (itemCount += a.object.acceptedOffer.length)
        );
        if (itemCount > Number(this.environment.PURCHASE_ITEM_MAX_LENGTH)) {
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant(
                    'purchase.event.schedule.alert.limit',
                    { value: Number(this.environment.PURCHASE_ITEM_MAX_LENGTH) }
                ),
            });
            return;
        }
        if (customer === undefined) {
            this.router.navigate(['/purchase/confirm']);
            return;
        }
        this.router.navigate(['/purchase/input']);
    }

    /**
     * カート削除確認
     */
    public removeItem(
        authorizeSeatReservation: factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>
    ) {
        this.utilService.openConfirm({
            title: this.translate.instant('common.confirm'),
            body: this.translate.instant('purchase.event.cart.confirm.cancel'),
            cb: async () => {
                try {
                    const authorizeSeatReservations = [
                        authorizeSeatReservation,
                    ];
                    await this.actionService.purchase.transaction.voidSeatReservation(
                        {
                            authorizeSeatReservations,
                        }
                    );
                } catch (error) {
                    console.error(error);
                    this.router.navigate(['/error']);
                }
            },
        });
    }

    /**
     * コンテンツ取得
     */
    public getCreativeWorks(identifier: string) {
        return this.creativeWorks.find((c) => c.identifier === identifier);
    }

    /**
     * 日付選択
     */
    public async selectDate(date?: Date | null) {
        console.log('selectDate', date);
        if (date === undefined || date === null) {
            return;
        }
        try {
            this.scheduleDate = date;
            const scheduleDate = moment(this.scheduleDate).format('YYYY-MM-DD');
            this.actionService.purchase.selectScheduleDate(scheduleDate);
            await this.getSchedule();
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
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
}
