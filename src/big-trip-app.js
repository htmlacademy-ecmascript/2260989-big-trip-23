import {AUTHORIZATION, END_POINT} from './const.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';
import AddPointButtonPresenter from './presenter/add-point-button-presenter.js';
import PointsApiService from './service/points-api-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const pointsModel = new PointsModel({
  service: pointsApiService,
  destinationsModel,
  offersModel
});

const filtersModel = new FiltersModel();
const tripMainContainerNode = document.querySelector('.trip-main');
const pointsContainerNode = document.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter({
  pointsModel,
  filtersModel
});
const tripInfoPresenter = new TripInfoPresenter({
  container: tripMainContainerNode,
  destinationsModel,
  offersModel,
  pointsModel,
});
const addPointButtonPresenter = new AddPointButtonPresenter({
  container: tripMainContainerNode
});
const pointsPresenter = new PointsPresenter({
  container: pointsContainerNode,
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
    pointsModel.init();
  }
}
