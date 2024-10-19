const route=require('express').Router();
const {  GetProductData,InsertProduct,DeleteProduct,UpdateProduct,
    GetCategoryData,AddCategoryData,UpdateCategoryData,DeleteCategoryData,
    GetCategoryDataById,GetProductById}=require('../Controller/Logics');



route.post('/AddCategory',AddCategoryData)
route.put('/EditCategory/:id',UpdateCategoryData)
route.delete('/RemoveCategory/:id',DeleteCategoryData)
route.get('/GetCategory',GetCategoryData)
route.get('/GetCategoryById/:id',GetCategoryDataById)


route.post('/AddProducts',InsertProduct)
route.put('/EditProducts/:id',UpdateProduct)
route.delete('/RemoveProducts/:id',DeleteProduct)
route.get('/GetProducts',GetProductData)
route.get('/GetProductId/:id',GetProductById)


module.exports={route}