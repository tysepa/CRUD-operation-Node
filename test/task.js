import chai from 'chai';
import chaiHttp from 'chai-http';
import  {response } from 'express';
// import  Express  from 'express';
import server from '../routers/displ.js'


chai.should();
chai.use(chaiHttp);
// const app = Express()

describe('Tasks API', ()=>{

    describe("GET /api/blogs",()=>{
        it("It should GET all the blogs",(done)=>{
            chai.request(server)
                .get("/displ")
                .end((err, response)=>{
                    // response.should.have.status(200);
                    // response.body.should.be.a('array');
                    // response.body.length.should.be.eq(1);
                done();
                })
        })
    })
})
