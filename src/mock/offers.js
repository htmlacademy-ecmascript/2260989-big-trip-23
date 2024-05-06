import {MAX_PRICE_VALUE} from '../const.js';
import {getRandomPositiveNumber} from '../utils.js';


//Объекты предложения услуг транспорта
const mockOffers = [{
  type: 'taxi',
  offers: [{
    id: '1',
    title: 'Upgrade to a business class',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Drive slowly',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'bus',
  offers: [{
    id: '1',
    title: 'Luggage space',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose seats',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'train',
  offers: [{
    id: '1',
    title: 'Ordering bed linen',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose seats',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '3',
    title: 'Travel with an animal',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'flight',
  offers: [{
    id: '1',
    title: 'Choose meal',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose seats',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'check-in',
  offers: [{
    id: '1',
    title: 'Choose the time of check-in',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose the time of check-out',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'sightseeing',
  offers: []
}, {
  type: 'ship',
  offers: [{
    id: '1',
    title: 'Upgrade to comfort class',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Upgrade to business class',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '3',
    title: 'Ordering food',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'drive',
  offers: [{
    id: '1',
    title: 'With automatic transmission',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'With air conditioning',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'restaurant',
  offers: [{
    id: '1',
    title: 'Choose live music',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose VIP area',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}];

//Функция-ссылка на объект предложений услуг транспорта
const getOffers = () => mockOffers;

export {getOffers};
