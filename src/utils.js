import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import {MSEC_IN_HOUR,MSEC_IN_DAY,DURATION_FORMATS} from './const.js';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)]; //Случайный элемент массива
const getRandomPositiveNumber = (max) => Math.ceil(Math.random() * max); //Генерация случайного целого числа
const humanizeDate = (currentDate, format) => currentDate ? dayjs(currentDate).format(format) : ''; //Функция приведения переданной даты к переданному формату

//Функция форматирования и свычисление продолжительности между двумя датами
const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom)); //Вычисление разницы в мс между двумя датами

  let pointDuration;

  switch (true) {
    case (diff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.days);
      break;
    case (diff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.hours);
      break;
    case (diff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.mins);
      break;
  }

  return pointDuration;
};

//Функция-счетчик, увеличивает на 1 ед. значение counterStart начиная с START_FROM
const incrementCounter = (START_FROM) => {
  let counterStart = START_FROM;
  return function() {
    return counterStart++;
  };
};

export {getRandomArrayElement,getRandomPositiveNumber,calculateDuration,incrementCounter,humanizeDate};
