import {DateTime} from 'luxon';


export function calculateDaysSinceLastIncident (lastIncident: Date) {
  const date = DateTime.fromJSDate(lastIncident);
  const now = DateTime.now();

  return Math.floor(now.diff(date).as('days'));
}
