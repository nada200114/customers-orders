import connection from "../../../db/connection.js";

// _______________________________
// API to Create order.
// ______________________________
export const createOrder=(req,res,next)=>{
    const{customer_id,order_date,total_amount}=req.body;
   const query=`INSERT INTO orders(customer_id,order_date,total_amount) VALUES ('${customer_id}','${order_date}','${total_amount}')`
      
        connection.execute(query,(err,result)=>{
        
            if(err){
               return res.status(400).json({msg:'Failed to create order'});
            }
            // console.log(result);      
            return res.json({msg:"Created Successfully"});      
        })
}
// _________________________________________________
// API to calculate the average order value.
// _______________________________________________
export const avgOfOrder=(req,res,next)=>{
   const query=`SELECT AVG(total_amount) AS avg_order FROM orders`
      
        connection.execute(query,(err,result)=>{
        
            if(err){
               return res.status(400).json({msg:'Failed to get average'});
            }
            // console.log(result);      
            return res.json({result});      
        })
}


// _________________________________________________________________
// Write a query to list all customers who have not made any orders.
//___________________________________________________________________

export const customerWithNoOrders=(req,res,next)=>{
        const query=`
        SELECT * FROM customers
        WHERE id NOT IN (SELECT customer_id FROM orders)
    `;
        connection.execute(query,(err,result)=>{
            if(err){
                return res.status(400).json({msg:'Failed to get customers'});
            }
            return res.status(200).json({result});
        }
    )} 
        
//_______________________________________________________________________________
// API to find the customer who has purchased the most items in total.
//_____________________________________________________________________________

export const customerWithMostItems=(req,res,next)=>{
    const query = `
    SELECT customers.*, SUM(order_items.quantity) AS total_items
    FROM customers
    JOIN orders ON customers.id = orders.customer_id
    JOIN order_items ON orders.id = order_items.order_id
    GROUP BY customers.id
    ORDER BY total_items DESC
    LIMIT 1
`;
connection.execute(query,(err,result)=>{
    if(err){
        return res.status(400).json({msg:'Failed to get customer who has purchased the most items in total.'});
    }
    return res.status(200).json({result});
}
)} 

// _________________________________________________________________
// API to list the top 10 customers who have spent the most money.
// ________________________________________________________________

export const top10Customers=(req,res,next)=>{
    const query = `
    SELECT customers.*, SUM(orders.total_amount) AS total_spent
    FROM customers
    JOIN orders ON customers.id = orders.customer_id
    GROUP BY customers.id
    ORDER BY total_spent DESC
    LIMIT 10
`;
connection.execute(query,(err,result)=>{
    if(err){
        return res.status(400).json({msg:'Failed to get top customers who have spent the most money.'});
    }
    return res.status(200).json({result});
}
)} 

// _________________________________________________________________
// API to list all customers who have made at least 5 orders.
//________________________________________________________________

export const customerWithFiveOrders=(req,res,next)=>{
    const query = `
    SELECT * FROM customers
    WHERE id IN (SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(customer_id) >= 5)
`;
connection.execute(query,(err,result)=>{
    if(err){
        return res.status(400).json({msg:'Failed to get customers who have made at least 5 orders..'});
    }
    return res.status(200).json({result});
}
)} 
//____________________________________________________________________________
// API to find the percentage of customers who have made more than one order. 
// ____________________________________________________________________________

export const percentageOfCustomers=(req,res,next)=>{
    const query = `
    SELECT COUNT(customer_id) * 100.0 / (SELECT COUNT(*) FROM customers) AS percentage
    FROM orders
    GROUP BY customer_id
`;
connection.execute(query,(err,result)=>{
    if(err){
        return res.status(400).json({msg:'Failed to get customers who have made more than one order..'});
    }
    return res.status(200).json({result});
}
)} 
// ________________________________________________________________
//  API to find the customer who has made the earliest order.
// ________________________________________________________________

export const customerWithEarliestOrder=(req,res,next)=>{
    const query = `
    SELECT customers.*, orders.order_date
    FROM customers 
    JOIN orders  ON customers.id = orders.customer_id
    ORDER BY orders.order_date ASC
    LIMIT 1
`;
connection.execute(query,(err,result)=>{
    if(err){
        return res.status(400).json({msg:'Failed to get customers who  who has made the earliest order.'});
    }
    return res.status(200).json({result});
}
)} 

    
