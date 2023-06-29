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

const newProductRegistered = {
  id: 4,
  name: 'ProdutoX',
};

const newProduct = {
  name: 'ProdutoX',
};

const newProductWithoutName = {};

const newProductWithoutNameError = {
  message: '"name" is required',
};

const newProductCreated = {
  status: 'CREATED',
  data: newProductRegistered,
};

module.exports = {
  allProductsFromDB,
  productByIdFromDB,
  getAllSuccessful,
  getByIdSuccessful,
  getByIdNotFound,
  newProductRegistered,
  newProduct,
  newProductCreated,
  newProductWithoutName,
  newProductWithoutNameError,
};