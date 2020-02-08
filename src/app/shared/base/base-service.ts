import { Injectable } from '@angular/core';
import {BaseHttp} from './base-http';
import {ComponentValueModel} from '@app/shared/models/base/component.value.model';
import {BaseMock} from './base-mock';

@Injectable({
  providedIn: 'root'
})
export class BaseService<K extends string, V> {
  /** Ref for the mock for testing **/
  private mock: BaseMock<K, V>;

  /** Ref for the url service for the API request **/
  protected url: string;

  /** **/
  // protected listUrl: string;

  /** Ref  **/
  // protected onlyUrl: string;

  /**
   * Default class constructor.
   * @param http:
   */
  constructor(
    public http: BaseHttp<K, V>,
  ) {
    this.url = 'http://douglas.serve'; // TODO: Get from the environment
    this.mock = null;
  }

  /**
   * Set mock value.
   * @param value: BaseMock<K, V> with the value that will be inserted on the mock.
   */
  public setMock(value: BaseMock<K, V>): void {
    this.mock = value;
    this.http.setMock(this.mock);
  }

  /**
   * Get the mock value.
   * @return: BaseMock<K, V> with the value of the mock.
   */
  public getMock(): BaseMock<K, V> {
    return this.mock;
  }

  /**
   * Convert a model to a JSON which can be sent to the server.
   */
  protected convert(value: ComponentValueModel<K, V> | BaseMock<K, V>): ComponentValueModel<K, V> | BaseMock<K, V> {
    return Object.assign({}, value);
  }
}
