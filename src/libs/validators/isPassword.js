/* eslint-disable no-useless-escape */
const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$-+=*.\[\]{}\(\)?\-\\"!@#%&/,><\':;|_~`])\S{6,99}$/;

const isAllowedPassword = value => PASSWORD.test(value);

module.exports = isAllowedPassword;
