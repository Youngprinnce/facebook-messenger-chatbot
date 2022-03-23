const moment = require('moment');

const daysleft = (birthday) => {
  const bday = moment(birthday).format('YYYY-MM-DD');
  const now = moment().format('YYYY-MM-DD');
  bdayNow = bday.split('-');
  bdayNow = `${now.split('-')[0]}-${bdayNow[1]}-${bdayNow[2]}`;
  bdayNow = moment(bdayNow).format('YYYY-MM-DD');
  let count;
  if (bdayNow > now) {
    count = moment(bdayNow).diff(moment(now), 'days');
  } else if (bdayNow < now) {
    bdayNow = moment(bdayNow).add(1, 'year').format('YYYY-MM-DD');
    bdayNow = moment(bdayNow).format('YYYY-MM-DD');
    count = moment(bdayNow).diff(moment(now), 'days');
  } else {
    count = 0;
  }
  return count;
};

module.exports = daysleft;
