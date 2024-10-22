const {
    GetProductData,
    GetProductById,
    InsertProduct,
    UpdateProduct,
    DeleteProduct
} = require("../Service/ProductService");

const GetProducts = async (req, res) => {
    try {
        const { SearchText='', SortOrder='ASC', pageStart=1, pageSize=100} = req.query;
        console.log( SearchText, SortOrder, pageStart, pageSize);
        
        const products = await GetProductData(SearchText, SortOrder, pageStart, pageSize);
        return res.status(200).json({ data: products });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const GetProductDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await GetProductById(id);
        return res.status(200).json({ data: product });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const CreateProduct = async (req, res) => {
    try {
        const { ProductName, CategoryId } = req.body;
        const result = await InsertProduct(ProductName, CategoryId);
        return res.status(200).json({ message: 'Product added successfully', result });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const EditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName, CategoryId } = req.body;
        const result = await UpdateProduct(id, ProductName, CategoryId);
        return res.status(200).json(result);  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const RemoveProduct = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id);
        
        const result = await DeleteProduct(id);
        console.log(result);
        
        if (result.error) {
            return res.status(404).json(result);  
        }
        return res.status(200).json(result);  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    GetProducts,
    GetProductDetailsById,
    CreateProduct,
    EditProduct,
    RemoveProduct
};
