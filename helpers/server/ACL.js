

module.exports = function(settings){

  let {restPrefix} = settings

  return function (req, res, next) {

    if(req.url.indexOf(restPrefix) !== 0){
      next()
      return;
    }

    let tableName = req.url.replace(restPrefix,'').split('/')[0]
    
    //If there isn't a mthod named the same as the table in our settings
    //or if there is a method and it returns fals
    //then return not allowed as response and status 403 to client
    if (
      typeof settings[tableName] !== "function" ||
      !settings[tableName](req.session.user || {}, req.method, req)
    ) {
      res.status(403);
      res.json({ error: "Not Allowed" });
      return;
    }

    next()
  };
} 