import { promisify } from 'util';
import childProcess from 'child_process';

export const exec = promisify(childProcess.exec);

export function wait(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

function findNextSundayDate(): Date {
  const now = () => new Date(Date.now());
  const sundayDayOfWeek = 7;
  const todayDayOfWeek = now().getDay();
  const daysToSunday = sundayDayOfWeek - todayDayOfWeek;
  const nextSundayDate = now();
  nextSundayDate.setDate(now().getDate() + daysToSunday);
  return nextSundayDate;
}

function formatDate(date) {
  const padZero = (number) => String(number).padStart(2, '0');
  const [day, month] = [date.getDate(), date.getMonth() + 1];
  return [day, month].map(padZero).join('/');
}

export function findNextSunday() {
  return formatDate(findNextSundayDate());
}

export function logSuccessMessage(message) {
  console.log(message);
  exec(`zenity --info --text="${message}"`);
  exec(`notify-send "Inscrições" "${message}"`);
}

export const ONE_SECOND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const TEN_MINUTES = ONE_MINUTE * 10;
