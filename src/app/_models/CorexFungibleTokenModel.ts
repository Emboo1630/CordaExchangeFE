export class CorexFungibleTokenModel {
    amount: string;
    holder: string;
    hash: string;
    constructor(init? : Partial<CorexFungibleTokenModel>){
        Object.assign(this, init);
    }
}