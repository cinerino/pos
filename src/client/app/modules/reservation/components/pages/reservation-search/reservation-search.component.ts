import { Component, OnInit, ViewChild } from '@angular/core';
import { factory } from '@cinerino/api-javascript-client';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BsDatepickerDirective, BsLocaleService, BsModalService } from 'ngx-bootstrap';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { input2ReservationSearchCondition, iOSDatepickerTapBugFix } from '../../../../../functions';
import { IReservationSearchConditions } from '../../../../../models';
import { ReservationService, UserService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';
import {
    ReservationDetailModalComponent
} from '../../../../shared/components/parts/reservation/detail-modal/detail-modal.component';

@Component({
    selector: 'app-reservation-search',
    templateUrl: './reservation-search.component.html',
    styleUrls: ['./reservation-search.component.scss']
})
export class ReservationSearchComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<string | null>;
    public user: Observable<reducers.IUserState>;
    public reservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    public nextReservations: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>[];
    public totalCount: number;
    public currentPage: number;
    public moment: typeof moment = moment;
    public reservationStatus = factory.chevre.reservationStatusType;
    public limit: number;
    public conditions: IReservationSearchConditions;
    public confirmedConditions: IReservationSearchConditions;
    public environment = getEnvironment();
    @ViewChild('reservationDateFrom', { static: true }) private reservationDateFrom: BsDatepickerDirective;
    @ViewChild('reservationDateThrough', { static: true }) private reservationDateThrough: BsDatepickerDirective;
    @ViewChild('eventStartDateFrom', { static: true }) private eventStartDateFrom: BsDatepickerDirective;
    @ViewChild('eventStartDateThrough', { static: true }) private eventStartDateThrough: BsDatepickerDirective;

    constructor(
        private store: Store<reducers.IReservationState>,
        private modal: BsModalService,
        private localeService: BsLocaleService,
        private utilService: UtilService,
        private reservationService: ReservationService,
        private translate: TranslateService,
        private userService: UserService
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
        this.user = this.store.pipe(select(reducers.getUser));
        this.reservations = [];
        this.totalCount = 100000;
        this.currentPage = 1;
        this.limit = 20;
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            reservationDateFrom: moment(today).add(-13, 'day').toDate(),
            reservationDateThrough: moment(today).toDate(),
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1
        };
        this.reservationService.delete();
    }

    /**
     * 検索
     */
    public async reservationSearch(changeConditions: boolean, event?: { page: number }) {
        this.currentPage = 1;
        if (event !== undefined) {
            this.currentPage = event.page;
            this.confirmedConditions.page = event.page;
        }
        // iOS bugfix
        this.conditions.id
            = (<HTMLInputElement>document.getElementById('id')).value;
        this.conditions.reservationNumber
            = (<HTMLInputElement>document.getElementById('reservationNumber')).value;
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
        try {
            const params = input2ReservationSearchCondition({
                input: this.confirmedConditions,
                theater: (await this.userService.getData()).theater,
                page: this.currentPage,
                limit: this.limit
            });
            if (params.bookingFrom !== null
                && params.bookingThrough !== null
                && moment(params.bookingThrough).diff(moment(params.bookingFrom), 'day') > 14) {
                    // 予約日の範囲が14日以上
                    throw new Error('reservation date wrong date range').message;
                }
            this.reservations = (await this.reservationService.search(params)).data;
            this.nextReservations = (await this.reservationService.search({...params, page: (this.currentPage + 1)})).data;
            this.totalCount = (this.nextReservations.length === 0) ? this.currentPage * this.limit : 100000;
        } catch (error) {
            console.error(error);
            this.utilService.openAlert({
                title: this.translate.instant('common.error'),
                body: this.translate.instant('reservation.search.alert.search')
            });
        }
    }

    /**
     * 検索条件クリア
     */
    public searchConditionClear() {
        const now = moment().toDate();
        const today = moment(moment(now).format('YYYYMMDD'));
        this.conditions = {
            reservationDateFrom: moment(today).add(-13, 'day').toDate(),
            reservationDateThrough: moment(today).toDate(),
            id: '',
            reservationNumber: '',
            reservationStatus: '',
            page: 1
        };
        // iOS bugfix
        (<HTMLInputElement>document.getElementById('id')).value = '';
        (<HTMLInputElement>document.getElementById('reservationNumber')).value = '';
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
        iOSDatepickerTapBugFix(container, [
            this.reservationDateFrom,
            this.reservationDateThrough,
            this.eventStartDateFrom,
            this.eventStartDateThrough
        ]);
    }

}
