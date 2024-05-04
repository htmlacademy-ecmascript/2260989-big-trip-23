import TripInfoView from './view/trip-info-view.js';
import TripCostView from './view/trip-cost-view.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import {render} from './render.js';

const siteTripInfoElement = document.querySelector('.trip-info');
const siteTripControlsElement = document.querySelector('.trip-controls');
const siteMainElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: siteMainElement});

render(new TripInfoView(), siteTripInfoElement);
render(new TripCostView(), siteTripInfoElement);
render(new FilterView(), siteTripControlsElement);

eventsPresenter.init();
