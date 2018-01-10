//NodeModules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

//custom
import { MessageService } from '../../../sharedServices/message.service';
import { httpOptions } from '../../../sharedServices/httpOptions';
import { Group } from '../classes/group';
import { errorHandler } from '@angular/platform-browser/src/browser';



@Injectable()
export class GroupService {
  private baseUrl = '/api/group';
  public groupList: Group[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getgroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl)
      .pipe(
      tap(groups => {
        this.log(`fetched groups`);
      }),
      catchError(this.handleError(`getgroups`, []))
      );

  }

  getgroup(id: number): Observable<Group> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Group>(url)
      .pipe(
      tap(group =>
        this.log(`fetched group id=${id}`)),

      catchError(this.handleError<Group>(`getgroup id=${id}`))
      )
  }




  private log(message: string) {
    this.messageService.add('groupService: ' + message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
