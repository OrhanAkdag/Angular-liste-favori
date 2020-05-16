import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { FavoriService } from 'src/app/services/favori.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {

  totalFavoris: number;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private favoriService: FavoriService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.favoriService.totalFavoris.subscribe(total=> this.totalFavoris = total);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
