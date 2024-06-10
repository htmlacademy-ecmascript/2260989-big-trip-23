import {Counts} from '../mock/const.js';
import {getRandomPositiveNumber, getRandomArrayElement} from '../mock/utils.js';
import {generateMockDestinations} from '../mock/destinations.js';
import {generateMockOffers} from '../mock/offers.js';
import {generateMockPoint} from '../mock/point.js';
import {EVENT_TYPES} from '../const.js';

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = this.#getUniqDestinations();
    this.#offers = this.#generateOffers();
    this.#points = this.#generatePoints();
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  #generateDestinations() {
    return Array.from({
      length: Counts.DESTINATIONS
    }, () => generateMockDestinations());
  }

  #generateOffers() {
    return EVENT_TYPES.map((type) => ({
      type,
      offers: Array.from({
        length: getRandomPositiveNumber(0, Counts.OFFERS)
      }, () => generateMockOffers(type))
    }));
  }

  #generatePoints() {
    return Array.from({
      length: Counts.POINTS
    }, () => {
      const type = getRandomArrayElement(EVENT_TYPES);
      const destination = getRandomArrayElement(this.#destinations);

      const offersByType = this.#offers.find((offerByType) => offerByType.type === type);

      const randomOffers = new Set();
      Array.from({
        length: getRandomPositiveNumber(1, offersByType.offers.length)
      }, () => {
        randomOffers.add(getRandomArrayElement(offersByType.offers));
      });
      const hasOffers = (randomOffers.size > 0 && [...randomOffers][0]);
      const offerIDs = hasOffers ? [...randomOffers]
        .map((offer) => offer.id) : [];

      return generateMockPoint(type, destination.id, offerIDs);
    });
  }

  #getUniqDestinations() {
    const uniqDestinations = [];
    this.#generateDestinations().forEach((destination) => {
      if (!uniqDestinations.some((uniqDestination) => uniqDestination.name === destination.name)) {
        uniqDestinations.push(destination);
      }
    });
    return uniqDestinations;
  }

  updatePoint(updatedPoint) {
    return updatedPoint;
  }

  addPoint(data) {
    return data;
  }

  deletePoint() {
    // method is not defined
  }
}
