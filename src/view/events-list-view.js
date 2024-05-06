import {createElement} from '../render.js';


//Класс для создания и упрвления списком событий в UI
export default class EventListView {
  getTemplate() {
    return createEventListTemplate();
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

function createEventListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}
