import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  private sendFavori = new BehaviorSubject<number>(localStorage.length);
  totalFavoris = this.sendFavori.asObservable();

  constructor() { }

  updateTotalFavori(total: number){
    this.sendFavori.next(total);
  }

}
