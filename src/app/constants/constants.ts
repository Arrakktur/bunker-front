export enum ERoomState {
  wait = 'Ожидание игроков',
  start = 'Ожидание начала игры',
  process = 'Игра в процессе',
  end = 'Окончание игры',
}

export type TRoomState = 'wait' | 'start' | 'process' | 'end';
