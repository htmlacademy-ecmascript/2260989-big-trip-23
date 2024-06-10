import {render} from '../framework/render.js';
import AddPointButtonView from '../view/add-point-button-view.js';

export default class AddPointButtonPresenter {
  #container = null;
  #buttonComponent = null;
  #handleButtonClick = null;

  constructor({container}) {
    this.#container = container;
  }

  init({onButtonClick}) {
    this.#handleButtonClick = onButtonClick;
    this.#buttonComponent = new AddPointButtonView({onNewPointButtonClick: this.#buttonClickHandler});
    render(this.#buttonComponent, this.#container);
  }

  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}
