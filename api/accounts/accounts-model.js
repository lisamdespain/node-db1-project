const db = require('../../data/db-config');

async function getAll() {
  // DO YOUR MAGIC
  return await db('accounts');
}

 function getById(id) {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first();
}

async function create(account) {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

async function updateById(id, account) {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account);
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
}
