
export class CorexExternalDataModel {
    usd: any;
    php: any;
    date: any;
    constructor(init? : Partial<CorexExternalDataModel>){
        Object.assign(this, init);
    }
}