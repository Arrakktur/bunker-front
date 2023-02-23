import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WebSocketService} from "../../services/web-socket.service";
import {AuthorizationService} from "../../services/authorization.service";
import {HandleService} from "../../services/handle.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  private guid: string = '';

  constructor(
    private router: Router,
    private webSocketService: WebSocketService,
    private authorizationService: AuthorizationService,
    private activatedRouter: ActivatedRoute,
    private handleService: HandleService) {
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      const guid = params['guid'];
      if (!guid) {
        this.handleService.handleError(new Error('ошибка с Guid'));
        this.router.navigateByUrl('/room-list');
      }
      this.guid = guid;
    })
    this.webSocketService.create();
    // this.webSocketService.getMessage().subscribe((data) => {
    //   console.log(data);
    // })
    this.webSocketService.connectRoom({
      token: this.authorizationService.token,
      guidRoom: this.guid,
    });
  }

  navigate(): void {
    this.router.navigateByUrl('room-list');
  }

  sendData() {
    const message = {
      name: 'test',
      test: 'testText',
    }
  }

}
