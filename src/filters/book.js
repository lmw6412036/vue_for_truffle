/**
 * 预约挂号相关过滤器
 */
import {level} from "../lib/config/book";
import {deptStates,doctStates} from "../lib/config/book";

/**
 * 预约记录订单状态过滤器
 * @param str
 * @returns {string}
 */
export const filter_book_order_state = (str) => {
  if (!str) return "";
};

/**
 * 医院等级
 * @param str
 * @returns {*}
 */
export const filter_book_yydj =(str)=>{
  if (!str) return "";
  for(let i of level){
    if(i.id = str){
      return i.value
    }
  }
  return str;
};

export const filter_striping_date =(str)=>{
  if(!str) return '';
  let t1 = str.slice(0,4);
  let t2 = str.slice(4,6);
  let t3 =str.slice(6);
  let time = t1+'-'+ t2 +'-' + t3;
  return time;
};

export const filter_fee_regfee =(str)=>{
  if(!str) return str;
  if(str=='0.00' ||str=='0.0'|| !str){
    return '0'
  }
  return str;
};

export const filter_deptStates_state = (str)=>{
  if(!str) return '';
  return deptStates[0][str]
};

export const filter_doctStates_state = (str)=>{
  if(!str) return '';
  return doctStates[0][str]
};
