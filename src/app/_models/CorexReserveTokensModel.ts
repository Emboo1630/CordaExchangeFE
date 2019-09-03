
export class CorexReserveTokensModel {
         amount: Number;
         currency: String;
         userId: String;
  constructor(init?: Partial<CorexReserveTokensModel>) {
    Object.assign(this, init);
  }
}
