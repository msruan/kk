export abstract class SystemException extends Error {
    constructor(public message : string){
        super(message)
    }
}

export class HTTPException extends SystemException {
    constructor(public code : number, public message : string = ""){
        super(message)
    }
}

export class NotFoundException extends SystemException {
    constructor(public message : string = ""){
        super(message)
    }
}