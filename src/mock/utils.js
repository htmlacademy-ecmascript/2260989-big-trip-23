import dayjs from 'dayjs';
import {Duration} from './const.js';

const getRandomPositiveNumber = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[getRandomPositiveNumber(0, items.length - 1)];

let randomDate = dayjs().subtract(getRandomPositiveNumber(0, Duration.DAY), 'day').toDate();

const getDate = ({
  next
}) => {
  const daysInterval = getRandomPositiveNumber(0, Duration.DAY);
  const hoursInterval = getRandomPositiveNumber(1, Duration.HOUR);
  const minsInterval = getRandomPositiveNumber(0, Duration.MINUTE);

  if (next) {
    randomDate = dayjs(randomDate)
      .add(minsInterval, 'minute')
      .add(hoursInterval, 'hour')
      .add(daysInterval, 'day')
      .toDate();
  }
  return randomDate;
};

export {getDate, getRandomPositiveNumber, getRandomArrayElement};
