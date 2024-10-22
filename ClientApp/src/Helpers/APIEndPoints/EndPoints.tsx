const prod = {
  url: "",
};
const dev = {
  url: "http://localhost:5000",
};
export const { url } = dev
export const getCategory = url + "/api/categories"
export const getCategorybyid = url + "/api/categories"
export const InsertCategory = url + "/api/categories"
export const updateCategory = url + "/api/categories"
export const DeleteCategory= url+"/api/categories"

export const getProducts = url + "/api/products"
export const InsertProducts = url + "/api/products"
export const getProductsbyid = url + "/api/products"
export const updateProducts = url + "/api/products"
export const DeleteById= url+"/api/products"



