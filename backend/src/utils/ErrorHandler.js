export class ErrorHandler extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor); //removes unnecesary files and shows the exact origin of the file
    }
}

