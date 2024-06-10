import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativetime from 'dayjs/plugin/relativeTime';
import {DESTINATIONS_ITEMS_COUNT, FilterType, SortType} from './const.js';

dayjs.extend(duration);
dayjs.extend(relativetime);

const formatStringToDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const formatStringToDelimiterDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');
const formatStringToTime = (date) => dayjs(date).format('HH:mm');
const calcDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const eventDuration = dayjs.duration(diff);
  if (eventDuration.days()) {
    return eventDuration.format('DD[D] HH[H] mm[M]');
  }
  if (eventDuration.hours()) {
    return eventDuration.format('HH[H] mm[M]');
  }
  return eventDuration.format('mm[M]');
};
const toCapitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
const isMinorChange = (pointA, pointB) => pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || calcDuration(pointA.dateFrom, pointA.dateTo) !== calcDuration(pointB.dateFrom, pointB.dateTo);
const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    basePrice: point['base_price'],
    isFavorite: point['is_favorite'],
  };

  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['base_price'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
};
const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['base_price']: point.basePrice,
    ['is_favorite']: point.isFavorite,
  };

  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.basePrice;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};

const isPointFuture = (point) => dayjs(point.dateFrom).isAfter(dayjs(), 'D');
const isPointPresent = (point) => (dayjs(point.dateFrom).isBefore(dayjs(), 'D') || dayjs(point.dateFrom).isSame(dayjs(), 'D')) && (dayjs(point.dateTo).isAfter(dayjs(), 'D') || dayjs(point.dateTo).isSame(dayjs(), 'D'));
const isPointPast = (point) => dayjs(point.dateTo).isBefore(dayjs(), 'D');
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

const getTripRoute = (points = [], destinations = []) => {
  const destinationNames = sorting[SortType.DAY]([...points])
    .map((point) => destinations
      .find((destination) => destination.id === point.destination).name);

  return destinationNames <= DESTINATIONS_ITEMS_COUNT ? destinationNames.join('&nbsp;&mdash;&nbsp;') : `${destinationNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames.at(-1)}`;
};
const getTripDurationPeriod = (points = []) => {
  const sortedPoints = sorting[SortType.DAY]([...points]);

  return sortedPoints.length ? `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo).format('DD MMM')}` : '';
};
const getCheckedOffers = (offers, type) => offers.find((offer) => type === offer.type)?.offers;
const getOffersCost = (offerIDs = [], offers = []) => offerIDs.reduce((offerCost, id) => offerCost + (offers.find((offer) => offer.id === id)?.price ?? 0), 0);
const getTripCost = (points = [], offers = []) => points.reduce((total, point) => total + point.basePrice + getOffersCost(point.offers, getCheckedOffers(offers, point.type)), 0);

export {
  formatStringToDate,
  formatStringToShortDate,
  formatStringToTime,
  formatStringToDelimiterDate,
  toCapitalize,
  calcDuration,
  updateItem,
  adaptToClient,
  adaptToServer,
  filter,
  sorting,
  isMinorChange,
  getTripRoute,
  getTripDurationPeriod,
  getTripCost,
};
