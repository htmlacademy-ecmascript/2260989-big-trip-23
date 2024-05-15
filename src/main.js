import PointsPresenter from './presenter/points-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import MockService from './service/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';

const pointsContainer = document.querySelector('.trip-events');

const mockService = new MockService();

const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const pointsPresenter = new PointsPresenter({
  pointsContainer,
  destinationsModel,
  offersModel,
  pointsModel
});

const filtersPresenter = new FiltersPresenter();
const tripInfoPresenter = new TripInfoPresenter();

pointsPresenter.init();
filtersPresenter.init();
tripInfoPresenter.init();
