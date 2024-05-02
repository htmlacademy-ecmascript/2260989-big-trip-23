import {createElement} from '../render.js';
import {createEditTemplate} from '../template/event-edit-template.js';

export default class EditView {
  getTemplate() {
    return createEditTemplate;
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.eement = null;
  }
}
