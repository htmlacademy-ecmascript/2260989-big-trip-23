import {EVENT_TYPES,MAX_PRICE_VALUE,CITIES} from '../const.js';
import {getRandomArrayElement,getRandomPositiveNumber} from '../utils.js';

//Массив объектов событий
const mockEventPoints = [{
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2024-07-10T22:55:56.845Z',
  dateTo: '2024-07-18T11:22:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: ['1', '2'],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2024-08-02T23:20:56.845Z',
  dateTo: '2024-08-07T00:50:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: true,
  offers: ['1'],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2024-08-09T09:23:56.845Z',
  dateTo: '2024-08-12T10:42:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: [],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2024-09-10T10:55:56.845Z',
  dateTo: '2024-09-10T12:22:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: ['1', '2'],
  type: getRandomArrayElement(EVENT_TYPES)
}, {
  basePrice: getRandomPositiveNumber(MAX_PRICE_VALUE),
  dateFrom: '2024-10-01T22:55:56.845Z',
  dateTo: '2024-10-14T11:22:13.375Z',
  destination: getRandomPositiveNumber(CITIES.length).toString(),
  isFavorite: false,
  offers: ['2'],
  type: getRandomArrayElement(EVENT_TYPES)
}];

//Возвращаем случайный объект события
const getRandomEventPoint = () => getRandomArrayElement(mockEventPoints);


export {getRandomEventPoint};
