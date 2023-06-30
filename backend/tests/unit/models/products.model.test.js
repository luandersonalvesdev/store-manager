const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB, productByIdFromDB, newProduct, newProductRegistered } = require('../../mocks/products.mock');
const connection = require('../../../src/models/connection');

describe('Model from /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('GET all products', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);

    const data = [...allProductsFromDB];
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(data);
  });

  it('GET products by id', async function () {
    sinon.stub(connection, 'execute').resolves([[productByIdFromDB]]);

    const idProduct = 1;
    const data = { ...productByIdFromDB };

    const result = await productsModel.getById(idProduct);
    expect(result).to.be.deep.equal(data);
  });

  it('INSERT a new products', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModel.insert(newProduct);

    expect(result).to.be.deep.equal(newProductRegistered);
  });

  it('PUT a new product', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const result = await productsModel.update(1, newProduct);

    expect(result).to.be.equal(undefined);
  });
});