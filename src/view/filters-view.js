import AbstractView from '../framework/view/abstract-view.js';
import {createFiltersTemplate} from '../templates/filters-template';

export default class FiltersView extends AbstractView {
  #points = [];

  // constructor() {
  //   super();
  //   this.#points = points;
  // }

  get template() {
    return createFiltersTemplate();
  }
}
