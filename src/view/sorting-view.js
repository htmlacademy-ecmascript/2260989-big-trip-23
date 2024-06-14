import RadioListView from './radio-list-view.js';
import {capitalizeFirstLetter} from '../utils.js';

const createSortTypeListTemplate = (sorting) => sorting.reduce((markup, {
  type,
  isDisabled,
  isChecked
})=> `${markup}
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-item="${type}" value="sort-${type}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
  </div>`, '');

const createSortingTemplate = (sorting) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortTypeListTemplate(sorting)}
  </form>`;

export default class SortingView extends RadioListView {

  get template() {
    return createSortingTemplate(this._items);
  }
}

