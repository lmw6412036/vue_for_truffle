/**
 * 判断浏览器类型
 * @param name
 * iphone
 * android
 * micromessenger
 * @returns {boolean}
 */
export function isBrower(name) {
  let UA = window.navigator.userAgent.toLowerCase();
  return UA.indexOf(name) > -1;
}

/**
 * 生成返回URL
 * @param options
 * @returns {string}
 */
export function makeUrl(options) {
  let url = "";
  if (options.protocol) {
    url += options.protocol + "://"
  }
  if (options.hostname) {
    url += options.hostname
  }
  if (options.port && options.port != 80 && options.port != 443) {
    url += ":" + options.port
  }
  if (options.path) {
    url += options.path
  }
  if (options.query) {
    let q = "";
    for (let key in options.query) {
      if (options.query[key]) {
        q += `&${key}=${options.query[key]}`
      } else {
        q += `&${key}`
      }

    }
    q = q.substr(1);
    url += "?" + q
  }
  if (options.hash) {
    url += "#" + options.hash;
  }
  return url;
}

/**
 * 解析url参数
 * @param from
 * @returns {{protocol: *, hostname: *, port: *, path: *, query: *, hash: *}}
 */
export function getParamsFromUrl(from) {
  let protocol = url("protocol", from);
  let hostname = url("hostname", from);
  let port = url("port", from);
  let path = url("path", from);
  let query = url("?", from);
  let hash = url("hash", from);
  return {protocol, hostname, port, path, query, hash}
}

/**
 *获得环境变量
 */
export function getENV() {
  let host = url('hostname');
  return appConfig.env[host] ? appConfig.env[host] : appConfig.env['localhost'];
}

/**
 * 读取上传的图片
 * @param file
 * @returns {Promise<any>}
 */
export function readFile(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      resolve(fr.result);
    }
    fr.onerror = (e) => {
      reject(e);
    }
  })
}

/**
 *
 * @param timer
 * @returns {Promise<any>}
 */
export function sleep(timer) {
  return new Promise(resolve => {
    setTimeout(resolve(1), timer)
  })
}

/**
 * 读取图片
 * @param url
 * @returns {Promise<any>}
 */
export function readImg(url) {
  let img = new Image();
  return new Promise((resolve, reject) => {
    img.src = url;
    img.onload = () => {
      resolve(img);
    }
    img.onerror = (error) => {
      Log('图片加载错误', error);
      reject(error)
    }
  });
}
