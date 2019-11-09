

function change(t) {
  if (t < 10) {
    return `0${t}`;
  }
  return t;
}

export default {
  dataFormat(time) {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = change(d.getMonth() + 1);
    const day = change(d.getDate());
    const hour = change(d.getHours());
    const minute = change(d.getMinutes());
    const second = change(d.getSeconds());
    return {
      fullTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      Date: `${year}-${month}-${day}`,
      time: `${hour}:${minute}`,
    };
  },
  getDayName(d, isNum) {
    let td = new Date();
    td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
    let od = new Date(d);
    od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
    const xc = (od - td) / 1000 / 60 / 60 / 24;
    let diff = '';
    let str = '';

    if (xc < -2) {
      str = `${-xc}天前`;
      diff = xc;
    } else if (xc < -1) {
      diff = xc;
      str = '前天';
    } else if (xc < 0) {
      diff = xc;
      str = '昨天';
    } else if (xc === 0) {
      diff = xc;
      str = '今天';
    } else if (xc < 2) {
      diff = xc;
      str = '明天';
    } else if (xc < 3) {
      diff = xc;
      str = '后天';
    } else {
      diff = xc;
      str = `${xc}天后`;
    }
    if (isNum) {
      return diff;
    }
    return str;
  },
};
