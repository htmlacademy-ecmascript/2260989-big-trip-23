import AbstractView from '../framework/view/abstract-view.js';
import {getTripRoute, getTripDurationPeriod, getTripCost,} from '../utils.js';

const createTripInfoTemplate = ({isEmpty, route, duration, cost}) => isEmpty ? `
<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Loading...</h1>
      <p class="trip-info__dates">Loading...</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>
  </section>` : `
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>
    <p class="trip-info__dates">${duration}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
</section>`;

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinations = null;
  #offers = null;

  constructor({
    destinations,
    offers,
    points,
  }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate({
      isEmpty: this.#points.length === 0,
      route: getTripRoute(this.#points, this.#destinations),
      duration: getTripDurationPeriod(this.#points),
      cost: getTripCost(this.#points, this.#offers),
    });
  }
}
