const mysql = require('mysql')
const express= require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
// app.use(bodyParser.urlencoded({extended : true}))

const pool= mysql.createPool({
    host : 'localhost',
    user: 'root',
    password: 'shivansh',
    database: 'files',
    multipleStatements: true
})

pool.getConnection((err, db) => {
    if(err){
        return console.log(err);
    }
    app.get('/files/count' , (req,res) => {
        const command= 'SELECT count(fileId) as count from files'
        db.query(command,(err,result)=>{
            if(err){
                return res.json({
                    status: 400,
                    message:err
                })
            }
            return res.send(result)
        })
    })

    app.get('/files' , (req,res) => {
        const command = 'select * from files'
        db.query(command, (err, result)=>{
            if(err){
                return res.json(err)
            }
            return res.json(result)
        })
    })
    
    app.post('/users/create' , (req,res) => {
        const username = req.body.username ;
        const empId = req.body.empId ;
        const department = req.body.department;
        const email = req.body.email;
        const password = req.body.password ;
    
        const command =`insert into users(username,empId,department,email, password) values ("${username}","${empId}","${department}","${email}","${password}")`
        console.log(command)
        db.query(command ,
            (err, result)=>{
                if(err) {
                    console.warn(err);
                }
                return res.send({
                    status: 200,
                    message: 'User created'
                })
        })
    })
    
    app.post('/users' , (req,res) => {
        const empId = req.body.empId
        const command =`select * from users where empId = "${empId}"`
        db.query(command , (err, result)=>{
            if(err) {
                console.warn(err);
            }
            console.log(result)
            return res.json(result)
        })
    })

    app.post('/files/forward' , (req, res) => {
        const fileId = req.body.fileId;
        const fromDepartment = req.body.fromDepartment;
        const toDepartment = req.body.toDepartment;
        const command =`update files set department="${toDepartment}" where fileId = "${fileId}" `
        db.query(command , (err, result)=>{
            if(err) { return console.log(err);}
            const command = `insert into ${fromDepartment}_outbox value("${fileId}" , NOW() , "${toDepartment}")`
            db.query(command, (err, result)=>{
                if(err) {
                    return console.log(err);
                }
                const command = `insert into ${toDepartment}_inbox value("${fileId}" , NOW() , "${fromDepartment}")`
                db.query(command, (err, result)=>{
                    if(err) {
                        return console.log(err);
                    }
                    const command = `insert into file_${fileId}(department,fromDate) value("${toDepartment}" , NOW())`
                    db.query(command, (err, result)=>{
                        if(err){
                            return console.log(err);
                        }

                        const command = `update file_${fileId} set toDate = NOW() where department = "${fromDepartment.toLowerCase()}" and toDate = NULL`
                        db.query(command, (err, result)=>{
                            if(err) {
                                return console.log(err);
                            }

                            const command = `delete from ${fromDepartment}_inbox where fileId = "${fileId}"`
                            db.query(command, (err, result)=>{
                                if(err) {
                                   return console.log(err);
                                }
                                return res.send({
                                    status: 200,
                                    message: 'forwarded successfully'
                                })
                            })
                        })
                    })
                })

            })
        })
    })

    app.post('/files/create', (req,res)=>{
        data = req.body
        const fileId = data.fileId
        const filename = data.filename
        const erpId = data.erpId
        const department = data.department
        const createdBy = data.createdBy
        const sql = `insert into files(fileId,filename ,erpId ,department ,createdDate, createdBy) values("${fileId}","${filename}","${erpId}","${department}",NOW(),"${createdBy}") `
        db.query(sql, (err,result)=>{
            if(err){
                return res.send({
                    status: 400,
                    message: 'File creation failed'
                })
            }
            db.query(`create table file_${fileId}(department varchar(20) , fromDate date,toDate date)`,(err, result)=>{
                if(err) {
                    console.log(err);
                }
                db.query(`insert into file_${fileId}(department,fromDate) values("${department}" , NOW() )` ,(err, result)=>{
                if(err) {
                    console.log(err);
                } 
                db.query(`insert into ${department.replace(' ', '_')}_inbox value("${fileId}" , NOW() , "${department}")`,(err, result)=>{
                if(err) {
                    console.log(err);
                }
            
                     })
                })
            })
           
            
            return res.send({
                status: 200,
                message: 'File created'
            })

        })
    })

    app.post('/executeQuery',(req,res)=>{
        const command = req.body.command;
        db.query(command, (err, result)=>{
            if(err){
                console.log(err);
            }
            return res.send(result)
        })
    })

    app.post('/users/check',(req,res)=>{
        const empId = req.body.empId
        const password = req.body.password

        const command=  `select count(empId) as count from users where empId = "${empId}" and password = "${password}"`
        db.query(command,(err,result)=>{
            if(err) {
                console.log(err);
            }
            if(result.count == 1){
                return res.json({
                    status: 200,
                    message : 'valid_user'
                })
            }else{
                return res.json({
                    status: 400,
                    message: 'invalid_user'
                })
            }
        })
    })

})

// app.post('/users/validate', (req,res) =>{
//     try {
//         const empId = req.body.empId
//     } catch (error) {
//         console.log(error);
//     }
// })

app.listen(8081 , () => {
    console.log('server running ...');
})