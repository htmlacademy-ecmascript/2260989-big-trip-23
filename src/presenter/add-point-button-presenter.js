import {render} from '../framework/render.js';
import AddPointButtonVeiw from '../view/add-point-button-veiw.js';

export default class AddPointButtonPresenter {
  #container = null;
  #buttonComponent = null;
  #handleButtonClick = null;

  constructor({container}) {
    this.#container = container;
  }

  init({onButtonClick}) {
    this.#handleButtonClick = onButtonClick;
    this.#buttonComponent = new AddPointButtonVeiw({onNewPointButtonClick: this.#buttonClickHandler});
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
