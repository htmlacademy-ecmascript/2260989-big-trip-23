import {Price} from './const.js';
import {getRandomPositiveNumber, getDate} from './utils.js';

const generateMockPoint = (type, destinationID, offerIDs) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomPositiveNumber(Price.MIN, Price.MAX),
  dateFrom: getDate({
    next: false
  }),
  dateTo: getDate({
    next: true
  }),
  destination: destinationID,
  isFavorite: Boolean(getRandomPositiveNumber(0, 1)),
  offers: offerIDs,
  type
});

export {generateMockPoint};
