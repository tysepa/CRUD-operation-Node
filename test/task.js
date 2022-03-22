import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

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
        it("It should NOT GET a blogs without use token",(done)=>{
            chai.request(server)
                .get("/displ/:id")
                .end((err, response)=>{
                    response.should.have.status(403);
                    response.body.should.be.a('object');
                    response.text.should.be.eq("Forbidden");
                    
                done();
                });
        });

        it("It should GET a blogs",(done)=>{
            const hintAcc = process.env.tokenAccess;
            chai.request(server)
                .get("/displ/:id" + hintAcc)
                .end((err, response)=>{
                    // response.should.have.status(200);
                    response.body.should.be.a('object');
                    
                done();
                });
        });
    });
});


describe("POST /api/Blogs",()=>{
    it("It should NOT POST a blogs whithout Token ",(done)=>{
        const blog ={
            name:"cred",
            tech: "free",
            sub:false
        };
        chai.request(server)
            .post("/displ")
            .send(blog)
            .end((err, response)=>{
                response.should.have.status(403);
                response.body.should.be.a('object');
                response.text.should.be.eq("Forbidden");
                
            done();
            });
    });

    it("It should NOT POST a new blogs whithout The name property ",(done)=>{
        const blog={
            name: ''
        }
        chai.request(server)
            .post("/displ")
            .send(blog)
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq("Error");
                
            done();
            });
    });
});