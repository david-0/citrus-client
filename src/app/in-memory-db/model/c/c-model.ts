export class CModel {
  private _lastRead?: Date;
  private _lastWrite?: Date;

  constructor(public readonly id: number) {
    this._lastWrite = new Date();
    this._lastRead = new Date();
  }
}
