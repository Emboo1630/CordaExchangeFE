import { responseDefault } from './responseDefault';

export class CorexSelfIssueModel{
    amount: number;
    currency: string;
    constructor(init? : Partial<CorexSelfIssueModel>){
        Object.assign(this, init);
    }
}