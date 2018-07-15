import * as BOOK from './config/book'

/**
 * 预约挂号模块相关配置
 * @type {{level?}}
 */
export const BOOK_COBFIG = BOOK;

export const APP_NAME = 'qzwlmz_';

/**
 * 基础参数
 * @type {{channel: string, format: string, oper: string, random: string, spid: string}}
 */
export const BASE_PARAMS = {
  "channel": "23",
  "format": "JSON",
  "oper": "127.0.0.1",
  "random": "1234",
  "spid": "1001"
}

export const MY_NAV = [
  {name: '系统设置', icon: 'xitongshezhi'},
  {name: '个人中心', icon: 'gerenzhongxin'},
  {name: '关于我们', id: 'kefu', icon: 'guanyuwomen'},
]

/**
 * cardType
 * @type {*[]}
 */
export const CardType = [
  {text: '注册医疗卡', value: '01'},
  {text: '医保卡', value: '04'},
  {text: '省保一卡通', value: '11'}
]

/**
 *
 * @type {string}
 */

export const bookHosId = '057802';
export const HOSID = '057802';

export const navButton = [
  {name: '预约记录', imgUrl: 'static/img/online/book-record.png', router: "/my/order",},
  {name: '我的处方', imgUrl: 'static/img/online/prescription.png', router: "/invoice",},
  {name: '个人中心', imgUrl: 'static/img/online/per-center.png', router: "/my"}
];

export const bookIcon = [
  {name: 'count-icon', iconUrl: 'static/img/book-item/count-icon.png'},
  {name: 'video-icon', iconUrl: 'static/img/book-item/video-icon.png'}
];

export const relationShip = ["本人", "父母", "配偶", '子女', '亲戚', '朋友', '其他']


export const medicalinfo = [
  {type: "presentingComplaint", name: '所患疾病'},
  {type: "pastHistory", name: '既往史'},
  {type: "familyHistory", name: '家族史'},
  {type: "allergyHistory", name: '过敏史'},
]

export const download = {
  android: 'http://wechat.qzhospital.com/download/qzwlyy.apk',
  iphone: '',
};

export const deptStates = [
  {0:'预约',1:'已满',2:'停诊',3:'不挂号',5:'未发布',6:'删除'},
];

export const doctStates =[
  {0:'未排班',1:'停诊',2:'已满',3:'即将放号',4:'预约'},
];
