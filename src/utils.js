import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

const getRandomPositiveNumber = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[getRandomPositiveNumber(0, items.length - 1)];

const formatStringToDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const formatStringToDelimetrDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');
const formatStringToTime = (date) => dayjs(date).format('HH:mm');

const calcDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  if (diff >= MSEC_IN_DAY) {
    return dayjs.duration(diff).format('DD[D] HH[H] mm[M]');
  }
  if (diff >= MSEC_IN_HOUR) {
    return dayjs.duration(diff).format('HH[H] mm[M]');
  }
  if (diff < MSEC_IN_HOUR) {
    return dayjs.duration(diff).format('mm[M]');
  }
};

const toCapitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export {MSEC_IN_HOUR,MSEC_IN_DAY,getRandomArrayElement,getRandomPositiveNumber,formatStringToDate,formatStringToShortDate,formatStringToTime,formatStringToDelimetrDate,toCapitalize,calcDuration,};
