const BASE_URL = 'http://localhost:5000';

export const ITEMS_URL = BASE_URL + '/api/items';
export const ITEMS_TAGS_URL = ITEMS_URL + '/tags';
export const ITEMS_BY_SEARCH_URL = ITEMS_URL + '/search/';
export const ITEMS_BY_TAG_URL = ITEMS_URL + '/tag/';
export const ITEM_BY_ID_URL = ITEMS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
