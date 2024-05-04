import {render} from '../render.js';
import EventListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import PointEditorView from '../view/point-editor-view.js';
import SortingView from '../view/sorting-view.js';

const POINTS_COUNT = 3;

export default class PointsPresenter {
  listComponent = new EventListView();
  sortingComponent = new SortingView();

  constructor({
    tripEventsContainer
  }) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(this.sortingComponent, this.tripEventsContainer);
    render(this.listComponent, this.tripEventsContainer);
    render(new PointEditorView(), this.listComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new EventItemView(), this.listComponent.getElement());
    }
  }
}
