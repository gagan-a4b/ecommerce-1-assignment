const STORAGE_KEY = 'shop_products';

const defaultProducts = [
  { id: 1, name: 'iPhone 14', imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg', description: 'Apple smartphone', price: 999.99 },
  { id: 2, name: 'Samsung Galaxy S23', description: 'Samsung flagship', price: 899.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 3, name: 'OnePlus 11', description: 'OnePlus flagship', price: 749.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 4, name: 'Google Pixel 7', description: 'Google smartphone', price: 899.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 5, name: 'Xiaomi Mi 13', description: 'Xiaomi flagship', price: 799.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 6, name: 'Sony Xperia 1 IV', description: 'Sony smartphone', price: 1299.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 7, name: 'Motorola Edge 30', description: 'Motorola phone', price: 599.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 8, name: 'Asus ROG Phone 6', description: 'Gaming smartphone', price: 1099.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 9, name: 'Nokia X30', description: 'Nokia smartphone', price: 499.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 10, name: 'Realme GT 2', description: 'Realme flagship', price: 699.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 11, name: 'Vivo X90', description: 'Vivo smartphone', price: 799.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 12, name: 'Oppo Find X5', description: 'Oppo flagship', price: 849.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 13, name: 'Honor Magic 5', description: 'Honor smartphone', price: 699.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 14, name: 'ZTE Axon 40', description: 'ZTE smartphone', price: 649.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 15, name: 'Lenovo Legion Phone', description: 'Gaming phone', price: 999.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 16, name: 'HTC U23 Pro', description: 'HTC smartphone', price: 699.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 17, name: 'BlackBerry Key3', description: 'BlackBerry smartphone', price: 599.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 18, name: 'Micromax In Note 3', description: 'Micromax phone', price: 299.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 19, name: 'Lava Blaze Pro', description: 'Lava smartphone', price: 199.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 20, name: 'Infinix Zero 5G', description: 'Infinix smartphone', price: 349.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 21, name: 'Tecno Phantom X2', description: 'Tecno smartphone', price: 449.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 22, name: 'iQOO Neo 7', description: 'iQOO smartphone', price: 699.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 23, name: 'Nothing Phone 1', description: 'Nothing brand phone', price: 599.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 24, name: 'Fairphone 4', description: 'Eco-friendly phone', price: 649.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 25, name: 'Palm Phone', description: 'Compact smartphone', price: 349.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 26, name: 'Cat S62 Pro', description: 'Rugged smartphone', price: 549.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 27, name: 'Unihertz Titan', description: 'QWERTY phone', price: 429.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 28, name: 'Redmi Note 12', description: 'Budget Xiaomi phone', price: 399.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 29, name: 'Meizu 20 Pro', description: 'Meizu flagship', price: 779.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' },
  { id: 30, name: 'Sharp Aquos R7', description: 'Sharp smartphone', price: 899.99, imageURL: 'https://s3no.cashify.in/cashify/store/product/9fc9da82659049ff95e4b240ae722d41.jpg?p=default&s=lg' }
];

//the funtion to call for products
 export async function fetchProducts(){
  const response =  await fetch('http://localhost:3000/api/products/');
  const data = await response.json();
  const { products } = data;
  return products;
}

//the function to create products
export async function createProduct(product) {
  const response = await fetch('http://localhost:3000/api/products/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return await response.json();
}

//the function to update products
export async function updateProduct(id, product) {
  console.log('Updating product:', { id, ...product });

  const response = await fetch(`http://localhost:3000/api/products/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return await response.json();
}

//the function to delete products
export async function deleteProducts(id) {
  const response = await fetch(`http://localhost:3000/api/products/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return await response.json();
}




// // Load from localStorage, or fallback to default
// function loadProducts() {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   if (stored) {
//     return JSON.parse(stored);
//   } else {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
//     return defaultProducts;
//   }
// }

// // Save to localStorage
// function saveProducts(products) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
// }

// // Public API
// export function getProducts() {
//   return loadProducts();
// }

// export function saveProduct(product) {
//   const products = loadProducts();
//   product.id = Date.now(); // Unique ID
//   products.push(product);
//   saveProducts(products);
// }

// export function deleteProduct(id) {
//   const products = loadProducts().filter(p => p.id !== id);
//   saveProducts(products);
// }
