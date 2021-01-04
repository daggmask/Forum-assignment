export const getDatePosted = (time) => {
  let timeToFormat = new Date(time)
  console.log(timeToFormat.getMonth()+1);
  let timeFormated = `
  ${timeToFormat.getHours() < 10 ? "0" + timeToFormat.getHours() : timeToFormat.getHours()}:${timeToFormat.getMinutes() < 10 ? "0" + timeToFormat.getMinutes() : timeToFormat.getMinutes()} `
  let date =  `
  ${timeToFormat.getFullYear()}-${timeToFormat.getMonth() < 10 ? "0" + (timeToFormat.getMonth()+1) : (timeToFormat.getMonth()+1)}-${timeToFormat.getDate() < 10 ? "0" + timeToFormat.getDate() : timeToFormat.getDate()} ${timeFormated}`
  return date
}