export class CorexOrderFlowModel {
         
         amount: number;
         currency: string;
  
  constructor(init?: Partial<CorexOrderFlowModel>) {
    Object.assign(this, init);
  }
}
