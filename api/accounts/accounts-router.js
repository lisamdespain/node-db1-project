const router = require('express').Router()
const Accounts = require('./accounts-model');

const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
  .then(result =>{
    res.status(200).json(result);
  }).catch(err =>{
    next(err);
  })
})

router.get('/:id', checkAccountId, (req, res) => {
  // DO YOUR MAGIC
    res.status(200).json(req.account);
  })


router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.newAccount)
  // DO YOUR MAGIC
  .then(result=>{
    res.status(201).json(result);
  }).catch(err =>{
    next(err);
  })
})

router.put('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id)
  .then(result =>{
    res.status(200).json(result);
  }).catch(err =>{
    next(err);
  })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const deletedItem = Accounts.getById
  Accounts.deleteById(req.params.id)
  .then(result=>{ // eslint-disable-line
    res.status(200).json(deletedItem);
  }).catch(err =>{
    next(err);
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message:err.message,
    stack: err.stack
  })
})

module.exports = router;
