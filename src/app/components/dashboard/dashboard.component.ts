import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';
import { Annonce } from 'src/app/models/annonce';
import { FavoriService } from 'src/app/services/favori.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading : boolean;
  annonceLocalStorage = [];
  annonces : Annonce[];
  totalFavoris: number;

  constructor(private annonceService: AnnonceService, private favoriService: FavoriService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.totalFavoris = localStorage.length;
    this.favoriService.totalFavoris.subscribe(total=> this.totalFavoris = total);
    this.annonceService.getAnnonces().subscribe((data: Annonce[]) =>{
      if(localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++){
          this.annonceLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      this.annonces = data;
      this.isLoading = false;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  addFavori(annonce: Annonce){
    localStorage.setItem('annonce'+annonce.id,JSON.stringify(annonce.id));
    this.totalFavoris = localStorage.length;
    this.favoriService.updateTotalFavori(this.totalFavoris);
    this.annonceLocalStorage.push(JSON.parse(localStorage.getItem('annonce'+annonce.id)));
    this.openSnackBar(annonce.title + ' ' + annonce.id + ' a été ajouté aux favoris', '' +this.totalFavoris);
  }

  removeFavori(annonce: Annonce){
    for (let i = 0; i < this.annonceLocalStorage.length; i++){
      let value = annonce.id;
      this.annonceLocalStorage = this.annonceLocalStorage.filter(item => item !== value)
      //console.log(this.annonceLocalStorage,this.annonceLocalStorage.includes(annonce.id))
    }
    localStorage.removeItem('annonce'+annonce.id);
    this.totalFavoris = localStorage.length;
    this.favoriService.updateTotalFavori(this.totalFavoris);
    this.openSnackBar(annonce.title + ' ' + annonce.id + ' a été retiré des favoris', '' +this.totalFavoris);
  }

}
