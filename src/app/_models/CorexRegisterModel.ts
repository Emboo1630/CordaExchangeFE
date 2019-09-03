
export class CorexRegisterModel {
         name: string;
         amount: Array<Number> = [];
         currency: Array<string> = [];
        //  fractionDigits: Array<Number> = [];
  constructor(init?: Partial<CorexRegisterModel>) {
    Object.assign(this, init);
  }
}
