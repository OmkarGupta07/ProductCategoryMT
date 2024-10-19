const DBConnection=require('../Config/DBConnection');



const GetProducts=async () =>{
    try {
        const [users]=await DBConnection.query('CALL GetProducts();')
        console.log(users);
        return users;
    } catch (error) {
        console.log(error);
        
    }
}


const GetCategory=async () =>{
    try {
        const [Category]=await DBConnection.query('CALL GetCategories();')
        console.log(Category);
        return Category;
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={GetProducts,GetCategory};