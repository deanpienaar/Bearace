import {DateTime} from 'luxon';


export function calculateDaysSinceLastIncident (lastIncident: Date) {
  const date = DateTime.fromJSDate(lastIncident).set({hour: 8}).startOf('hour');
  const now = DateTime.now();

  return Math.floor(now.diff(date).as('days'));
}
