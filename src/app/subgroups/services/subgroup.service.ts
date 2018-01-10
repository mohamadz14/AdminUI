// NodeModules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


//Custom
import { MessageService } from '../../../sharedServices/message.service';
import { httpOptions } from '../../../sharedServices/httpOptions';
import { Subgroup } from '../classes/Subgroup';



@Injectable()
export class SubgroupService {

    private baseUrl = '/api/subgroup';
    public subgroupList: Subgroup[];


    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }


    getSubgroups(): Observable<Subgroup[]> {
        return this.http.get<Subgroup[]>(this.baseUrl)
            .pipe(
            tap(subgroups => {
                this.log(`fetched subgroups`);
            }),
            catchError(this.handleError('getsubgroups', []))
             );
    }



    getSubgroup(id: number): Observable<Subgroup> {
        const url = `${this.baseUrl}/${id}`;

        return this.http.get<Subgroup>(url)
            .pipe(
            tap(subgroup => this.log(`fetched subgroup id=${id}`)),
            catchError(this.handleError<Subgroup>(`getSubgroup id=${id}`))
            )
    }


    deleteSubgroup(subgroup: Subgroup | number): Observable<Subgroup> {
        const id = typeof subgroup === 'number' ? subgroup : subgroup.id;

        const url = `${this.baseUrl}/${id}`;

        // alert(url);

        return this.http.delete<Subgroup>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted subgroup id=${id}`)),
            catchError(this.handleError<Subgroup>('deleteSubgroup'))
        );
    }


    createSubgroup(subgroup: Subgroup): Observable<Subgroup> {
        const url = `${this.baseUrl}`;

        // console.log(subgroup);
        // console.info(body);

        return this.http.post<Subgroup>(url, subgroup, httpOptions).pipe(
            tap((subgroup: Subgroup) => this.log(`added subgroup w/ id=${subgroup.id}`)),
            catchError(this.handleError<Subgroup>('addsubgroup'))
        )
    }


    updateSubgroup(subgroup: Subgroup): Observable<Subgroup> {
        const url = `${this.baseUrl}`;

        return this.http.put<Subgroup>(url, subgroup, httpOptions).pipe(
            tap(_ => this.log(`updated subgroup id=${subgroup.id}`)),
            catchError(this.handleError<any>('updateSubgroup'))
        );
    }


    private log(message: string) {
        this.messageService.add('subgroupService: ' + message);
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
