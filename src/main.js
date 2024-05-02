import {render} from '../src/render.js';
import FilterView from '../src/view/filter-view.js';
import SortView from '../src/view/sort-view.js';


import EventPresenter from './presenter/event-presenter.js';


const pageHeader = document.querySelector('.page-header');
const tripFilters = pageHeader.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-body__page-main');
const tripEvents = pageMain.querySelector('.trip-events');


const eventPresenter = new EventPresenter({eventContainer: tripEvents});

render (new FilterView(),tripFilters);
render (new SortView(), tripEvents);


eventPresenter.init();
