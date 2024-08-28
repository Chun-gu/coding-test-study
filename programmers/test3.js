function solution(s, times) {
  var answer = [];

  let savingDay = s;
  const startDay = sliceYYMMDD(s);
  const savingDays = [startDay];

  times.forEach((time) => {
    const nextSavingDay = calculateNextSavingDay(savingDay, time);
    const nextYYMMDD = sliceYYMMDD(nextSavingDay);
    if (nextYYMMDD !== savingDays.at(-1)) savingDays.push(nextYYMMDD);

    savingDay = nextSavingDay;
  });

  for (let i = 0; i < savingDays.length; i++) {
    if (!checkIsNextDay(savingDays)) return false;
    return true;
  }

  return answer;
}

function sliceYYMMDD(date) {
  return date.split(":").slice(0, 3).join(":");
}

function checkIsNextDay(prev, next) {
  const [year, month, day, hour, minute, second] = prev.split(":").map(Number);
  const [DAY, HOUR, MINUTE, SECOND] = next.split(":").map(Number);

  const nextDay = (day + DAY + additionalDay) % 30;
  const additionalMonth = Math.floor((day + DAY) / 30);

  const nextMonth = (month + additionalMonth) % 12;
  const additionalYear = Math.floor((month + additionalMonth) / 12);

  const nextYear = year + additionalYear;
}

function calculateNextSavingDay(today, gap) {
  const [year, month, day, hour, minute, second] = today.split(":").map(Number);
  const [DAY, HOUR, MINUTE, SECOND] = gap.split(":").map(Number);

  const nextSecond = (second + SECOND) % 60;
  const additionalMinute = Math.floor((second + SECOND) / 60);

  const nextMinute = (minute + MINUTE + additionalMinute) % 60;
  const additionalHour = Math.floor((minute + MINUTE) / 60);

  const nextHour = (hour + HOUR + additionalHour) % 24;
  const additionalDay = Math.floor((hour + HOUR) / 24);

  const nextDay = (day + DAY + additionalDay) % 30;
  const additionalMonth = Math.floor((day + DAY) / 30);

  const nextMonth = (month + additionalMonth) % 12;
  const additionalYear = Math.floor((month + additionalMonth) / 12);

  const nextYear = year + additionalYear;

  return `${nextYear}:${nextMonth}:${nextDay}:${nextHour}:${nextMinute}:${nextSecond}`;
}

console.log(solution("2021:04:12:16:08:35", ["01:06:30:00", "01:04:12:00"]));
