// const { values } = require('sequelize/types/lib/operators');

const connection = require('./connection');

const checkout = async () => connection()
  .then((db) => db
    .getTable('sales')
    .select([
      'id',
      'user_id',
      'total_price',
      'delevery_address',
      'delivery_number',
      'sale_date',
      'status',
    ])
    .execute())
  .then((results) => results.fetchAll())
  .then((results) => results.map(
    ([
      id,
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    ]) => ({
      id,
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
    }),
  ));

const finishOrder = async (
  id,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
) => connection().then((db) => db
  .getTable('sales')
  .insert([
    'user_id',
    'total_price',
    'delevery_address',
    'delivery_number',
    'sale_date',
    'status',
  ])
  .values(
    id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  )
  .execute());

module.exports = {
  checkout,
  finishOrder,
};