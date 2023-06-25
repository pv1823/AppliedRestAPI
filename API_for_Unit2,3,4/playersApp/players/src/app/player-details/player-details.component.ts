import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  player: any;
  name!: string | null;


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
      if (this.name) {
        this.fetchPlayerDetails(this.name);
      }
    });
  }

  fetchPlayerDetails(name: string): void {
    this.http.get<any>(`/players/${name}`).subscribe(
      player => {
        this.player = player;
      },
      error => {
        console.error('Error fetching player details:', error);
      }
    );
  }
}
