import {render} from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import {SortType, enabledSortType} from '../const';

export default class SortPresenter {
  #container = null;
  #sorTypes = [];
  #currentSortType = SortType.DAY;

  constructor({container}) {
    this.#container = container;
    this.#sorTypes = Object.values(SortType).map((type) => ({
      type,
      isChecked: (type === this.#currentSortType),
      isDisabled: !enabledSortType[type]
    }));
  }

  init() {
    render(new SortingView({
      items: this.#sorTypes,
    }), this.#container);
  }
}
