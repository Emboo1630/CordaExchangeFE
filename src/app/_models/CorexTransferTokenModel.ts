export class CorexTransferTokenModel{
    preOrderId: string;
    walletRef: string;
    constructor(init? : Partial <CorexTransferTokenModel>){
        Object.assign(this, init);
    }
}