import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomComponent} from "./pages/room/room.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {RoomListComponent} from "./pages/room-list/room-list.component";
import {HomeComponent} from "./pages/home/home.component";
import {AutorizationGuard} from "./guards/autorization.guard";

const routes: Routes = [
  {
     path: 'room',
     component: RoomComponent,
     canActivate: [AutorizationGuard],
  },
  {
    path: 'room-list',
    component: RoomListComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
