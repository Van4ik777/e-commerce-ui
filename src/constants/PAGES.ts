export const PAGES = {
  home: '/home',
  catalog: '/catalog',
  product: '/product',
  calculator: '/calculator',
  products: (productType = ':productType', productId = ':productId') =>
    `/product/${productType}/${productId}`,
  sale: '/sale',
  checkEmail: '/check-email',
};
