import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleService {

  constructor() { }

  handleError(error: Error){
    alert(error);
  }
}
