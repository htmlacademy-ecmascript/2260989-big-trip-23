import {render, replace, remove, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #container = null;
  #tripInfoComponent = null;

  constructor({container}) {
    this.#container = container;
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView();

    if(!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

    render(this.#tripInfoComponent, this.#container);
  }
}
