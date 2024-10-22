const route = require('express').Router();
const {  
    GetCategory,
    InsertCategory,
    UpdateCategory,
    DeleteCategory,
    GetCategoryById
} = require('../Controller/CategoryController');
const {
    GetProducts,
    CreateProduct,
    RemoveProduct,
    EditProduct,
    GetProductDetailsById,
} = require('../Controller/ProductController')

route.post('/AddCategory', InsertCategory); 
route.put('/EditCategory/:id', UpdateCategory); 
route.delete('/RemoveCategory/:id', DeleteCategory); 
route.get('/GetCategory', GetCategory); 
route.get('/GetCategoryById/:id', GetCategoryById); 

route.post('/AddProduct', CreateProduct); 
route.put('/EditProduct/:id', EditProduct); 
route.delete('/RemoveProduct/:id', RemoveProduct); 
route.get('/GetProducts', GetProducts); 
route.get('/GetProductById/:id', GetProductDetailsById); 

module.exports = { route };
