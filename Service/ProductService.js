const DBConnection = require('../Config/DBConnection');

const GetProductData = async (searchKeyword = '', sortOrder = 'ASC', page = 1, pageSize = 10) => {
    try {
        const [products] = await DBConnection.query('CALL GetProducts(?, ?, ?, ?);', 
            [searchKeyword, sortOrder, parseInt(page), parseInt(pageSize)]
        );
        return products;  
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');  
    }
};

const GetProductById = async (id) => {
    try {
        const [product] = await DBConnection.query('CALL GetProductId(?);', [Number(id)]);
        return product;  
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

const InsertProduct = async (productName, categoryId) => {
    try {
        const [result] = await DBConnection.query('CALL AddProduct(?, ?);', [productName, categoryId]);
        return result;  
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

const UpdateProduct = async (id, productName, categoryId) => {
    try {
        await DBConnection.query('CALL UpdateProduct(?, ?, ?);', [id, productName, categoryId]);
        return { message: 'Product updated successfully' };  
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

const DeleteProduct = async (id) => {
    try {
        const [productExists] = await DBConnection.query('SELECT * FROM Products WHERE ProductId = ?', [id]);
        console.log(productExists,'hiiboi');
        
        if (productExists.length === 0) {
            return { error: 'Product not found' };  
        }
        await DBConnection.query('CALL DeleteProduct(?);', [id]);
        return { message: 'Product deleted successfully' };  
    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
};

module.exports = {
    GetProductData,
    GetProductById,
    InsertProduct,
    UpdateProduct,
    DeleteProduct
};
