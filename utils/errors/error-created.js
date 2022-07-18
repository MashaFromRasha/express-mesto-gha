class ErrorCreated extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 201;
  }
}

module.exports = ErrorCreated;
