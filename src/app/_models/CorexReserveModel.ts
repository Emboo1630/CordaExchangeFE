
export class CorexReserveModel {  
         amount: number;
         currency: string;
         userId: string;
         linearId: string;
  constructor(init?: Partial<CorexReserveModel>) {
    Object.assign(this, init);
  }
}
