import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { factory } from '@cinerino/api-javascript-client';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { BsLocaleService, BsModalService } from 'ngx-bootstrap';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { getTicketPrice } from '../../../../functions';
import { IReservationSearchConditions } from '../../../../models';
import { DownloadService } from '../../../../services';
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

    constructor(
        private store: Store<reducers.IReservationState>,
        private actions: Actions,
        private modal: BsModalService,
        private router: Router,
        private download: DownloadService,
        private localeService: BsLocaleService
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
                    project: { ids: [environment.PROJECT_ID] },
                    // seller: {
                    //     typeOf: (user.seller === undefined)
                    //         ? undefined : user.seller.typeOf,
                    //     ids: (user.seller === undefined)
                    //         ? undefined : [user.seller.id]
                    // },
                    bookingFrom: this.confirmedConditions.reservationDateFrom,
                    bookingThrough: (this.confirmedConditions.reservationDateThrough === undefined)
                        ? undefined : moment(this.confirmedConditions.reservationDateThrough).add(1, 'day').toDate(),
                    reservationFor: {
                        startFrom: this.confirmedConditions.eventStartDateFrom,
                        startThrough: (this.confirmedConditions.eventStartDateThrough === undefined)
                            ? undefined : moment(this.confirmedConditions.eventStartDateThrough).add(1, 'day').toDate(),
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
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
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

    public setDatePicker() {
        this.user.subscribe((user) => {
            this.localeService.use(user.language);
        }).unsubscribe();
    }

}
