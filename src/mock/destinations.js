import {DESCCRIPTIONS,CITIES} from '../const.js';
import {incrementCounter,getRandomArrayElement,getRandomPositiveNumber} from '../utils.js';

const MAX_IMAGES_COUNT = 5;
const START_ID_COUNTER = 1;
const getCityID = incrementCounter(START_ID_COUNTER);

//Создаем объект с информацией о пункте назначения
const setupDestination = () => {
  const ID = getCityID();
  return ({
    id: (ID).toString(),
    description: getRandomArrayElement(DESCCRIPTIONS),
    name: CITIES[ID - 1],
    pictures: Array.from({
      length: getRandomPositiveNumber(MAX_IMAGES_COUNT)
    }, () => ({
      src: `https://loremflickr.com/248/152?${ID}`,
      description: getRandomArrayElement(DESCCRIPTIONS)
    }))
  });
};

//Создаем массив объектов пунктов назначения
const getDestinations = () => Array.from({length: CITIES.length}, setupDestination);

export {getDestinations};
