const {Users} = require('../models')

const findUser = async (req, res, next) => {
    const useId = await Users.findAll({
        where: { email: req.body.email },
      });

    
    // console.log(useId);
    req.username = useId[0].dataValues.username;
    req.id = useId[0].dataValues.id;
    next();
}

const findUserIn = async (req, res, next) => {
  const useId = await Users.findAll({
      where: { email: req.body.email },
    });

  console.log(useId);
  if (useId.length == 0) {
    next();
  } else {
    return res.json({Error: "user already exist"})
  }
  
}

module.exports = {findUser, findUserIn};