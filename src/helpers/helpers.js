export const getDatePosted = (time) => {
  let timeToFormat = new Date(time)
  let timeFormated = `
  ${timeToFormat.getHours() < 10 ? "0" + timeToFormat.getHours() : timeToFormat.getHours()}:${timeToFormat.getMinutes() < 10 ? "0" + timeToFormat.getMinutes() : timeToFormat.getMinutes()} `
  let date =  `
  ${timeToFormat.getFullYear()}-${timeToFormat.getMonth() < 10 ? "0" + (timeToFormat.getMonth()+1) : (timeToFormat.getMonth()+1)}-${timeToFormat.getDate() < 10 ? "0" + timeToFormat.getDate() : timeToFormat.getDate()} ${timeFormated}`
  return date
}

export class DebounceHelper{
  debounceID = null;
  debounceHelper = (functionData) => {
    if (this.debounceID !== null) {
      clearTimeout(this.debounceID);
      this.debounceID = null;
    }
    this.debounceID = setTimeout(() => {
      functionData();
    }, 250);
  };
}

export const checkCreator = (selectedPost, commenter) =>{
  return selectedPost.creatorId === commenter
}

export const checkIfModerator = (user) => {
  let areas = []
  for(let area in user){
    if(area === "id" || area === "username" || area === "userRole"){
      continue
    }
    if(user[area] !== null){
      areas.push(user[area])
    }
  }
  if(areas.length > 0){
    return areas
  }
  else{
    return null
  }
}

export const checkIfModHasAuthorities = (authList = [], subject) => {
  let authFound = null
  if(authList !== null){      
    authFound = authList.find(authority => authority === subject) || null
  }
 return authFound
}