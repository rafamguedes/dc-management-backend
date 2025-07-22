import express = require('express');

const createCorsMiddleware = (): express.RequestHandler => {
  return (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
    
    res.header(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma'
    );
    
    res.header('Access-Control-Allow-Credentials', 'true');
    
    res.header('Access-Control-Max-Age', '86400');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    next();
  };
};

export default createCorsMiddleware();