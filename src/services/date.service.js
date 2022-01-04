import format from 'date-fns/format'
import config from '../utils/config'

export const getDate = date =>
  date ? format(new Date(date), config.date.dateFormat) : ''

export const getDateTime = date =>
  date ? format(new Date(date), config.date.datetimeFormat) : ''

export const getDateString = (date, opt = { time: false, timezone: false }) => {
  const pad = function (num) {
    const norm = Math.floor(Math.abs(num))
    return (norm < 10 ? '0' : '') + norm
  }
  const tzo = -date.getTimezoneOffset()
  const dif = tzo >= 0 ? '+' : '-'
  let dateString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`
  if (!opt.time && !opt.timezone) {
    return dateString
  }
  if (opt.timezone || opt.time) {
    dateString += `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  }
  if (opt.timezone) {
    dateString += `:${pad(date.getSeconds())}${dif}${pad(tzo / 60)}:${pad(
      tzo % 60
    )}`
  }

  return dateString
}
