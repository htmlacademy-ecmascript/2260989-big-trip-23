import {render, replace, remove} from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import {SortType, enabledSortType} from '../const.js';


export default class SortPresenter {
  #container = null;
  #sortComponent = null;
  #sortTypes = [];
  #currentSortType = SortType.DAY;
  #sortTypesChangeHandler = null;

  constructor({container, onSortTypeChange}) {
    this.#container = container;
    this.#sortTypes = Object.values(SortType).map((type) => ({
      type,
      isChecked: (type === this.#currentSortType),
      isDisabled: !enabledSortType[type]
    }));
    this.#sortTypesChangeHandler = onSortTypeChange;
  }

  init() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortingView({
      items: this.#sortTypes,
      onItemChange: this.#sortTypesChangeHandler
    });

    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#container);
    }
  }

  destroy() {
    remove(this.#sortComponent);
  }
}
