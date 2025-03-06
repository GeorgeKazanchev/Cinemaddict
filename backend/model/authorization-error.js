const { HttpError } = require('./http-error');

class AuthorizationError extends HttpError {
  constructor() {
    super(401, 'Header Authorization is not correct');
  }
}

module.exports = {
  AuthorizationError,
};
