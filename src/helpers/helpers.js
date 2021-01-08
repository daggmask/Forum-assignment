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

export const checkModInList = (moderatorSubjects, data) => {
  if(data.userRole === "admin"){
    return true
  }
  let found = false
  moderatorSubjects.forEach(subject => {
    if(subject.userId === data.id){
      found = true
    }
  })
  return found
}

export const checkIfPostedByModerator = (moderatorSubjects,post) => {
  let moderatorId = 0
  moderatorSubjects.forEach(subject => {
    if(subject.userId === post.creatorId && subject.subjectId === post.subjectId){
      moderatorId = subject.userId
    }
  })
  return !!moderatorId
}

export const checkModeratorRole = (moderatorSubjects ,user) => {
  if(user === null){
    return false
  }
  if(user) return checkModInList(moderatorSubjects, user)
}

export const checkCreator = (selectedPost, commenter) =>{
  return selectedPost.creatorId === commenter
}

export const checkModerator = (moderatorSubjects, commenter) => {
  let foundModeratorRole = moderatorSubjects.find(subject => subject.userId === commenter.userId) ||null
  return foundModeratorRole ? true : false
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
    console.log(authFound);
  }
 return authFound
}