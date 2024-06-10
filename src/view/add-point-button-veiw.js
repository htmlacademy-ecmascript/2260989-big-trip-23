import AbstractView from '../framework/view/abstract-view.js';

const createAddPointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class AddPointButtonView extends AbstractView {
  #handleButtonClick = null;

  constructor({onNewPointButtonClick}) {
    super();
    this.#handleButtonClick = onNewPointButtonClick;

    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createAddPointButtonTemplate();
  }

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}
