const DBConnection = require('../Config/DBConnection');

const GetProductData = async (req, res) => {
    try {
        const { searchKeyword = '', sortOrder = 'ASC', page = 1, pageSize = 10 } = req.query;

        const [Products] = await DBConnection.query('CALL GetProducts(?, ?, ?, ?);', 
            [searchKeyword, sortOrder, parseInt(page), parseInt(pageSize)]
        );

        return res.json({ data: Products });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const InsertProduct = async (req, res) => {
    try {
        const { ProductName, CategoryId } = req.body;
        const [result] = await DBConnection.query('CALL AddProduct(?, ?);', [ProductName, CategoryId]);
        return res.json({ message: 'Product added successfully', result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [productExists] = await DBConnection.query('SELECT * FROM Products WHERE ProductId = ?', [id]);
        if (productExists.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await DBConnection.query('CALL DeleteProduct(?);', [id]);
        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const UpdateProduct = async (req, res) => {
    try {


        const {id} = req.params;
        const { ProductName, CategoryId } = req.body;

        console.log(id, ProductName, CategoryId);
        
     

        await DBConnection.query('CALL UpdateProduct(?, ?, ?);', [id, ProductName, CategoryId]);
        return res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const GetCategoryData = async (req, res) => {
    try {
        const [Category] = await DBConnection.query('CALL GetCategories();');
        console.log(Category)
       
        return res.json({ data: Category });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const GetCategoryDataById = async (req, res) => {
    try {
        const {id} = req.params
        console.log(req.params);
        
        const [Category] = await DBConnection.query('CALL GetCategoryId(?);',[Number(id)]);
        console.log(Category)
       
        return res.json({ data: Category });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const GetProductById = async (req, res) => {
    try {
        console.log(req.params,'in pdid');

        
        const {id} = req.params
        const [Product] = await DBConnection.query('CALL GetProductId(?);',[Number(id)]);
        console.log(Product)
       
        return res.json({ data: Product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const AddCategoryData = async (req, res) => {
    try {
        const { CategoryName } = req.body;
        console.log(CategoryName)
        const [result] = await DBConnection.query('CALL AddCategory(?);', [CategoryName]);
       
        return res.json({ message: 'Category added successfully', result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const UpdateCategoryData = async (req, res) => {
    try {
        const { CategoryName } = req.body;
        const  { id } = req.params
        
        
        var CategoryId = id
        console.log(CategoryId,CategoryName,'kjhk')
        await DBConnection.query('CALL UpdateCategory(?, ?);', [CategoryId, CategoryName]);
       
        return res.json({ message: 'Category updated successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errormsj: 'Internal Server Error',error });
    }
};

const DeleteCategoryData = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoryExists] = await DBConnection.query('SELECT * FROM products WHERE CategoryId = ?', [id]);
        if (categoryExists.length === 0) {
            await DBConnection.query('CALL DeleteCategory(?);', [id]);
            return res.status(200).json({ message: 'Category deleted successfully' });

        }
        return res.status(202).json({ error: 'Cannot Delete Category' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    GetProductData,
    InsertProduct,
    DeleteProduct,
    UpdateProduct,
    GetCategoryData,
    AddCategoryData,
    UpdateCategoryData,
    DeleteCategoryData,
    GetCategoryDataById,GetProductById
};
