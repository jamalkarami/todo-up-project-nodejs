const  errorHandler = (error, req, res, next)=>{
    
    if(error.name === 'ValidationError'){        
        return res.status(400).send("all task's information are required!");    
    }

    if(error.message){
        res.status(400).send(error.message);
    }
    
    res.status(500).send('Something went wrong!');
}

export default errorHandler; 