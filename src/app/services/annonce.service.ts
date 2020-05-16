import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annonce } from '../models/annonce';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  apiUrl = 'http://localhost:3000/annonce'

  constructor(private httpClient: HttpClient) { }

  getAnnonces(): Observable<Annonce[]>{
    return this.httpClient.get<Annonce[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent ) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
