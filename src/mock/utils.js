import dayjs from 'dayjs';
import {Duration} from '../const.js';
import {getRandomPositiveNumber} from '../utils.js';

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

export {getDate};
