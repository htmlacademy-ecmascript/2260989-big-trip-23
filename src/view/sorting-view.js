import AbstractView from '../framework/view/abstract-view.js';
import {createSortingTemplate} from '../templates/sorting-template.js';

export default class SortingView extends AbstractView {
  get template() {
    return createSortingTemplate();
  }
}
