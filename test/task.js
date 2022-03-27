import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js'



chai.should();
chai.use(chaiHttp);
const valueToken ='bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkVwYSIsImVtYWlsIjoiZXBhQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NDc5NTQ0Njd9.ojNZrgY4HiUyyYJ1OY5RZog7LIdn7rqAbUIh6guJM70'


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
                    
                done();
                });
        });

        it("It should GET a blogs",(done)=>{
            const hintAcc = process.env.tokenAccess;
            chai.request(server)
                .get("/displ/" + hintAcc)
                .set('Authorization', valueToken)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    
                done();
                });
        });
    });
});


describe("POST /api/Blogs",()=>{
    it("It should NOT POST a blogs whithout Token ",(done)=>{
        const blog ={
           "name":"amali",
           "sub":true
        };
        chai.request(server)
            .post("/displ")
            .send(blog)
            .end((err, response)=>{
                response.should.have.status(403);

            done();
            });
    });

    it("It should POST a new blogs  ",(done)=>{
        
        const blog={
            sub:false
            
        }
        chai.request(server)
            .post("/displ")
            .set('Authorization',valueToken )
            .send(blog)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.a('object');
                // response.text.should.be.eq("object");
                
            done();
            });
    });
});