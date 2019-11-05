
import MD5 from './md5.js';
import { net } from 'electron' // eslint-disable-line

const USEAGES = {
  appid: '20191030000349600',
  key: 'uS8h2NZItQYaSvpLLHpw',
  api: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
  salt: new Date().getTime(),
};

export default {
  getQuery(query, cb) {
    const md5 = MD5(`${USEAGES.appid}${query}${USEAGES.salt}${USEAGES.key}`);
    const API = `${USEAGES.api}?q=${query}&appid=${USEAGES.appid}&salt=${USEAGES.salt}&from=zh&to=en&sign=${md5}`;
    const request = net.request(API);

    request.on('response', (response) => {
      response.on('data', (chunk) => {
        cb(`${chunk}`);
      });
      response.on('end', () => {
      });
      response.on('error', () => {
        cb();
      });
    });
    request.end();
  },
};
