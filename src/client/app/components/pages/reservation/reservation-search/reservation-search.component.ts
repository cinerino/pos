import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService, BsModalService } from 'ngx-bootstrap';
import { CellHoverEvent } from 'ngx-bootstrap/datepicker/models';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { getTicketPrice } from '../../../../functions';
import { IReservationSearchConditions } from '../../../../models';
import { DownloadService, UtilService } from '../../../../services';
import { reservationAction } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';
import { ReservationDetailModalComponent } from '../../../parts';

@Component({
    selector: 'app-reservation-search',
    templateUrl: './reservation-search.component.html',
    styleUrls: ['./reservation-search.component.scss']
})
export class ReservationSearchComponent implements OnInit {

    public isLoading: Observable<boolean>;
    public isDownload: boolean;
    public error: Observable<string | null>;
    public reservation: Observable<reducers.IReservationState>;
    public user: Observable<reducers.IUserState>;
    public moment: typeof moment = moment;
    public limit: number;
    public conditions: IReservationSearchConditions;
    public confirmedConditions: IReservationSearchConditions;
    public reservationStatus = factory.chevre.reservationStatusType;
    public getTicketPrice = getTicketPrice;
    public environment = environment;
    @ViewChild('reservationDateFrom', { static: true })
    private reservationDateFrom: BsDatepickerDirective;
    @ViewChild('reservationDateThrough', { static: true })
    private reservationDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true })
    private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true })
    private eventStartDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IReservationState>,
        private actions: Actions,
        private modal: BsModalService,
        private download: DownloadService,
        private localeService: BsLocaleService,
        private util: UtilService,
        private translate: TranslateService
    ) { }

    public ngOnInit() {
        this.isDownload = false;
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.reservation = this.store.pipe(select(reducers.getReservation));
        this.user = this.store.pipe(select(reducers.getUser));
        this.limit = 20;
        this.conditions = {
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1
        };
        this.store.dispatch(new reservationAction.Delete());
    }

    /**
     * 検索パラメータへ変換
     */
    public async convertToSearchParams() {
        return new Promise<factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>>((resolve) => {
            this.user.subscribe(() => {
                const params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation> = {
                    typeOf: factory.chevre.reservationType.EventReservation,
                    // project: { ids: [environment.PROJECT_ID] },
                    // seller: {
                    //     typeOf: (user.seller === undefined)
                    //         ? undefined : user.seller.typeOf,
                    //     ids: (user.seller === undefined)
                    //         ? undefined : [user.seller.id]
                    // },
                    bookingFrom: (this.confirmedConditions.reservationDateFrom === undefined)
                        ? undefined
                        : moment(moment(this.confirmedConditions.reservationDateFrom).format('YYYYMMDD')).toDate(),
                    bookingThrough: (this.confirmedConditions.reservationDateThrough === undefined)
                        ? undefined
                        : moment(moment(this.confirmedConditions.reservationDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
                    reservationFor: {
                        startFrom: (this.confirmedConditions.eventStartDateFrom === undefined)
                        ? undefined
                        : moment(moment(this.confirmedConditions.eventStartDateFrom).format('YYYYMMDD')).toDate(),
                        startThrough: (this.confirmedConditions.eventStartDateThrough === undefined)
                            ? undefined
                            : moment(moment(this.confirmedConditions.eventStartDateThrough).format('YYYYMMDD')).add(1, 'day').toDate(),
                    },
                    ids: (this.confirmedConditions.id === '')
                        ? undefined : [this.confirmedConditions.id],
                    reservationStatuses: (this.confirmedConditions.reservationStatus === '')
                        ? undefined : [this.confirmedConditions.reservationStatus],
                    reservationNumbers: (this.confirmedConditions.reservationNumber === '')
                        ? undefined : [this.confirmedConditions.reservationNumber],
                    limit: this.limit,
                    page: this.confirmedConditions.page,
                    sort: {
                        // reservationDate: factory.sortType.Descending
                    }
                };
                resolve(params);
            }).unsubscribe();
        });
    }

    /**
     * 検索
     */
    public reservationSearch(changeConditions: boolean, event?: { page: number }) {
        if (event !== undefined) {
            this.confirmedConditions.page = event.page;
        }
        if (changeConditions) {
            this.confirmedConditions = {
                reservationDateFrom: this.conditions.reservationDateFrom,
                reservationDateThrough: this.conditions.reservationDateThrough,
                eventStartDateFrom: this.conditions.eventStartDateFrom,
                eventStartDateThrough: this.conditions.eventStartDateThrough,
                id: this.conditions.id,
                reservationNumber: this.conditions.reservationNumber,
                reservationStatus: this.conditions.reservationStatus,
                page: 1
            };
        }
        this.convertToSearchParams().then((params) => {
            this.store.dispatch(new reservationAction.Search({ params }));
        });


        const success = this.actions.pipe(
            ofType(reservationAction.ActionTypes.SearchSuccess),
            tap(() => { })
        );

        const fail = this.actions.pipe(
            ofType(reservationAction.ActionTypes.SearchFail),
            tap(() => {
                this.util.openAlert({
                    title: this.translate.instant('common.error'),
                    body: this.translate.instant('reservation.search.alert.search')
                });
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    /**
     * 検索条件クリア
     */
    public searchConditionClear() {
        this.conditions = {
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1
        };
    }

    /**
     * 詳細を表示
     */
    public openDetail(reservation: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>) {
        this.modal.show(ReservationDetailModalComponent, {
            class: 'modal-dialog-centered modal-lg',
            initialState: { reservation }
        });
    }

    /**
     * CSVダウンロード
     */
    public async downloadCsv() {
        this.isDownload = true;
        try {
            const params = await this.convertToSearchParams();
            await this.download.reservation(params);
        } catch (error) {
            console.error(error);
        }
        this.isDownload = false;
    }

    /**
     * DatePicker設定
     */
    public setDatePicker() {
        this.user.subscribe((user) => {
            this.localeService.use(user.language);
        }).unsubscribe();
    }

    /**
     * iOS bugfix（2回タップしないと選択できない）
     */
    public onShowPicker(container: BsDatepickerContainerComponent) {
        const dayHoverHandler = container.dayHoverHandler;
        const hoverWrapper = (event: CellHoverEvent) => {
            const { cell, isHovered } = event;
            if ((isHovered &&
                !!navigator.platform &&
                /iPad|iPhone|iPod/.test(navigator.platform)) &&
                'ontouchstart' in window
            ) {
                (<any>this.reservationDateFrom)._datepickerRef.instance.daySelectHandler(cell);
                (<any>this.reservationDateThrough)._datepickerRef.instance.daySelectHandler(cell);
                (<any>this.eventStartDateFrom)._datepickerRef.instance.daySelectHandler(cell);
                (<any>this.eventStartDateThrough)._datepickerRef.instance.daySelectHandler(cell);
            }

            return dayHoverHandler(event);
        };
        container.dayHoverHandler = hoverWrapper;
    }

}
