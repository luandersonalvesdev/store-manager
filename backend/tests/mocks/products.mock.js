const allProductsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productByIdFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const getAllSuccessful = {
  status: 'SUCCESSFUL',
  data: allProductsFromDB,
};

const getByIdSuccessful = {
  status: 'SUCCESSFUL',
  data: productByIdFromDB,
};

const getByIdNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  allProductsFromDB,
  productByIdFromDB,
  getAllSuccessful,
  getByIdSuccessful,
  getByIdNotFound,
};