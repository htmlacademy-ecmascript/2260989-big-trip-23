import {createElement} from '../render.js';

export default class EventsList {
  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

function createEventsListTemplate() {
  return '<ul class="trip-events__list">';
}
