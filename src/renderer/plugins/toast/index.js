

import Vue from 'vue';
import cToast from './Toast.vue';
const ToastTpl = Vue.extend(cToast);

const tpl = () => new ToastTpl({
  el: document.createElement('div'),
});

const removeDom = (event) => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};


ToastTpl.prototype.close = () => {
  this.isShow = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.closed = true;
};


const Toast = (options = {}) => {
  const instance = tpl();
  clearTimeout(instance.timer);
  const duration = options.duration || 3000;
  instance.message = typeof options === 'string' ? options : options.message;
  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.isShow = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    instance.timer = setTimeout(() => {
      instance.close();
    }, duration);
  });

  return instance;
};

export default Toast;
