import RadioListView from './radio-list-view.js';
import {capitalizeFirstLetter} from '../utils.js';

const createFilterTypeListTemplate = (filters) => filters.reduce((markup, {
  type,
  isChecked,
  isDisabled
}) => `${markup}
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" data-item="${type}" value="${type}" ${isChecked ? 'checked' : ''} ${(isDisabled) ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
  </div>`, '');

const createFiltersTemplate = (filters) => `
  <form class="trip-filters" action="#" method="get">
      ${createFilterTypeListTemplate(filters)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends RadioListView {

  get template() {
    return createFiltersTemplate(this._items);
  }
}
