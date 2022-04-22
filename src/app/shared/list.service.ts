import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { textElement } from '@syncfusion/ej2-angular-charts';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ITask } from './tasks';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }

  private getListsUrl : string = "";

  // saveUser(user: IUser):Observable<Object>{
  //   return this.http.post(this.saveUserUrl,user).pipe(
  //     tap(data => console.log(JSON.stringify(data))
  //     ),catchError(this.handleError)
  //   );
  // }

  // loginUser(user:IUser):Observable<Object>{
  //   return this.http.post(this.loginUserUrl,user).pipe(
  //     tap(data => console.log(JSON.stringify(data))
  //     ),catchError(this.handleError)
  //   );
  // }
  private addTaskUrl = "http://localhost:8080/todolist/add-task"
  addTask(task : any):Observable<ITask>{
    console.log(task);

    return this.http.post<ITask>(this.addTaskUrl,task).pipe(
          tap(data => console.log(JSON.stringify(data))
          ),catchError(this.handleError));
  }

  getLists(id:number):Observable<ITask[]>{
    this.getListsUrl = "http://localhost:8080/todolist/" + id;

    return this.http.get<ITask[]>(this.getListsUrl).pipe(
      tap(data => console.log(JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  private changeStatusUrl = "http://localhost:8080/todolist/update-status";
  changeStatus(statusTask:any):Observable<ITask>{
    return this.http.patch<ITask>(this.changeStatusUrl,statusTask).pipe(
      tap(data => console.log(JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  private deleteTaskUrl = "";
  deleteTaskById(deleteTaskId:number):Observable<string>{
    this.deleteTaskUrl = "http://localhost:8080/todolist/delete/" + deleteTaskId;
    return this.http.delete(this.deleteTaskUrl,{responseType:'text'}).pipe(
      tap(data => console.log(JSON.stringify(data))
      ),
      catchError(this.handleError)
    );

  }

  private changeTaskUrl = "http://localhost:8080/todolist/update";
  changeTask(updatedTask:any):Observable<ITask>{

    return this.http.put<ITask>(this.changeTaskUrl,updatedTask).pipe(
      tap(data => console.log(JSON.stringify(data))
      ),
      catchError(this.handleError)
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
