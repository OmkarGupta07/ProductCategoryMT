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

    if (categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

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

    if (!categoryById) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(categoryById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const InsertCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;

    if (!CategoryName) {
      return res.status(400).json({ error: 'CategoryName is required' });
    }

    const result = await AddCategoryData(CategoryName);
    return res.status(201).json({ message: 'Category added successfully', result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const { id } = req.params;

    if (!CategoryName) {
      return res.status(400).json({ error: 'CategoryName is required' });
    }

    const result = await UpdateCategoryData(CategoryName, id);

    if (!result) {
      return res.status(404).json({ message: 'Category not found or update failed' });
    }

    return res.status(200).json({ message: 'Category updated successfully', result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = await DeleteCategoryData(id);

    if (message === 'Cannot Delete Category') {
      return res.status(400).json({ message });
    }

    return res.status(200).json({ message });
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
