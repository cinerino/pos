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
    orderStatus: '' | factory.orderStatus;
    paymentMethodType: '' | factory.paymentMethodType;
    eventStartDateFrom?: Date;
    eventStartDateThrough?: Date;
    posId: string;
    page: number;
}
