import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleService {

  constructor() { }

  handleError(error: Error){
    if (error.name){
      alert(error.name + '\n' + error.message);
    } else {
      alert(error);
    }
  }
}
