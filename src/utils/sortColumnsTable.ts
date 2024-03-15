import moment from 'moment';

export const sortedDate = (a: string, b: string) => {
  const aDate = moment(a);
  const bDate = moment(b);
  const diff = bDate.diff(aDate, 'days');

  if(diff > 0) return 1;
  if(diff < 0) return -1;
  return 0;
};

export const sortedString = (a: string, b: string) => {
  if (!a && !b) return 0;
  else if (+a && +b) return a.localeCompare(b, undefined, {numeric: true})
  else if (a.includes(":") && b.includes(":")) {
    const aTime = moment(a, 'HH:mm:ss');
    const bTime = moment(b, 'HH:mm:ss');
    const diff = bTime.diff(aTime, 'minutes');

    if(diff > 0) return 1;
    if(diff < 0) return -1;
    return 0;
  }
  return a.localeCompare(b);
};