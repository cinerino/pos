
import { factory } from '@cinerino/api-javascript-client';
import { Action } from '@ngrx/store';
import { IDecodeResult } from '../../models';

/**
 * Action types
 */
export enum ActionTypes {
    Delete = '[Admission] Delete',
    SelectSchedule = '[Admission] Select Schedule',
    SelectScheduleDate = '[Admission] Select Schedule Date',
    GetScreeningEvent = '[Admission] Get Screening Event',
    GetScreeningEventSuccess = '[Admission] Get Screening Event Success',
    GetScreeningEventFail = '[Admission] Get Screening Event Fail',
    InitializeQrcodeToken = '[Admission] Initialize Qrcode Token',
    Check = '[Admission] Check',
    CheckSuccess = '[Admission] Check Success',
    CheckFail = '[Admission] Check Fail'
}

/**
 * Delete
 */
export class Delete implements Action {
    public readonly type = ActionTypes.Delete;
    constructor(public payload: {}) { }
}

/**
 * SelectSchedule
 */
export class SelectSchedule implements Action {
    public readonly type = ActionTypes.SelectSchedule;
    constructor(public payload: { screeningEvent: factory.chevre.event.screeningEvent.IEvent }) { }
}

/**
 * SelectScheduleDate
 */
export class SelectScheduleDate implements Action {
    public readonly type = ActionTypes.SelectScheduleDate;
    constructor(public payload: { scheduleDate: string }) { }
}

/**
 * GetScreeningEvent
 */
export class GetScreeningEvent implements Action {
    public readonly type = ActionTypes.GetScreeningEvent;
    constructor(public payload: { screeningEvent: factory.chevre.event.screeningEvent.IEvent }) { }
}

/**
 * GetScreeningEventSuccess
 */
export class GetScreeningEventSuccess implements Action {
    public readonly type = ActionTypes.GetScreeningEventSuccess;
    constructor(public payload: { screeningEvent: factory.chevre.event.screeningEvent.IEvent }) { }
}

/**
 * GetScreeningEventFail
 */
export class GetScreeningEventFail implements Action {
    public readonly type = ActionTypes.GetScreeningEventFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * InitializeQrcodeToken
 */
export class InitializeQrcodeToken implements Action {
    public readonly type = ActionTypes.InitializeQrcodeToken;
    constructor(public payload?: {}) { }
}

/**
 * Check
 */
export class Check implements Action {
    public readonly type = ActionTypes.Check;
    constructor(public payload: {
        code: string;
        screeningEvent: factory.chevre.event.screeningEvent.IEvent
    }) { }
}

/**
 * CheckSuccess
 */
export class CheckSuccess implements Action {
    public readonly type = ActionTypes.CheckSuccess;
    constructor(public payload: {
        token?: string;
        decodeResult?: IDecodeResult;
        availableReservation?: factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
        checkTokenActions: factory.action.check.token.IAction[];
        statusCode: number;
    }) { }
}

/**
 * CheckFail
 */
export class CheckFail implements Action {
    public readonly type = ActionTypes.CheckFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * Actions
 */
export type Actions =
    | Delete
    | SelectSchedule
    | SelectScheduleDate
    | GetScreeningEvent
    | GetScreeningEventSuccess
    | GetScreeningEventFail
    | InitializeQrcodeToken
    | Check
    | CheckSuccess
    | CheckFail;
