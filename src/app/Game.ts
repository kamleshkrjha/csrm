import { Card, CARD_TYPE } from './Card';
import { Player } from './Player';
export enum GAME_STATES {SHUFFLE, START, MOVE, COMPLETE}
export class Game {
    turns: number;
    completedTurns: any = [];
    private livePlayers: number;
    private totalPlayers = 4;
    current_state: GAME_STATES;
    constructor (turns: number, livePlayers: number) {
        this.turns = turns || 20; // default number of turns
        this.livePlayers = livePlayers;
    }
    updateLivePlayers = players => this.livePlayers = players;

    startTurn(cardTypes: Card []): Card [] {
        // generate random cards for each player
        this.turns--;
        this.current_state = GAME_STATES.START;
        return this.randomizeCards(cardTypes);
        // switch(this.livePlayers) {
        //     case 0:
        //         return this.randomizeCards(cardTypes);
        //     case 1:
        //         return this.randomizeCards()
        // }
    }

    finishTurn (cardType: CARD_TYPE): boolean {
        this.current_state = GAME_STATES.MOVE;
        return cardType === CARD_TYPE.CHOR;
    }

    private randomizeCards(CardTypes: Card[]) {
        // rotating an array a random number of times in clockwise or anti clockwise direction
        const rotations: number = parseInt('' + Math.random() * 1000, 10);
         for (let i = 0; i < rotations; i++) {
            const direction: number = parseInt(Number.parseInt('' + Math.random() * 1000, 10) % 2 + '', 10);
            if (!direction) {
                // clockwise
                CardTypes.unshift(CardTypes.pop());
            } else {
                CardTypes.push(CardTypes.shift());
            }
        }
        return CardTypes;
    }
}
