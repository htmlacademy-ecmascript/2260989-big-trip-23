import {generateDestinations} from '../mock/destinations.js';
import {generateOffers} from '../mock/offers.js';
import {generatePoint} from '../mock/points.js';
import {Counts,EVENT_TYPES} from '../const.js';
import {getRandomPositiveNumber,getRandomArrayElement} from '../utils.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }


  generateDestinations() {
    return Array.from({
      length: Counts.DESTINATIONS
    }, () => generateDestinations());
  }

  generateOffers() {
    return EVENT_TYPES.map((type) => ({
      type,
      offers: Array.from({
        length: getRandomPositiveNumber(0, Counts.OFFERS)
      }, () => generateOffers(type))
    }));
  }

  generatePoints() {
    return Array.from({
      length: Counts.POINTS
    }, () => {
      const type = getRandomArrayElement(EVENT_TYPES);
      const destination = getRandomArrayElement(this.destinations);

      const offersByType = this.offers.find((offerByType) => offerByType.type === type);

      const randomOffers = new Set();
      Array.from({
        length: getRandomPositiveNumber(1, offersByType.offers.length)
      }, () => {
        randomOffers.add(getRandomArrayElement(offersByType.offers));
      });
      const hasOffers = (randomOffers.size > 0 && [...randomOffers][0]);
      const offerIDs = hasOffers ? [...randomOffers]
        .map((offer) => offer.id) : [];

      return generatePoint(type, destination.id, offerIDs);
    });
  }
}
