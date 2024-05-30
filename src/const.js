const CITIES = ['Paris', 'London', 'Chicago', 'Tokio', 'New York', 'Moscow', 'Amsterdam', 'San-Francisco'];
const DESCRIPTION = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt architecto labore atque!';
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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

const Counts = {
  DESTINATIONS: 10,
  DESCRIPTION_PHOTO: 4,
  OFFERS: 7,
  POINTS: 5,
};
const Price = {
  MIN: 1,
  MAX: 500
};
const Duration = {
  HOUR: 5,
  DAY: 3,
  MINUTE: 59
};
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {CITIES, DESCRIPTION, EVENT_TYPES, FilterType, SortType, enabledSortType, Counts, Price, Duration, Mode};
