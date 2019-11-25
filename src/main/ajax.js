
import MD5 from './md5';
import { net } from 'electron' // eslint-disable-line

const USEAGES = {
  appid: '20191030000349600',
  key: 'uS8h2NZItQYaSvpLLHpw',
  translateAPI: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
  languageAPI: 'https://fanyi-api.baidu.com/api/trans/vip/language',
  salt: new Date().getTime(),
};

// const isEN = val => /[_a-zA-Z]/.test(val);

const httpRequest = api => new Promise((resolve, reject) => {
  const request = net.request(api);
  request.on('response', (response) => {
    response.on('data', (chunk) => {
      resolve(`${chunk}`);
    });
    response.on('error', (error) => {
      reject(error);
    });
  });
  request.end();
});

export default {
  getQuery(param) {
    const MD5STR = MD5(`${USEAGES.appid}${param.query}${USEAGES.salt}${USEAGES.key}`);
    const languageAPI = `${USEAGES.languageAPI}?q=${param.query}&appid=${USEAGES.appid}&salt=${USEAGES.salt}&sign=${MD5STR}`;
    let translateAPI = `${USEAGES.translateAPI}?q=${param.query}&appid=${USEAGES.appid}&salt=${USEAGES.salt}&from={from}&to=${param.transTo}&sign=${MD5STR}`;
    if (param.from) {
      translateAPI = translateAPI.replace('{from}', param.from);
      return httpRequest(translateAPI);
    }
    return httpRequest(languageAPI).then((lngRes) => { // 识别语言
      lngRes = typeof lngRes === 'string' ? JSON.parse(lngRes) : lngRes;
      if (lngRes.error_code === '0') {
        if (lngRes.data.src !== 'zh') {
          param.transTo = 'zh';
        }
        translateAPI = translateAPI.replace('{from}', lngRes.data.src);
        return httpRequest(translateAPI); // 翻译
      }
      return Promise.reject(lngRes);
    });
  },
};
