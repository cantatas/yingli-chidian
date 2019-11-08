
export default {
  register(globalShortcut, win) {
    // 快捷键打开
    const ret = globalShortcut.register('command+option+X', () => {
      if (win.isFocused()) { // 判断窗口是否聚焦
        win.blur();
      } else {
        win.focus();
      }
    });

    // eslint-disable-next-line no-empty
    if (!ret) {

    }

    // 检查快捷键是否注册成功
    // eslint-disable-next-line no-empty
    if (globalShortcut.isRegistered('command+option+X')) {

    }
  },
};
