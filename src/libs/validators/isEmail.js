const EMAIL = /^(?!-)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(?!-)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateLength = value => (minLength, maxLength) => {
  return value.length >= minLength && value.length <= maxLength;
}
const MINLENGTHS = {
  LOCALPART: 1,
  DOMAIN: 1
};
const MAXLENGTH = {
  LOCALPART: 64,
  DOMAIN: 255
};


const isEmailLength = value => {
  const position = value.lastIndexOf('@');
  const local = value.substring(0, position);
  const domain = value.substring(position + 1);
  return (
    validateLength(local)(MINLENGTHS.LOCALPART, MAXLENGTH.LOCALPART) &&
    validateLength(domain)(MINLENGTHS.DOMAIN, MAXLENGTH.DOMAIN)
  );
};

const isEmail = value => isEmailLength(value) && EMAIL.test(value);

module.exports = isEmail;
