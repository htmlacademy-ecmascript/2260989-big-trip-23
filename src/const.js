const DEFAULT_EVENT_TYPE = 'flight';
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS_ITEMS_COUNT = 3;
const AUTHORIZATION = 'Basic umB8tRoVHKu5p3GdQ';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_EVENT_TYPE,
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};
const enabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false,
};
const EmptyListMessage = {
  EVERYTHING : 'Click New Event to create your first point',
  FUTURE : 'There are no future events now',
  PRESENT : 'There are no present events now',
  PAST : 'There are no past events now',
};
const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CREATE_POINT: 'CREATE_POINT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SourceUrl = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  DESTINATIONS_ITEMS_COUNT,
  AUTHORIZATION,
  END_POINT,
  EVENT_TYPES,
  POINT_EMPTY,
  FilterType,
  SortType,
  enabledSortType,
  EmptyListMessage,
  UserAction,
  UpdateType,
  Mode,
  EditType,
  Method,
  SourceUrl,
  TimeLimit,
};
