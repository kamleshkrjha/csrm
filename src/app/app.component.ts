import { Player } from './Player';
import { Game, GAME_STATES } from './Game';
import { Card, CARD_TYPE } from './Card';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// @Directive ({
//   selector: '[ngSwitch]'
// })
export class AppComponent implements OnInit {
  title = 'Chor Sipahi Raja Mantri';
  game: Game;
  players: Player [];
  cards: Card [];
  livePlayers = 0;
  states = GAME_STATES;
  totalTurns = 10; // this should be input from Users

  ngOnInit ()  {
    this.game = new Game(this.totalTurns, this.livePlayers);
    this.createPlayers();
    this.createCards();
    this.start();
  }

  private createPlayers(): void {
    this.players = [new Player('kkj', false), new Player('C1', false), new Player('C2', false), new Player('C3', false)];
  }
  private createCards (): void {
    this.cards = [new Card(CARD_TYPE.CHOR), new Card(CARD_TYPE.SIPAHI), new Card(CARD_TYPE.RAJA), new Card(CARD_TYPE.MANTRI)];
  }

  isGameInProgress(): boolean {
    return (this.game.turns > 0);
  }
  start() {
    this.game.current_state = GAME_STATES.SHUFFLE;
  }

  play() {
    this.cards = this.game.startTurn(this.cards);
    if (this.livePlayers === 1) {
// TBD
    } else {
      this.players.forEach((player, index) => {
        player.card = this.cards[index];
      });
    }
  }

  selectCard(player) {
    const isCorrectGuess = this.game.finishTurn(player.card.type);
    if (!isCorrectGuess) {
      window.setTimeout (() => {
        this.swapCards();
        this.game.current_state = GAME_STATES.COMPLETE;
        this.addPoints();
      }, 1000);
    } else {
      this.addPoints();
    }
  }

  addPoints () {
    window.setTimeout(() => {
      this.players.forEach((player) => {
        player.addPoints(player.card.getPoint());
      });
      this.game.current_state = GAME_STATES.SHUFFLE;
    }, 1000);
  }

  swapCards(): void {
    const sipahi_indx = this.players.findIndex((pl) => pl.card.type === CARD_TYPE.SIPAHI);
    const chor_indx = this.players.findIndex((pl) => pl.card.type === CARD_TYPE.CHOR);
    this.players[sipahi_indx].card.type = CARD_TYPE.CHOR;
    this.players[chor_indx].card.type = CARD_TYPE.SIPAHI;
  }

}
