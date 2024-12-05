export class ErrorHandler extends Error{
    constructor(message, statusCode) {
        super(message);
        Error.captureStackTrace(this); //removes unnecesary files and shows the exact origin of the file
        this.statusCode = statusCode;
    }
}

