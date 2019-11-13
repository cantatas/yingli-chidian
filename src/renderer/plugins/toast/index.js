

import Vue from 'vue';
import cToast from './Toast.vue';
const ToastConstructor = Vue.extend(cToast);
const toastPool = [];

const getAnInstance = () => {
  if (toastPool.length > 0) {
    const instance = toastPool[0];
    toastPool.splice(0, 1);
    return instance;
  }
  return new ToastConstructor({
    el: document.createElement('div'),
  });
};

const removeDom = (event) => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

const Toast = (options = {}) => {
  const instance = getAnInstance();
  instance.closed = false;
  clearTimeout(instance.timer);
  const duration = options.duration || 3000;
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'middle';
  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.isShow = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    instance.timer = setTimeout(() => {
      instance.isShow = false;
      instance.$el.addEventListener('transitionend', removeDom);
      instance.closed = true;
    }, duration);
  });

  return instance;
};

export default Toast;
