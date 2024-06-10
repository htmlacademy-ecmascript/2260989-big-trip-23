import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';
import AddPointButtonPresenter from './presenter/add-point-button-presenter.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';

const mockService = new MockService();

const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const filtersModel = new FiltersModel();
const tripMainContainer = document.querySelector('.trip-main');
const pointsContainer = document.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter({
  pointsModel,
  filtersModel
});
const tripInfoPresenter = new TripInfoPresenter({
  container: tripMainContainer,
  pointsModel
});
const addPointButtonPresenter = new AddPointButtonPresenter({
  container: tripMainContainer
});
const pointsPresenter = new PointsPresenter({
  container: pointsContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filtersModel,
  addPointButtonPresenter: addPointButtonPresenter
});

export default class BigTripApp {
  init() {
    tripInfoPresenter.init();
    filtersPresenter.init();
    addPointButtonPresenter.init({
      onButtonClick: pointsPresenter.addPointButtonClickHandler
    });
    pointsPresenter.init();
  }
}
