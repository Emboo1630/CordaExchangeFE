export class CorexMoveFungibleTokensModel {
    recipient: string;
    orderId: string;
    constructor(init? : Partial<CorexMoveFungibleTokensModel>){
        Object.assign(this, init);
    }
}