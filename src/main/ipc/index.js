
import ajax from '../ajax';
import { ipcMain } from 'electron' // eslint-disable-line

export default {
  init() {
    this.index();
  },
  index() {
    // 搜索
    ipcMain.on('indexQueryWords', (e, msg) => {
      ajax.getQuery(msg).then((res) => {
        e.sender.send('indexQueryResult', res);
      }, (res) => {
        e.sender.send('indexQueryResult', res);
      });
    });
    // 每日一句
    ipcMain.on('getEverydayEnglish', (e, msg) => {
      ajax.getEverydayEnglish(msg).then((res) => {
        e.sender.send('setEverydayEnglish', res);
      }, (res) => {
        e.sender.send('setEverydayEnglish', res);
      });
    });
  },
};
