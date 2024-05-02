import {createElement} from '../render.js';
import {createEventsListTemplate} from '../template/event-list-template.js';

export default class EventList {
  getTemplate() {
    return createEventsListTemplate;
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
