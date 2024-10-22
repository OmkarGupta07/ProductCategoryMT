const DBConnection = require('../Config/DBConnection');

const GetCategoryData = async () => {
    try {
      const [Category] = await DBConnection.query('CALL GetCategories();');
      return Category;  
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');  
    }
  };
  
  const GetCategoryDataById = async (id) => {
    try {
      const [Category] = await DBConnection.query('CALL GetCategoryId(?);', [Number(id)]);
      return Category;  
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
  
  const AddCategoryData = async (CategoryName) => {
    try {
      const [result] = await DBConnection.query('CALL AddCategory(?);', [CategoryName]);
      return { message: 'Category added successfully', result };  
      
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
  

  const UpdateCategoryData = async (CategoryName, CategoryId) => {
    try {
      await DBConnection.query('CALL UpdateCategory(?, ?);', [CategoryId, CategoryName]);
      return { message: 'Category updated successfully' };  
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
  

  const DeleteCategoryData = async (id) => {
    try {
      const [categoryExists] = await DBConnection.query('SELECT * FROM products WHERE CategoryId = ?', [id]);
      console.log('its working broo');
      
      
      if (categoryExists.length === 0) {
        await DBConnection.query('CALL DeleteCategory(?);', [id]);
        return { message: 'Category deleted successfully' };  
      }
      return { message: 'Cannot Delete Category' };  
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  };
module.exports= {
    GetCategoryData,
    AddCategoryData,
    UpdateCategoryData,
    DeleteCategoryData,
    GetCategoryDataById

}