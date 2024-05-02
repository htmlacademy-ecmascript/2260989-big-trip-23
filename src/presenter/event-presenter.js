import {render} from '../render.js';
import EventList from '../view/event-list-view.js';
import EditView from '../view/event--edit-view.js';
import EventView from '../view/event-view.js';
export default class EventPresenter {
  eventComponent = new EventList();
  eventListComponent = new EditView();
  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
  }

  init() {
    render(this.eventComponent, this.eventContainer);
    render(new EditView(), this.eventComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventComponent.getElement());
    }
  }
}
