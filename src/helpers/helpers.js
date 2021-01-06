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
  let found = false
  moderatorSubjects.forEach(subject => {
    if(subject.userId === data.id){
      found = true
    }
  })
  return found
}

export const checkIfPostedByModerator = (moderatorSubjects,post) => {
  let found = false
  let moderatorId = 0
  moderatorSubjects.forEach(subject => {
    if(subject.userId === post.creatorId){
      found = true
      moderatorId = subject.userId
    }
  })
  console.log(!!moderatorId);
  return false
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