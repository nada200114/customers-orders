import mysql from 'mysql2';

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database:'e_commerce'  
})



connection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Connection Successfully established ')    }

})







export default connection;