

// eslint-disable-next-line import/no-extraneous-dependencies
import { clipboard } from 'electron';
import timeTool from '@/common/time';
import { Toast } from '@/plugins';

export default {
  dateFormat(time) {
    return timeTool.dataFormat(time).time;
  },
  getDayName(time) {
    return timeTool.getDayName(time);
  },
  copyResult(value) { // 复制翻译结果
    clipboard.writeText(value || this.resultVal);
    Toast('复制成功');
  },
};
