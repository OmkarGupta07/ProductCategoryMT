const {
  GetCategoryData,
  GetCategoryDataById,
  AddCategoryData,
  UpdateCategoryData,
  DeleteCategoryData,
} = require("../Service/CategoryService");

const GetCategory = async (req, res) => {
    try {
      const categories = await GetCategoryData();  
      return res.status(200).json(categories);  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const GetCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const categoryById = await GetCategoryDataById(id);
      return res.status(200).json(categoryById);  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const InsertCategory = async (req, res) => {
    try {
      const { CategoryName } = req.body;
      const result = await AddCategoryData(CategoryName);  
      return res.status(200).json(result);  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const UpdateCategory = async (req, res) => {
    try {
      const { CategoryName } = req.body;
      const { id } = req.params;
      const result = await UpdateCategoryData(CategoryName, id);  
      return res.status(200).json(result);  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const DeleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const {message} = await DeleteCategoryData(id);  
      console.log(message);
      if(message==='Cannot Delete Category')
        return res.status(202).json(message);  
      else
         return res.status(200).json(message);  

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = {
  GetCategory,
  InsertCategory,
  UpdateCategory,
  DeleteCategory,
  GetCategoryById,
};
