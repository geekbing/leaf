export function dateFormatter (date) {
  if (date === '') {
    return ''
  }
  let _date = new Date(date)
  let year = _date.getFullYear()
  let month = _date.getMonth() + 1 < 10 ? '0' + (_date.getMonth() + 1) : (_date.getMonth() + 1)
  let day = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()
  return year + '-' + month + '-' + day
}

export function timeFormatter (time) {
  if (time === '') {
    return ''
  }
  let _time = new Date(time)
  let year = _time.getFullYear()
  let month = _time.getMonth() + 1 < 10 ? '0' + (_time.getMonth() + 1) : (_time.getMonth() + 1)
  let day = _time.getDate() < 10 ? '0' + _time.getDate() : _time.getDate()
  let hour = _time.getHours() < 10 ? '0' + _time.getHours() : _time.getHours()
  let minute = _time.getMinutes() < 10 ? '0' + _time.getMinutes() : _time.getMinutes()
  let second = _time.getSeconds() < 10 ? '0' + _time.getSeconds() : _time.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}
