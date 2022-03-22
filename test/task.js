import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js'


chai.should();
chai.use(chaiHttp);

describe('Blogs API', ()=>{

    describe("GET /api/Blogs",()=>{
        it("It should GET all the blogs",(done)=>{
            chai.request(server)
                .get("/displ/api")
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    
                done();
                })
        })
        
        it("It should NOT GET all the blogs",(done)=>{
            chai.request(server)
                .get("/api/")
                .end((err, response)=>{
                    response.should.have.status(404);
                    
                done();
                });
        });
    });
    
    describe("GET /api/Blogs",()=>{
        it("It should GET all the blogs",(done)=>{
            chai.request(server)
                .get("/displ/")
                .end((err, response)=>{
                    response.body.should.be.a('object');
                    
                done();
                });
        });
    });


    describe("GET /api/Blogs/:id",()=>{
        it("It should GET a blogs",(done)=>{
            chai.request(server)
                .get("/displ/:id")
                .end((err, response)=>{
                    response.should.have.status(403);
                    response.body.should.be.a('object');
                    
                done();
                });
        });

        it("It should GET a blogs",(done)=>{
            const displ = "622a29797b16fce9b317ae05";
            chai.request(server)
                .get("/displ/:id" + displ)
                .end((err, response)=>{
                    // response.should.have.status(200);
                    response.body.should.be.a('object');
                    
                done();
                });
        });
    });
});
