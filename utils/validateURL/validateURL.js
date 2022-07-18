const validateURL = (URL) => {
  if (URL !== URL.match(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/).join('')) {
    throw new Error('Неверный формат ссылки');
  }
  return URL;
};

module.exports = validateURL;
