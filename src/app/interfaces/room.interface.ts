import {ERoomState, TRoomState} from "../constants/constants";

export interface IRoom {
  admin: number;
  guid: string;
  id: number;
  name: string;
  players: number;
  status: ERoomState;
}

export interface IRoomResponse {
  admin: number;
  guid: string;
  id: number;
  name: string;
  players: number;
  status: TRoomState;
}

export interface ICreateRoom {
  admin: number;
  name: string;
}

export interface IConnectRoom {
  token: string | null;
  guidRoom: string;
}

export interface IConnectRoomResponse {
  success: boolean,
}
