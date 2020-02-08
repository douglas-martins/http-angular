import {HttpClient, HttpHandler, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseMock} from './base-mock';
import {map} from 'rxjs/operators';
import {ComponentValueModel} from '@app/shared/models/base/component.value.model';

/**
 * Base class for any service that will use the HttpClient.
 */
@Injectable()
export class BaseHttp<K extends string, V> extends HttpClient {
  /** Ref for the mock **/
  private mock: BaseMock<K, V>;

  /**
   * Class default constructor.
   * @param: httpHandler
   */
  constructor(
    private httpHandler: HttpHandler
  ) {
    super(httpHandler);
  }

  /**
   * Set the mock value.
   * @param value: BaseMock<K, V> with the value that will be inserted.
   */
  setMock(value: BaseMock<K, V>): void {
    this.mock = value;
  }

  /**
   * Delete service function.
   * @param url: string with entity that will deleted.
   * @param options: any with the values of options for the request.
   * @param id: number with the value of entity id.
   * @return: Observable<T | ComponentValueModel<K, V>> with the observable for the this request.
   */
  public delete<T>(url: string, options?: any, id: number = -1): Observable<T | ComponentValueModel<K, V>> {
    if (!this.mock) {
      return super.delete<T>(url, options).pipe(map(
        (res: HttpResponse<T>) => {
          return res.body;
        }));
    } else {
      return new Observable((observer) => {
        observer.next(this.mock.delete(id));
      });
    }
  }

  /**
   * Patch service function.
   * @param url: string with entity that will patch.
   * @param body: any with the body for the patch request.
   * @param options: any with the values of options for the request.
   * @return: Observable<T | ComponentValueModel<K, V>> with the observable for the this request.
   */
  public patch<T>(url: string, body: any, options?: any): Observable<T | ComponentValueModel<K, V>> {
    if (!this.mock) {
      return super.patch<T>(url, body, options).pipe(map(
        (res: HttpResponse<T>) => {
          return res.body;
        }));
    } else {
      return new Observable((observer) => {
        observer.next(this.mock.updateItem(body));
      });
    }
  }

  /**
   * Head service function
   * @param url: string with entity that will head.
   * @param options: any with the values of options for the request.
   * @return: Observable<T> with the observable for the this request.
   */
  public head<T>(url: string, options?: any): Observable<T> {
    // TODO: Create method
    return null;
  }

  /**
   * Options service function
   * @param url: string with entity that will options.
   * @param options: any with the values of options for the request.
   * @return: Observable<T> with the observable for the this request.
   */
  public options<T>(url: string, options?: any): Observable<T> {
    // TODO: Create method
    return null;
  }

  /**
   * Get service function.
   * @param url: string with entity that will get.
   * @param options: any with the values of options for the request.
   * @param id: number with the value of entity id.
   * @return: Observable<T | ComponentValueModel<K, V>> with the observable for the this request.
   */
  public get<T>(url: string, options?: any, id: number = -1): Observable<T | ComponentValueModel<K, V>> {
    if (!this.mock) {
      return super.get<T>(url, options).pipe(map(
        (res: HttpResponse<T>) => {
          return res.body;
        }));
    } else {
      return new Observable((observer) => {
        observer.next(this.mock.findById(id));
      });
    }
  }

  /**
   * Get All service function.
   * @param url: string with entity that will get all.
   * @param options: any with the values of options for the request.
   * @return: Observable<T[] | ComponentValueModel<K, V>[]> with the observable for the this request.
   */
  public getAll<T>(url: string, options?: any): Observable<T[] | ComponentValueModel<K, V>[]> {
    if (!this.mock) {
      return super.get<T>(url, options).pipe(map(
        (res: HttpResponse<any>) => {
          console.log(res);
          return res.body;
        }));
    } else {
      return new Observable((observer) => {
        observer.next(this.mock.getItemsMock());
      });
    }
  }

  /**
   * Post service function
   * @param url: string with entity that will post.
   * @param body: any with the body for the post request.
   * @param options: any with the values of options for the request.
   * @return: Observable<T | ComponentValueModel<K, V>> with the observable for the this request.
   */
  public post<T>(url: string, body: any, options?: any): Observable<T | ComponentValueModel<K, V>> {
    if (!this.mock) {
      return super.post<T>(url, body, options).pipe(map(
        (res: HttpResponse<T>) => {
          return res.body;
        }));
    } else {
      return new Observable((observer) => {
        observer.next(this.mock.insertItem(body));
      });
    }
  }

  /**
   * Put service function.
   * @param url: string with entity that will post.
   * @param body: any with the put for the post request.
   * @param options: any with the values of options for the request.
   * @return: Observable<T | ComponentValueModel<K, V>> with the observable for the this request.
   */
  public put<T>(url: string, body: any, options?: any): Observable<T | ComponentValueModel<K, V>> {
    if (!this.mock) {
      return super.put<T>(url, body, options).pipe(map(
        (res: HttpResponse<T>) => {
          return res.body;
        }));
    } else {
      return new Observable((observer) => {
        observer.next(this.mock.updateItem(body));
      });
    }
  }
}
