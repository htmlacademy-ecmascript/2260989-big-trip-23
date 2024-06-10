import {render, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import LoadingView from '../view/loading-view.js';
import EventListView from '../view/event-list-view.js';
import EventLisEmptytView from '../view/event-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import {filter, sorting} from '../utils.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';
import AddPointPresenter from './add-point-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class PointsPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filtersModel = null;

  #loadingComponent = new LoadingView();
  #listComponent = new EventListView();
  #emptyListComponent = null;
  #pointsPresenter = new Map();
  #sortPresenter = null;
  #currentSortType = SortType.DAY;
  #addPointPresenter = null;
  #addPointButtonPresenter = null;
  #isCreating = false;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({
    container,
    destinationsModel,
    offersModel,
    pointsModel,
    filtersModel,
    addPointButtonPresenter
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#addPointButtonPresenter = addPointButtonPresenter;

    this.#addPointPresenter = new AddPointPresenter({
      container: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onDestroy: this.#addPointDestroyHandler,
    });

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filterType = this.#filtersModel.get();
    const filteredPoints = filter[filterType](this.#pointsModel.get());

    return sorting[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderBoard();
  }

  addPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointButtonPresenter.disableButton();
    this.#addPointPresenter.init();
  };

  #renderBoard() {
    if (this.#isLoading) {
      this.#addPointButtonPresenter.disableButton();
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0 && !this.#isCreating) {
      this.#addPointButtonPresenter.enableButton();
      this.#renderEmptyList();
      return;
    }

    this.#addPointButtonPresenter.enableButton();
    this.#renderSort();
    this.#renderList();
    this.#renderPoints();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new EventLisEmptytView({
      filterType: this.#filtersModel.get()
    });
    render(this.#emptyListComponent, this.#container);
  }

  #renderList() {
    render(this.#listComponent, this.#container);
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#container,
      onSortTypeChange: this.#sortTypesChangeHandler
    });

    this.#sortPresenter.init();
  }

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    this.#addPointPresenter.destroy();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    this.#sortPresenter.destroy();
    remove(this.#emptyListComponent);

    if(resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
    this.#addPointPresenter.destroy();
  };

  #addPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#addPointButtonPresenter.enableButton();
    if (this.points.length === 0 && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    if(actionType === UserAction.UPDATE_POINT) {
      this.#pointsPresenter.get(update.id).setSaving();
      try {
        await this.#pointsModel.update(updateType, update);
      } catch {
        this.#pointsPresenter.get(update.id).setAborting();
      }
    }
    if(actionType === UserAction.CREATE_POINT) {
      this.#addPointPresenter.setSaving();
      try {
        await this.#pointsModel.add(updateType, update);
      } catch {
        this.#addPointPresenter.setAborting();
      }
    }
    if(actionType === UserAction.DELETE_POINT) {
      this.#pointsPresenter.get(update.id).setDeleting();
      try {
        await this.#pointsModel.delete(updateType, update);
      } catch {
        this.#pointsPresenter.get(update.id).setAborting();
      }
    }

    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, data) => {
    if(updateType === UpdateType.PATCH) {
      this.#pointsPresenter?.get(data.id)?.init(data);
    }
    if(updateType === UpdateType.MINOR) {
      this.#clearBoard();
      this.#renderBoard();
    }
    if(updateType === UpdateType.MAJOR) {
      this.#clearBoard({resetSortType: true});
      this.#renderBoard();
    }
    if(updateType === UpdateType.INIT) {
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderBoard();
    }
  };

  #sortTypesChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };
}
