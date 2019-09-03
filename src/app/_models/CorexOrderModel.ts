
export class CorexOrderModel {
         amount: number;
         currency: string;
         status: string;
         issuer: string;
         linearId: string;
  constructor(init?: Partial<CorexOrderModel>) {
    Object.assign(this, init);
  }
}
