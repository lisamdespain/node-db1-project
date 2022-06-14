const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  let { name, budget } = req.body;
  if (name.trim() == '' || name == null || budget == null){
    res.status(400).json({message: 'Please add an account name and budget to continue'})
    return;
  }
  req.account = {name: name.trim(), budget: budget}
  next();
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const uniqueName = Accounts.getAll();
  const thisName = uniqueName.filter(req.account.name);
  if (req.account.name === thisName){
    res.status(400).json({message: 'That name already exists'})
    return;
  } else {
    next();
}
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then(result =>{
    if (result == null){
      res.status(404).json({message: "account not found"})
      return;
    }
    req.account = result;
    next();
  }).catch(err =>{
    next(err);
  })
}

