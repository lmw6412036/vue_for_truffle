import {BASE_PARAMS} from "./config";
import {getENV} from "./utils";

/**
 *
 * @param file
 * @param options {}
 * ******* progress
 * @returns {Promise<any>}
 */
export default function (file, options) {
  // let sign = hex_md5(hex_md5("aAr9MVS9j1") + 1001 + random);
  let env = getENV();
  var form = new FormData();
  for (let item in BASE_PARAMS) {
    form.append(item, BASE_PARAMS[item])
  }

  for (let key in options) {
    if (typeof options[key] != "function" || typeof options[key] != "object") {
      form.append(key, options[key]);
    }
  }


  form.append('file', file);
  form.append('service', "smarthos.system.file.upload");
  Log('请求', form);

  let promiseXHR = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "//" + env.api);
    xhr.setRequestHeader("sign", 'test')
    xhr.upload.onprogress = options.progress;
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        Log('响应', xhr.responseText)
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.error)
      }
    }
    xhr.send(form)
  })
  return promiseXHR
}


