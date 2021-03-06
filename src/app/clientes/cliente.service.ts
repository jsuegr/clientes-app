import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import {  Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

private httpHeaders =  new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTE);

    return this.http.get<Cliente[]>(this.urlEndPoint);
    //tambien se puede ocupar map<>

    // return this.http.get(this.urlEndPoint).pipe(
    //   map( response=> response as Cliente[] )
    // );
  }



  create(cliente: Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente, {headers:this.httpHeaders} ).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al consultar el cliente.', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente:Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
        map( (response:any)  => response.cliente as Cliente), //Los operadores se separan por coma
        catchError(
          e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
      })
    );
  }

  delete (id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError( e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
