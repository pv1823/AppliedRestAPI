import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  { path: 'players', component: PlayerListComponent },
  { path: 'players/:name', component: PlayerDetailsComponent },
  { path: '', redirectTo: '/players', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
