import connection from '../../../db/connection.js';

// get all customers
export const getCustomers=(req,res,next)=>{

    connection.execute(`select * from customers`,(err,result)=>{
        if(err){
            res.status(500).json({Mes:'Query error',err})
        }
        // console.log(result);      
        return res.json(result)      
    })
}

// _____________________________Sign up_______________________

export const signup=(req,res,next)=>{
    const{first_name,last_name,email,phone}=req.body;
    connection.execute(`select email from customers where email="${email}"`,(err,result)=>{
        if(err){
            return res.status(400).json({msg:'Query error',err})
         }
       if(result.length){
        return res.status(400).json('email already exists');
       } 
      
        connection.execute(`insert into customers (first_name,last_name,email,phone) values ("${first_name}","${last_name}","${email}","${phone}")`,(err,result)=>{
        
            if(!result.affectedRows){
               return res.status(400).json({msg:'Failed to register'});
            }
            // console.log(result);      
            return res.json({msg:"Registered successfully"});      
        })
    })

   
}


// _____________________________Sign in_________________________

export const signIn=(req,res,next)=>{
    const{email}=req.body;
    connection.execute(`select * from customers where email="${email}"`,(err,result)=>{
        if(err){
            return res.status(400).json({msg:'Query error',err})
         }
       if(!result.length){
        return res.status(400).json('customer does not exist');
       } 
         
            return res.json(result);       
    })  
}