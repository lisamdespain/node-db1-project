const db = require('../../data/db-config');

async function getAll() {
  // DO YOUR MAGIC
  return await db('accounts');
}

 function getById(id) {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first();
}

function getByName(name) {
  // DO YOUR MAGIC
  return db('accounts').where('name', name).first();
}

const create = (account) => {
  // DO YOUR MAGIC
  return db('accounts').insert(account).then(([id]) =>
    getById(id)
  );
}

async function updateById(id, account) {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update({name: account.name, budget: account.budget});
  return getById(id);
}

async function deleteById(id) {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}
