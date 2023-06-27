const {Users} = require('../models')

const findUser = async (req, res, next) => {
    const userId = await Users.findAll({
        where: { email: req.body.email },
      });

    console.log(userId);
    req.username = userId[0].dataValues.username;
    req.id = userId[0].dataValues.id;
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


const findUserHeaders = async (req, res, next) => {
  console.log(req.headers.email);
  const userId = await Users.findAll({
      where: { email: req.headers.email },
    });
  
  req.id = userId[0].dataValues.id;
  next();
}

module.exports = {findUser, findUserIn, findUserHeaders};