export class CModel {
  private _lastRead?: Date;
  private _lastWrite?: Date;

  constructor(private _id: number) {
    this._lastWrite = new Date();
    this._lastRead = new Date();
  }

  public get id() {
    return this._id;
  }
}
