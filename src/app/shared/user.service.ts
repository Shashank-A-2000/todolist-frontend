import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IUser } from './user';
import {catchError,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private saveUserUrl = "http://localhost:8080/user/signup";
  private loginUserUrl = "http://localhost:8080/user/login";

  saveUser(user: IUser):Observable<Object>{
    return this.http.post(this.saveUserUrl,user).pipe(
      tap(data => console.log(JSON.stringify(data))
      ),catchError(this.handleError)
    );
  }

  loginUser(user:IUser):Observable<Object>{
    return this.http.post(this.loginUserUrl,user).pipe(
      tap(data => console.log(JSON.stringify(data))
      ),catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}


