 const app = require('../server');
 let chai = require('chai');
 let chaiHttp = require('chai-http');
 let should = chai.should();
 const db = require("../src/models");
 const { user: User, department: Department } = db;
 const UserService = require("../src/services/user.service")
 chai.use(chaiHttp);
 var bcrypt = require("bcryptjs");


 let TestUser = {
   username: "DepartmentTEST",
   password: "password",
   email: "DepartmentTEST@email.test",
   firstName : "Test",
     lastName: "Test",
     pesel: "00000000002",
     contactNumber: "000000002",
     address_id: 1,
     role_id: 3
 };

 let TestDepartment = {
     name: 'TestDepartment',
     description: "Test"
 }

 let token = "";


 describe("Department", () => {
    before( async () => {
       await User.destroy({
       where: {pesel: TestUser.pesel}
     });
     await User.create({
       username: TestUser.username,
       email: TestUser.email,
       password: bcrypt.hashSync(TestUser.password, 8),
       first_name: TestUser.firstName,
       last_name: TestUser.lastName,
       birth_date: Date.now(),
       pesel: TestUser.pesel,
       contact_number: TestUser.contactNumber,
       role_id: TestUser.role_id,
   });
 });
     });
      beforeEach( (done) => {
         chai
         .request(app)
         .post("/api/auth/signin")
         .send({username: TestUser.username, password: TestUser.password})
         .end((err, res) => {
           res.should.have.status(200);
           should.exist(res.body.accessToken);
           token = res.body.accessToken;
           done();
         });
      });
   
      describe("/POST Department" ,() => {
        before( async () => {
          await Department.destroy({
          where: {name: TestDepartment.name}
      });
         it("it should POST Department", (done) => {
            chai
            .request(app)
            .post("/api/department/add")
            .set({'x-access-token': token})
            .send(TestDepartment)
            .end((err, res) => {
              res.should.have.status(200);
              should.exist(res.body);
              done();
            });
       });
    });

//  let GETdepartments = {name: "DepToGET", description: "DescToGET"};
     describe("/GET Departments" ,() => {
    //   before(async () => {
    //    await Department.destroy(
    //        {where: {name: GETdepartments.name}}
    //    );
    //    await Department.create(
    //      GETdepartments
    //  );

    //  });
      it("it should GET all Departments", (done) => {
         chai
         .request(app)
         .get("/api/department/get")
         .set({'x-access-token': token})
         .end((err, res) => {
           res.should.have.status(200);
           should.exist(res.body);
           done();
         });
    });
 });

 let GETdepartment = {name: "DepToGET", description: "DescToGET"};

 describe("/GET ONE Department" ,() => {
     let department = {};
     before(async () => {
        await Department.destroy(
                {where: {name: GETdepartment.name}}
            );
            await Department.create(
              GETdepartment
          );
          department = await Department.findOne({
             where: {name : GETdepartment.name}
         })
       })
     it("it should GET one Departments",  (done) => {
        chai
        .request(app)
        .get("/api/department/get/" + department.id)
        .set({'x-access-token': token})
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          done();
        });
   });
 });
 let EDITdepartment = {name: "DepToEdit", description: "DescToEdit"};
 let EDITED = {name: "EditedDep", description: "EditedDesc"};
  describe("/EDIT Department" ,() => {

   before(async () => {
     await Department.destroy(
         {where: {name: EDITdepartment.name}}
     );
     await Department.destroy(
       {where: {name: EDITED.name}}
     );
     await Department.create(
       EDITdepartment
   );
       EDITdepartment = await Department.findOne({
         where: { name: EDITdepartment.name}
       });
   });
      it("it should EDIT Department",  (done) => {
         chai
         .request(app)
         .put("/api/department/edit/" + EDITdepartment.id )
         .set({'x-access-token': token})
         .send(EDITED)
         .end(async (err, res) => {
           res.should.have.status(200);
           department = await Department.findOne({
             where: { id: EDITdepartment.id}
           });
           department.name.should.be.equal(EDITED.name);
           department.description.should.be.equal(EDITED.description);
           done();
         });
    });
  });
  let DELETEdepartment = {name: "DepToDelete", description: "Delete"};
  describe("/DELETE Department" ,() => {

    before(async () => {
      await Department.destroy(
        {where: {name: DELETEdepartment.name}}
    );
     await Department.create(
       DELETEdepartment
       );
      DELETEdepartment = await Department.findOne({
          where: { name: DELETEdepartment.name}
        });
   });
      it("it should DELETE one Department",  (done) => {
         chai
         .request(app)
         .delete("/api/department/delete/" + DELETEdepartment.id )
         .set({'x-access-token': token})
         .end(async (err, res) => {
           res.should.have.status(200);
           done();
         });
    });
  });
 });