
export enum CARD_TYPE { CHOR, SIPAHI, RAJA, MANTRI }

export class Card {
    private points: any = [0, 500, 1000, 800];
    private icon_names: string[] = ['chor', 'sipahi', 'raja', 'mantri'];
    type: CARD_TYPE;
    constructor(type: CARD_TYPE) {
        this.type = type;
     }
    getPoint(): number {
        return this.points[this.type];
    }
    isHide (): boolean {
        return (this.type === CARD_TYPE.CHOR) || (this.type === CARD_TYPE.MANTRI);
    }
    getIconPath (): string {
        return 'assets/' + this.icon_names[this.type] + '.png';
    }
}
