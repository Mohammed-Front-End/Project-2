//!!! ProductObj ==== errorsOBJ {title,Decription, image, price}
/**
 * Validates a product object and returns an object containing error messages for invalid fields.
 * 
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product's image.
 * @param {string} product.price - The price of the product.
 * 
 * @returns {Object} An object containing error messages for invalid fields.
 * @returns {string} returns.title - Error message for invalid title.
 * @returns {string} returns.description - Error message for invalid description.
 * @returns {string} returns.imageURL - Error message for invalid imageURL.
 * @returns {string} returns.price - Error message for invalid price.
 */
export const productValidation = (product: { title: string,description: string,imageURL: string, price: string}) =>{
  //?? Returns an object
  const errors: { title: string,description: string,imageURL: string, price: string}= {
    title:"",
    description:"",
    imageURL:"",
    price:"",
  }

  const regex =/^(https?|ftp|http):\/\/[^."]+$/.test(product.imageURL);
  if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
    errors.title = "Product title must be between 10 and 80 characters!"
  }

  if (!product.description.trim() || product.description.length < 10 || product.description.length > 80) {
    errors.description = "Product description must be between 10 and 900 characters!"
  }

  if (!product.imageURL.trim() || regex){
    errors.imageURL = "vald image URL is required"
  } 

  if (!product.price.trim() || isNaN(Number(product.price))){
    errors.price = "vald price is required"
  } 


  return errors
}












