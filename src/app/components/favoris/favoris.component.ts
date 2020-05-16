import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';
import { Annonce } from 'src/app/models/annonce';
import { FavoriService } from 'src/app/services/favori.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {

  annonceLocalStorage = [];
  annonces : Annonce[];
  favorisList= [];
  totalFavoris: number;

  constructor(private annonceService: AnnonceService, private favoriService: FavoriService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe((data: Annonce[]) =>{
      if(localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++){
          this.annonceLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      this.annonces = data;
      this.favorisList = data.filter(({id}) => this.annonceLocalStorage.includes(id));
      this.totalFavoris = localStorage.length;
      //console.log(this.favorisList);
      //console.log(this.annonceLocalStorage);
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
    });
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
