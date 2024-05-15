import {render,replace} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import EventLisEmptytView from '../view/event-list-empty-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';
import SortingView from '../view/sorting-view.js';

export default class PointsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #listComponent = new EventListView();
  #sortingComponent = new SortingView();

  constructor({
    pointsContainer,
    pointsModel,
    offersModel,
    destinationsModel
  }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#points = [...this.#pointsModel.get()];
  }

  init() {
    if (!this.#points.length) {
      render(new EventLisEmptytView(), this.#pointsContainer);
      return;
    }

    render(this.#sortingComponent, this.#pointsContainer);
    render(this.#listComponent, this.#pointsContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: pointEditHandler,
    });

    const pointEditComponent = new PointEditorView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onCloseClick: pointCloseHandler,
      onSubmitForm: pointSubmitHandler
    });

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditorToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function replacePointToEditor() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditorToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    function pointEditHandler () {
      replacePointToEditor();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function pointSubmitHandler() {
      replaceEditorToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function pointCloseHandler() {
      replaceEditorToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#listComponent.element);
  };
}
