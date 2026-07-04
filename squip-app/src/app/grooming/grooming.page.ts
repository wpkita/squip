import {Component, OnInit} from '@angular/core';
import {Idea} from '../ideas/idea';
import {Game} from './game';
import {GamesService} from './games.service';
import { IdeasService } from '../ideas/ideas.service';

@Component({
  selector: 'app-grooming',
  templateUrl: './grooming.page.html',
  styleUrls: ['./grooming.page.scss'],
  standalone: false,
})
export class GroomingPage implements OnInit {
  game?: Game;
  filter: string = '';
  shouldShowFilter: boolean = false;
  tags: string[] = [];

  constructor(
    private gamesService: GamesService,
    private ideasService: IdeasService
  ) { }

  ngOnInit(): void {
    this.resetGame();
    this.ideasService.getAllTags().subscribe(tags => this.tags = tags);
  }

  toggleFilter(): void {
    this.shouldShowFilter = !this.shouldShowFilter;
    if (!this.shouldShowFilter) {
      this.clearFilter();
    }
  }

  changeFilter() {
    this.resetGame();
  }

  clearFilter() {
    this.filter = '';
    this.resetGame();
  }

  resetGame(): void {
    this.gamesService.getNextGame(this.filter).subscribe(game => (this.game = game));
  }

  choose(game: Game, winner: Idea) {
    game.winnerId = winner.id;
    this.gamesService.saveGame(game).subscribe(() => {
      this.resetGame();
    });
  }

  getStatus(game: Game, idea: Idea): string {
    if (game.winnerId) {
      return game.winnerId! === idea.id ? 'winner' : 'loser';
    }

    return '';
  }
}
