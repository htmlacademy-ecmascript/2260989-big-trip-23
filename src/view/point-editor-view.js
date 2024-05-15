import AbstractView from '../framework/view/abstract-view.js';
import {createPointEditorTemplate} from '../templates/point-editor-template.js';

export default class PointEditorView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onCloseClick = null;
  #onSubmitForm = null;

  constructor({
    point,
    pointDestination,
    pointOffers,
    onCloseClick,
    onSubmitForm
  }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onCloseClick = onCloseClick;
    this.#onSubmitForm = onSubmitForm;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event.event--edit').addEventListener('submit', this.#saveClickHandler);
  }

  get template() {
    return createPointEditorTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCloseClick();
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitForm();
  };
}
