import { ViewType } from '../app/models';

/**
 * 環境変数local
 */
export const environment = {
    production: false,

    APP_PREFIX: 'CI',
    PROJECT_ID: 'cinerino',
    ENV: 'local',
    ENTRANCE_SERVER_URL: '',
    WAITER_SERVER_URL: 'https://waiter-development.appspot.com',
    ANALYTICS_ID: '',
    PURCHASE_CART_MAX_LENGTH: '1',
    VIEW_TYPE: ViewType.Cinema,
    TRANSACTION_TIME: '30',
    STORAGE_NAME: 'CINERINO-POS-STATE',
    STORAGE_TYPE: 'localStorage',
    BASE_URL: '/purchase/root',
    HEADER_MENU: true,
    ROUTE_SCOPE: ['purchase', 'inquiry', 'order', 'admission', 'setting', 'auth', 'development'],
    SCHEDULE_STATUS_THRESHOLD: { value: '30', unit: '%' },
    INQUIRY_CANCEL: true,
    INQUIRY_QRCODE: true,
    INQUIRY_PRINT: true
};
