import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativetime from 'dayjs/plugin/relativeTime';
import {TimePeriods, FilterType, SortType} from './const.js';

dayjs.extend(duration);
dayjs.extend(relativetime);

const MSEC_IN_HOUR = TimePeriods.MSEC_IN_SEC * TimePeriods.SEC_IN_MIN * TimePeriods.MIN_IN_HOUR;
const MSEC_IN_DAY = TimePeriods.MSEC_IN_HOUR * TimePeriods.HOUR_IN_DAY;

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
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
const isMinorChange = (pointA, pointB) => pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || calcDuration(pointA.dateFrom, pointA.dateTo) !== calcDuration(pointB.dateFrom, pointB.dateTo);

const isPointFuture = (point) => dayjs().isBefore(point.dateFrom);
const isPointPresent = (point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
const isPointPast = (point) => dayjs().isAfter(point.dateTo);

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point))
};

const getPointsByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const getPointsByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return pointBDuration - pointADuration;
};
const getPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sorting = {
  [SortType.DAY]: (points) => points.toSorted(getPointsByDate),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is disabled`);
  },
  [SortType.TIME]: (points) => points.toSorted(getPointsByTime),
  [SortType.PRICE]: (points) => points.toSorted(getPointsByPrice),
  [SortType.OFFER]: () => {
    throw new Error(`Sort by ${SortType.OFFER} is disabled`);
  },
};

export {
  formatStringToDate,
  formatStringToShortDate,
  formatStringToTime,
  formatStringToDelimetrDate,
  toCapitalize,
  calcDuration,
  updateItem,
  filter,
  sorting,
  isMinorChange
};
