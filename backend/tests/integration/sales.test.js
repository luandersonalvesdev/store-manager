const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../src/app');

const connection = require('../../src/models/connection');
const { allSalesFromDB } = require('../mocks/sales.mock');

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

describe('Route /sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('If show all sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);
    const res = await chai.request(app).get('/sales');

    const data = [...allSalesFromDB];
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(data);
  });
});