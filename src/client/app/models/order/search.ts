import { factory } from '@cinerino/api-javascript-client';

export interface IOrderSearchConditions {
    orderDateFrom?: Date;
    orderDateThrough?: Date;
    confirmationNumber: string;
    orderNumber: string;
    customer: {
        familyName: string;
        givenName: string;
        email: string;
        telephone: string;
    };
    orderStatuses: '' | factory.orderStatus;
    page: number;
}
