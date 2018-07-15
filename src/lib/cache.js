import storage from 'good-storage'
import {APP_NAME} from "./config";

class Cache {
  constructor(key, session = false) {
    if (session) {
      this.storage = storage.session;
    } else {
      this.storage = storage;
    }
    this.key = key;
  }

  get() {
    return this.storage.get(this.key, null);
  }

  set(value) {
    this.storage.set(this.key, value)
  }

  remove() {
    this.storage.remove(this.key);
  }
}


const prefix = APP_NAME + VERSION + "_";

const openidKey = prefix + "openid";
/**
 * openid
 * @type {Cache}
 */
export const openidCache = new Cache(openidKey);

const dataKey = prefix + 'data';
/**
 * 通用data传参
 * @type {Cache}
 */
export const dataCache = new Cache(dataKey, true);
/**
 * 通用data传参
 * @type {Cache}
 */
const userKey = prefix + 'user';
export const userCache = new Cache(userKey);


const bookDeptKey = prefix + "book_dept";
export const bookDeptCache = new Cache(bookDeptKey);

const orderTimeKey = prefix + "order_time";
export const orderTimeCache = new Cache(orderTimeKey);
