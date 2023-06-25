import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchPlayers();
  }

  fetchPlayers(): void {
    this.http.get<any[]>('/players').subscribe(
      players => {
        this.players = players;
      },
      error => {
        console.error('Error fetching players:', error);
      }
    );
  }

  deletePlayer(name: string): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.http.delete(`/players/${name}`).subscribe(
        () => {
          console.log('Player deleted successfully.');
          this.fetchPlayers();
        },
        error => {
          console.error('Error deleting player:', error);
        }
      );
    }
  }

  goToPlayerDetails(name: string): void {
    this.router.navigate(['/players', name]);
  }
}
