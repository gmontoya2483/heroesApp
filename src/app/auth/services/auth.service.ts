import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {Auth} from '../interfaces/auth.interface';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  // tslint:disable-next-line:variable-name
  private _auth: Auth | undefined;

  get auth(): Auth {
    return {...this._auth};
  }

  constructor( private http: HttpClient,
               private router: Router) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        tap ( auth => {
          this._auth = auth;
          localStorage.setItem('token', auth.id!);
        })
      );
  }

  logout(): void {
    this._auth = undefined;
    localStorage.removeItem('token');
    this.router.navigate(['./auth/login']);
  }

  verificaAutenticacion(): Observable<boolean>{

    if ( !localStorage.getItem('token' )){
      return of (false);
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`).pipe(
      map( auth => {
        console.log('map', auth);
        this._auth = auth;
        return true;
      })
    );
  }

}
