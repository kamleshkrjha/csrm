import { Card } from './Card';

export class Player {
    private points = 0;
    card: Card;
    name: string;
    isLive: boolean;
    constructor (name: string, isLive: boolean) {
        this.name = name;
        this.isLive = isLive;
    }
    addPoints = (point: number) => this.points += point;
    getPoints = () => this.points;
}
