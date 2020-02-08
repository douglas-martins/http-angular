import {ComponentValueModel} from '@app/shared/models/base/component.value.model';

/**
 * A base class for mock some models on this system.
 */
export class BaseMock<K extends string, V> {
  /** Ref for the array with the object for the mocks **/
  private itemsMock: Array<ComponentValueModel<K, V>>;

  /**
   * Default class constructor.
   */
  constructor() {
    this.itemsMock = new Array<ComponentValueModel<K, V>>();
  }

  /**
   * Generate a UID for the mock.
   */
  private generateId(): number {
    let aux = 0;
    this.itemsMock.forEach((item) => {
      if (item.getValue()['id'] > aux) {
        aux = item.getValue()['id'];
      }
    });

    return aux + 1;
  }

  /**
   * Set item mock on the array.
   * @param mock: ComponentValueModel<K, V> with the value for the mock that will be inserted.
   */
  public setItemMock(mock: ComponentValueModel<K, V>): void {
    this.itemsMock.push(mock);
  }

  /**
   * Get all mocks on the array.
   * @return: Array<ComponentValueModel<K, V>>
   */
  public getItemsMock(): Array<ComponentValueModel<K, V>> {
    return this.itemsMock;
  }

  /**
   * Insert item on the mocks array.
   * @param item: ComponentValueModel<K, V> with the value that will be inserted.
   * @return: ComponentValueModel<K, V> with the value of object that was instead.
   */
  public insertItem(item: ComponentValueModel<K, V>): ComponentValueModel<K, V> {
    item.getValue()['id'] = this.generateId();
    this.itemsMock.push(item);
    return Object.assign({}, item);
  }

  /**
   * Update a mock item on the array.
   * @param item: ComponentValueModel<K, V> with the item value that will change.
   * @return: ComponentValueModel<K, V> with the item that was updated.
   */
  public updateItem(item: ComponentValueModel<K, V>): ComponentValueModel<K, V> {
    this.itemsMock.forEach((p, index) => {
      if (p.getValue()['id'] === item.getValue()['id']) {
        this.itemsMock[index] = item;
      }
    });

    return Object.assign({}, item);
  }

  /**
   * Find the mock by the id generated for him.
   * @param id: number with the id for the mock.
   * @return: ComponentValueModel<K, V> with the reference for the item.
   */
  public findById(id: number): ComponentValueModel<K, V> {
    const item = this.itemsMock.find((res) => res.getValue()['id'] === id);
    return Object.assign({}, item);
  }

  /**
   * Delete a item on the mocks array,
   * @param id: number with the index of the item that will be deleted.
   * @return: ComponentValueModel<K, V> with the value of the object that was deleted.
   */
  public delete(id: number): ComponentValueModel<K, V> {
    let aux = null;
    let pos = -1;

    this.itemsMock.forEach((p, index) => {
      if (p.getValue()['id'] === id) {
        aux = this.itemsMock[index];
        pos = index;
      }
    });

    if (pos > -1) {
      this.itemsMock.splice(pos, 1);
    }

    return Object.assign({}, aux);
  }
}
