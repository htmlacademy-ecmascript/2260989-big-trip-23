import EventsList from '../view/events-list-view.js';
import EditPointView from '../view/edit-point-form-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  eventsListComponent = new EventsList();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(new NewPointView(), this.eventsListComponent.getElement());
    render(new PointView(), this.eventsListComponent.getElement());
    render(new EditPointView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.eventsListComponent.getElement());
    }
  }
}
