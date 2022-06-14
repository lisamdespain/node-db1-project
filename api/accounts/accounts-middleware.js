const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  let { name, budget } = req.body;
  if (name === undefined || budget === undefined){
    res.status(400).json({message: 'Name and budget are required'})
    return;
  } else if (name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({message: "name of account must be between 3 and 100"})
    return;
  } else if (!Number(budget)){
    res.status(400).json({message: "budget of account must be a number"})
    return;
  } else if (budget < 0 || budget > 1000000){
    res.status(400).json({ message: "budget of account is too large or too small" })
    return;
  }
  req.newAccount = {name: name.trim(), budget: budget}
  next();
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getByName(req.body.name)
  .then(result =>{
    if (result){
    res.status(400).json({message: 'that name is taken'})
return;
  } 
  next();
}
  )
}


exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then(result =>{
    if (!result){
      res.status(404).json({message: "account not found"})
      return;
    }
    req.account = result;
    next();
  }).catch(err =>{
    next(err);
  })
}

