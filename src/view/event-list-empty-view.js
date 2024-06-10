import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListMessage} from '../const.js';

const createEventListEmptyTemplate = ({message}) => `<p class="trip-events__msg">${message}</p>`;

export default class EventListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEventListEmptyTemplate({message: EmptyListMessage[(this.#filterType).toUpperCase()]});
  }
}
