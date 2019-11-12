
import ajax from '../ajax';
import { ipcMain,net } from 'electron' // eslint-disable-line

export default {
  init() {
    this.index();
  },
  index() {
    // 搜索
    ipcMain.on('indexQueryWords', (e, msg) => {
      ajax.getQuery(msg).then((res) => {
        e.sender.send('indexQueryResult', res);
      });
    });
  },
};
