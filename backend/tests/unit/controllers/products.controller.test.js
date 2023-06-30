const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { getAllSuccessful, getByIdSuccessful, getByIdNotFound, newProductCreated, newProduct,
  newProductRegistered, productUpdatedSuccessful, deletedProduct,
} = require('../../mocks/products.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Controller from /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('GET all products', async function () {
    sinon.stub(productsService, 'getAll').resolves(getAllSuccessful);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const data = [...getAllSuccessful.data];

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(data);
  });

  it('GET product by id', async function () {
    sinon.stub(productsService, 'getById').resolves(getByIdSuccessful);

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const data = { ...getByIdSuccessful.data };
    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(data);
  });

  it('INSERT a new product', async function () {
    sinon.stub(productsService, 'insert').resolves(newProductCreated);

    const req = {
      body: newProduct,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const data = { ...newProductRegistered };
    await productsController.insert(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(data);
  });

  it('PUT a product', async function () {
    sinon.stub(productsService, 'update').resolves(productUpdatedSuccessful);

    const req = {
      body: newProduct,
      params: '1',
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const data = { ...productUpdatedSuccessful.data };
    await productsController.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(data);
  });

  it('DELETE a product', async function () {
    sinon.stub(productsService, 'remove').resolves(deletedProduct);

    const req = {
      params: '1',
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.remove(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith(deletedProduct.data);
  });

  it('NOT FOUND product by id', async function () {
    sinon.stub(productsService, 'getById').resolves(getByIdNotFound);

    const req = {
      params: { id: 0 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const { data } = getByIdNotFound;
    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(data);
  });
});