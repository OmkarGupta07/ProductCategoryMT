const {
    GetProductData,
    GetProductById,
    InsertProduct,
    UpdateProduct,
    DeleteProduct
} = require("../Service/ProductService");

const GetProducts = async (req, res) => {
    try {
        const { SearchText = '', SortOrder = 'ASC', pageStart = 1, pageSize = 100 } = req.query;

        const products = await GetProductData(SearchText, SortOrder, pageStart, pageSize);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
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

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ data: product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const CreateProduct = async (req, res) => {
    try {
        const { ProductName, CategoryId } = req.body;

        if (!ProductName || !CategoryId) {
            return res.status(400).json({ error: 'ProductName and CategoryId are required' });
        }

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

        if (!ProductName || !CategoryId) {
            return res.status(400).json({ error: 'ProductName and CategoryId are required' });
        }

        const result = await UpdateProduct(id, ProductName, CategoryId);

        if (!result) {
            return res.status(404).json({ message: 'Product not found or update failed' });
        }
        return res.status(200).json({ message: 'Product updated successfully', result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const RemoveProduct = async (req, res) => {
    try {
        const { id } = req.params;


        const result = await DeleteProduct(id);

        if (result.error || !result) {
            return res.status(404).json({ message: 'Product not found or deletion failed' });
        }
        return res.status(200).json({ message: 'Product deleted successfully', result });
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
