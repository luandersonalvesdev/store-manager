const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB, productByIdFromDB } = require('../../mocks/products.mock');
const connection = require('../../../src/models/connection');

describe('Model from /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Get all products', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);

    const data = [...allProductsFromDB];
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(data);
  });

  it('Get products by id', async function () {
    sinon.stub(connection, 'execute').resolves([[productByIdFromDB]]);

    const idProduct = 1;
    const data = { ...productByIdFromDB };

    const result = await productsModel.getById(idProduct);
    expect(result).to.be.deep.equal(data);
  });
});