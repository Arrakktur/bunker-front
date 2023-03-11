import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './pages/room/room.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TableModule} from "primeng/table";
import { HomeComponent } from './pages/home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WebSocketService} from "./services/web-socket.service";
import {SocketIoModule} from "ngx-socket-io";
import {webSocketConfig} from "./constants/websocket.config";
import { AuthComponent } from './pages/auth/auth.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import {AuthModule} from "./pages/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    NotFoundComponent,
    RoomListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    AuthModule,
    SocketIoModule.forRoot(webSocketConfig)
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
