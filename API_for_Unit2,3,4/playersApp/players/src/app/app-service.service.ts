import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Players} from '../model/players';
import {environment} from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient ) { }


  index(): Observable<Players[]> {
    return this.http
        .get<Players[]>(`${environment.appApi.baseUrl}/players`);
  }

  show(playerName: number): Observable<Players> {
    return this.http
        .get<Players>(`${environment.appApi.baseUrl}/players/${playerName}`);
  }

  create(player: Players): Observable<Players> {
    return this.http.post<Players>(`${environment.appApi.baseUrl}/players`, player);
  }

  update(player: Partial<Players>): Observable<Players> {
    return this.http.patch<Players>(`${environment.appApi.baseUrl}/players/${player.name}`, player);
  }


  destroy(name: string): Observable<Players> {
    return this.http.delete<Players>(`${environment.appApi.baseUrl}/players/${name}`);
  }

}


