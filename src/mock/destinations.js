import {DESCRIPTION,CITIES,Counts} from './const.js';
import {getRandomArrayElement,getRandomPositiveNumber} from './utils.js';

const generateMockDestinations = () => {
  const city = getRandomArrayElement(CITIES);
  return ({
    id: crypto.randomUUID(),
    name: city,
    description: `It is ${city} description. ${DESCRIPTION}`,
    pictures: Array.from({
      length: getRandomPositiveNumber(0, Counts.DESCRIPTION_PHOTO)
    }, () => ({
      src: `https://loremflickr.com/248/152?${crypto.randomUUID()}`,
      description: `It is ${city} description`
    }))
  });
};

export {
  generateMockDestinations
};
