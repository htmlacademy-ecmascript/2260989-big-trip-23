import AbstractView from '../framework/view/abstract-view.js';
import {createEventListEmptyTemplate} from '../templates/event-list-empty-template.js';

export default class EventListEmptyView extends AbstractView {
  get template() {
    return createEventListEmptyTemplate();
  }
}
