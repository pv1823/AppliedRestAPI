import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Players } from '../model/players';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  @Input()
  player!: Players;
  @Input()
  name!: Players["name"];
  @Output() edit = new EventEmitter<Players>();
  @Output() show = new EventEmitter<Players>();
  @Output() remove = new EventEmitter<Players>();

  playerTrackByFn = (index: number, player: Players) => player.name;
  constructor() {}



  showDetails(player: Players) {
    this.show.emit(player);
  }

  editPlayer(player: Players) {
    this.edit.emit(player);
  }

  deletePlayer(player: Players) {
    this.remove.emit(player);
  }
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'players';
  p = this.player;
}
