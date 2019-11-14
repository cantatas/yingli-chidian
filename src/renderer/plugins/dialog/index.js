import Vue from 'vue';
import cDialog from './Dialog.vue';
const DialogConstructor = Vue.extend(cDialog);
const DialogPool = [];

let config = {};
const action = (act) => {
  config.resolve(act);
};
const getAnInstance = () => {
  if (DialogPool.length > 0) {
    const instance = DialogPool[0];
    DialogPool.splice(0, 1);
    return instance;
  }
  return new DialogConstructor({
    el: document.createElement('div'),
  });
};

const removeDom = (event) => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

const Dialog = (options = {}) => new Promise((resolve, reject) => {
  const instance = getAnInstance();
  instance.callback = action;
  instance.closed = false;
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'middle';
  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.isShow = true;
    instance.$el.removeEventListener('transitionend', removeDom);
  });
  config = { resolve, reject };

  return instance;
});

export default Dialog;
