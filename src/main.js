import EventsPresenter from './presenter/events-presenter.js';

const siteMainElement = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: siteMainElement});

eventsPresenter.init();
