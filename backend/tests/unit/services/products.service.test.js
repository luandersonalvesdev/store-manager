const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const {
  allProductsFromDB, productByIdFromDB, newProductRegistered, deletedProduct,
  newProduct, newProductWithoutName, newProductWithoutNameError, updatedProduct, getByIdNotFound,
} = require('../../mocks/products.mock');

describe('Service from /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  const SUCCESSFUL = 'SUCCESSFUL';
  const CREATED = 'CREATED';
  const NOT_FOUND = 'NOT_FOUND';
  const BAD_REQUEST = 'BAD_REQUEST';

  it('GET all products', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProductsFromDB);

    const data = allProductsFromDB;
    const result = await productsService.getAll();

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.equal(data);
  });

  it('GET product by id', async function () {
    sinon.stub(productsModel, 'getById').resolves(productByIdFromDB);

    const idProduct = 1;
    const data = { ...productByIdFromDB };
    const result = await productsService.getById(idProduct);

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.deep.equal(data);
  });

  it('INSERT a new product', async function () {
    sinon.stub(productsModel, 'insert').resolves(newProductRegistered);

    const data = { ...newProductRegistered };
    const result = await productsService.insert(newProduct);

    expect(result.status).to.be.equal(CREATED);
    expect(result.data).to.be.deep.equal(data);
  });

  it('INSERT a new product without name', async function () {
    sinon.stub(productsModel, 'insert').resolves(newProductWithoutName);

    const result = await productsService.insert(newProductWithoutName);

    expect(result.status).to.be.equal(BAD_REQUEST);
    expect(result.data).to.be.deep.equal(newProductWithoutNameError);
  });

  it('PUT a product', async function () {
    sinon.stub(productsModel, 'update').resolves(undefined);
    sinon.stub(productsModel, 'getById').resolves(productByIdFromDB);

    const result = await productsService.update('1', newProduct);

    expect(result.status).to.be.equal(SUCCESSFUL);
    expect(result.data).to.be.deep.equal(updatedProduct);
  });

  it('PUT a product without name', async function () {
    sinon.stub(productsModel, 'update').resolves(undefined);

    const result = await productsService.update('1', newProductWithoutName);

    expect(result.status).to.be.equal(BAD_REQUEST);
    expect(result.data).to.be.deep.equal({ message: '"name" is required' });
  });

  it('PUT a product that does not exist', async function () {
    sinon.stub(productsModel, 'update').resolves(undefined);
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.update('0', newProduct);

    expect(result.status).to.be.equal(NOT_FOUND);
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('DELETE a product', async function () {
    sinon.stub(productsModel, 'remove').resolves(undefined);
    sinon.stub(productsModel, 'getById').resolves(productByIdFromDB);

    const result = await productsService.remove('1');

    expect(result.status).to.be.equal(deletedProduct.status);
    expect(result.data).to.be.deep.equal(deletedProduct.data);
  });

  it('DELETE a product that does exist', async function () {
    sinon.stub(productsModel, 'remove').resolves(undefined);
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.remove('1');

    expect(result.status).to.be.equal(getByIdNotFound.status);
    expect(result.data).to.be.deep.equal(getByIdNotFound.data);
  });

  it('NOT FOUND product by id', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const idProduct = 0;
    const result = await productsService.getById(idProduct);

    expect(result.status).to.be.equal(NOT_FOUND);
    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
  });
});