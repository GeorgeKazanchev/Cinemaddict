export default class ResponseError extends Error {
    constructor(status: number, ...params: any[]) {
        super(...params);
        this._status = status;
    }

    private _status: number;

    public get status(): number {
        return this._status;
    }
}
