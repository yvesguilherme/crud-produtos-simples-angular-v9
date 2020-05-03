import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  readById(id: string): Observable<Product> {
    const url = this.montarUrl(id);

    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  update(product: Product): Observable<Product> {
    const url = this.montarUrl(product);

    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  delete(id: string): Observable<Product> {
    const url = this.montarUrl(id);

    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(error => this.errorHandler(error))
    );
  }

  montarUrl(parametro: any) {
    return typeof parametro === 'string' ? `${this.baseUrl}/${parametro}` : `${this.baseUrl}/${parametro.id}`;
  }

  errorHandler(error: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);

    return EMPTY;
  }
}
