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


route.post('/categories', InsertCategory);
route.put('/categories/:id', UpdateCategory);
route.delete('/categories/:id', DeleteCategory);
route.get('/categories', GetCategory);
route.get('/categories/:id', GetCategoryById);

route.post('/products', CreateProduct);
route.put('/products/:id', EditProduct);
route.delete('/products/:id', RemoveProduct);
route.get('/products', GetProducts);
route.get('/products/:id', GetProductDetailsById);












module.exports = { route };
