import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {ICreateRoom, IRoom} from "../../interfaces/room.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../../services/authorization.service";
import {HandleService} from "../../services/handle.service";
import {ERoomState} from "../../constants/constants";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  createForm: FormGroup = new FormGroup({});
  connectForm: FormGroup = new FormGroup({});
  isOpenCreateRoom = false;
  ERoomState = ERoomState;
  roomList: IRoom[] = [];
  loadingRefresh = false;
  loadingCreate = false;
  first = 0;
  rows = 10;

  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private authorizationService: AuthorizationService, private handleService: HandleService) {
  }

  ngOnInit(): void {
    this.apiService.getAllRoom().subscribe(roomList => {
      this.roomList = roomList.map((room) => {
        return {
          ...room,
          status: ERoomState[room.status],
        }
      });
    });
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.connectForm = this.fb.group({
      guid: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.roomList ? this.first === (this.roomList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.roomList ? this.first === 0 : true;
  }

  navigate(link: string): Promise<boolean> {
    return this.router.navigateByUrl(link);
  }

  changeStateCreateOpen(): void {
    this.isOpenCreateRoom = !this.isOpenCreateRoom;
  }

  createRoom(): void {
    this.loadingCreate = true;
    const createRoomData: ICreateRoom = {
      admin: 1,
      name: this.createForm.get('name')?.value,
    }
    this.apiService.createRoom(createRoomData).subscribe((room: IRoom) => {
      this.roomList.unshift(room);
      this.isOpenCreateRoom = false;
      this.loadingCreate = false;
      this.connectRoom(room.guid);
    }, (error: Error) => {
      alert(error);
      this.loadingCreate = false;
    })
  }

  refresh() {
    this.loadingRefresh = true;
    this.apiService.getAllRoom().subscribe((roomList) => {
      this.roomList = roomList.map((room) => {
        return {
          ...room,
          status: ERoomState[room.status],
        }
      });
      this.loadingRefresh = false;
    })
  }

  connectRoom(guid: string = this.createForm.get('guid')?.value) {
    this.apiService.connectRoom(
      {
        guidRoom: guid || this.createForm.get('guid')?.value,
        token: this.authorizationService.token!,
      }
    ).subscribe((success) => {
      if (success) {
        this.navigate(`/room?guid=${guid}`);
      } else {
        alert('Ошибка подключения к комнате, проверьте токен');
      }
    }, (error: Error) => {
      this.handleService.handleError(error);
    });
  }
}
