//if the string is longer than a set value, add "..." after limit reached.
export const truncateString = (string, limit) => {
  if (string.length > limit) {
    return string.substring(0, limit) + "..."
  } else {
    return string
  }
}

//converting minutes to hours and minutes
export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
}


export const toLanguageName = new Intl.DisplayNames("en", { type: "language" });

const padTo2Digits = num => {
  return num.toString().padStart(2, '0');
}

export const formatDate = date => {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
    ].join(':')
  );
}

export const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const calculateYears = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25))
}