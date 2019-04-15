/**
 * 環境変数dev
 */
export const environment = {
    production: false,
    APP_PREFIX: 'CI',
    PROJECT_ID: 'cinerino',
    ENV: 'development',
    ENTRANCE_SERVER_URL: '',
    WAITER_SERVER_URL: 'https://waiter-development.appspot.com',
    ANALYTICS_ID: '',
    VIEW_TYPE: 'cinema',
    STORAGE_NAME: 'CINERINO-POS-STATE',
    STORAGE_TYPE: 'localStorage',
    BASE_URL: '/purchase/root',
    HEADER_MENU: true,
    HEADER_MENU_SCOPE: ['purchase', 'inquiry', 'order', 'admission', 'setting', 'auth', 'development'],
    PURCHASE_CART_MAX_LENGTH: '1',
    PURCHASE_TRANSACTION_TIME: '15',
    PURCHASE_PRE_SCHEDULE_DATE: '3',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_VALUE: '15',
    PURCHASE_SCHEDULE_STATUS_THRESHOLD_UNIT: '%',
    INQUIRY_CANCEL: true,
    INQUIRY_QRCODE: true,
    INQUIRY_PRINT: true,
    PRINT_FILTER_SUPER_EVENT_ID: [],
    PRINT_QR_CODE_TYPE: 'token'
};
