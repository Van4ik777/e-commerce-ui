export const PAGES = {
  home: '/home',
  catalog: '/catalog',
  product: '/product',
  calculator: '/calculator',
  products: (productType = ':productType', productId = ':productId') => `/product/${productType}/${productId}`,
  login: '/login',
  register: '/register'
};
