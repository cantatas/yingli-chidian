export default {
  methods: {
    log(...args) {
      if ((process && process.env) && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(...args);
      }
    },
  },
};
