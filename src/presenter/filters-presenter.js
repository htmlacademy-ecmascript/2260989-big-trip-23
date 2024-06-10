import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {filter} from '../utils';
import {UpdateType} from '../const';

export default class FiltersPresenter {
  #container = document.querySelector('.trip-controls__filters');
  #pointsModel = null;
  #filtersModel = null;
  #currentFilter = null;
  #filterComponent = null;

  constructor({pointsModel, filtersModel}) {
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const points = this.#pointsModel.get();

    return Object.entries(filter)
      .map(([filterType, filterPoints]) => ({
        type: filterType,
        isChecked: filterType === this.#currentFilter,
        isDisabled: filterPoints(points).length === 0
      }));
  }

  init() {
    this.#currentFilter = this.#filtersModel.get();
    const filters = this.filters;

    const prevFiltersComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView({
      items: filters,
      onItemChange: this.#filterTypesChangeHandler
    });

    if(!prevFiltersComponent) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #filterTypesChangeHandler = (filterType) => {
    this.#filtersModel.set(UpdateType.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
