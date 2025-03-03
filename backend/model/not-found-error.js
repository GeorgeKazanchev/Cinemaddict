const { HttpError } = require('./http-error');

class NotFoundError extends HttpError {
  constructor() {
    super(404, 'Not found');
  }
}

module.exports = {
  NotFoundError,
};
