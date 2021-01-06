module.exports = {
  restPrefix: "/api/",
  //route api handlers for each api route
  users(user, method, req) {
    if (method === "GET" && user.userRole === req.body.id) {
      return true;
    }
    if (method === "POST") {
      return true;
    }
    // if (method === "POST" && req.body.userRole === "basicUser") {
    //   return true;
    // }
    if (method === "PUT" && user.userRole === "admin") {
      return true;
    }
    if (method === "PUT" && +req.url.split("/").pop() === user.id) {
      return true;
    }
    if (method === "DELETE" && user.userRole === "admin") {
      return true;
    }
    return false;
  },
  login() {
    return true;
  },
  posts(user, method, req) {
    if (method === "GET") {
      return true;
    }
    if (method === "POST" && user.userRole) {
      return true;
    }
    if (method === "PUT" && user.id === req.body.creatorId) {
      return true;
    }
    if (method === "PUT" && user.userRole === "moderator") {
      return true;
    }
    if (method === "PUT" && user.userRole === "admin") {
      return true;
    }
    if (method === "DELETE" && user.userRole === "moderator") {
      return true;
    }
    if (method === "DELETE" && user.userRole === "admin") {
      return true;
    }
    return false;
  },
  comments(user,method,req){
    if(method === "GET"){
      return true;
    }
    if(method === "POST" && user.userRole){
      return true
    }
    if(method === "PUT" && user.id === req.body.user){
      return true
    }
    if(method === "DELETE" && user.id === req.body.user){
      return true
    }
  },
  usersXsubjects(user, method, req) {
    if (method === "GET") {
      return true;
    }
    if (method === "POST" && user.userRole === "moderator") {
      return true;
    }
    if (method === "POST" && user.userRole === "admin") {
      return true;
    }
    if (method === "DELETE" && user.userRole === "moderator") {
      return true;
    }
    if (method === "DELETE" && user.userRole === "admin") {
      return true;
    }
    return false
  },
};