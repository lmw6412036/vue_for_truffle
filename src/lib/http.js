import axios from 'axios';
import {getENV} from "./utils";
import weuijs from 'weui.js'
import {BASE_PARAMS} from "./config";
import {openidCache} from "./cache";

export default function (service, data, method = 'post', loading = true) {
  let env = getENV(), load;
  Log(`请求 ${service}`, data);

  data = Object.assign({}, data, {service}, BASE_PARAMS, {
    token: "OPENID_PAT_" + openidCache.get()
  });


  return new Promise((resolve, reject) => {
    //loading && (load = weuijs.loading('加载中...'));
    loading && (bus.$emit('loading', '加载中...'))
    let axiosConfig = {
      url: `//${env.api}`,
      method,
      data,
      headers: {
        sign: 'test'
      }
    };
    axios(axiosConfig).then(res => {
      loading && (bus.$emit('loading', false))
      //loading && load.hide();
      if (res.status == 200) {
        Log(`响应 ${service}`, res.data);
        resolve(res.data);
      } else {
        weuijs.alert('错误代码:' + res.status);
        reject(res);
      }
    }).catch(errsr => {
      loading && (bus.$emit('loading', false))
      //loading && load.hide();
      Log('error', errsr);
      reject(errsr);
    })
  })
}
