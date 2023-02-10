export const secondsToTime = (secs: any) => {
  secs = Math.round(secs);
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours < 10 ? "0" + hours : hours,
    m: minutes < 10 ? "0" + minutes : minutes,
    s: seconds < 10 ? "0" + seconds : seconds,
  };
  return obj;
};
