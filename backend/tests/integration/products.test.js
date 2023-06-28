const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../src/app');

const connection = require('../../src/models/connection');
const { allProductsFromDB } = require('../mocks/products.mock');

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

describe('Route /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('If show all products', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    const res = await chai.request(app).get('/products');

    const data = [...allProductsFromDB];
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(data);
  });
});