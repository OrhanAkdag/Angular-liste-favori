import { Component, OnInit } from '@angular/core';
import { FavoriService } from 'src/app/services/favori.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  totalFavoris: number;

  constructor(private favoriService: FavoriService) { }

  ngOnInit(): void {
    console.log(localStorage.length);
    this.favoriService.totalFavoris.subscribe(total=> this.totalFavoris = total);

  }

}
