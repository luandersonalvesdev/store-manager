const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB, productByIdFromDB, newProductRegistered, newProduct } = require('../../mocks/products.mock');

describe('Service from /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  const SUCCESSFUL = 'SUCCESSFUL';
  const CREATED = 'CREATED';
  const NOT_FOUND = 'NOT_FOUND';

  it('Get all products', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProductsFromDB);

    const data = allProductsFromDB;
    const result = await productsService.getAll();

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.equal(data);
  });

  it('Get product by id', async function () {
    sinon.stub(productsModel, 'getById').resolves(productByIdFromDB);

    const idProduct = 1;
    const data = { ...productByIdFromDB };
    const result = await productsService.getById(idProduct);

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.deep.equal(data);
  });

  it('Insert a new product', async function () {
    sinon.stub(productsModel, 'insert').resolves(newProductRegistered);

    const data = { ...newProductRegistered };
    const result = await productsService.insert(newProduct);

    expect(result.status).to.be.equal(CREATED);
    expect(result.data).to.be.deep.equal(data);
  });

  it('Not found product by id', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const idProduct = 0;
    const result = await productsService.getById(idProduct);

    expect(result.status).to.be.equal(NOT_FOUND);
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
  });
});