export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum ResponseSuccessStatus {
    MIN = 200,
    MAX = 299
}

export enum ResponseErrorStatus {
    AUTH_ERROR = 401,
    NOT_FOUND_ERROR = 404
}

export enum ErrorMessage {
    AUTH_ERROR = 'Header Authorization is not correct',
    NOT_FOUND_ERROR = 'Not found'
}
