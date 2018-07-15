import {openidCache} from "./lib/cache";
import {getENV, getParamsFromUrl, isBrower} from "./lib/utils";

if (!document.referrer) {
  alert('该页面不能直接打开');
} else if (process.env.NODE_ENV === 'development') {
  if (isBrower('micromessenger')) {
    doOauth2();
  } else {
    let arr = [
      'odQo50f-sTO4fjJjz20HPBS0a0ss',
      'odQo50Ui8Pek0RRxHjfCDxpQdIr4',
      'odQo50Vuxxi4rIvoEFdEBL5OlXzo',
      'odQo50UhhQSNpC9nlyIjBylELYuU'
    ];
    openidCache.set(arr[0]);
    redirect();
  }
} else if (process.env.NODE_ENV === 'production') {
  if (isBrower('micromessenger')) {
    doOauth2()
  } else {
    openidCache.set('odQo50Ui8Pek0RRxHjfCDxpQdIr4');
    redirect();
  }
} else {

}


function doOauth2() {
  let {appid, plat} = getENV();
  let query = url("?") || {};
  if (query && query.openid) {
    openidCache.set(query.openid);
    redirect();
  } else {
    location.replace(`http://test-zheer-wx.hztywl.cn/oauth2/?appid=${appid}&callback=${encodeURIComponent(location.href)}&plat=${plat}`);
  }
}


/**
 *重定向
 */
function redirect() {
  let {query} = getParamsFromUrl(location.href);
  if (query && query.callback) {
    location.replace(query.callback);
  } else {
    alert("没有callback参数");
  }
}



