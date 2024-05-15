import AbstractView from '../framework/view/abstract-view.js';
import {FILTER_TYPES} from '../const.js';
import {toCapitalize} from '../utils.js';

const createFilterTypeListTemplate = (filterTypeList) => filterTypeList.reduce((markup, type, id)=>`${markup}
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${(id === 0) ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${toCapitalize(type)}</label>
  </div>`, '');

const createFiltersTemplate = () => `<form class="trip-filters" action="#" method="get">
    ${createFilterTypeListTemplate(FILTER_TYPES)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends AbstractView {

  get template() {
    return createFiltersTemplate();
  }
}
