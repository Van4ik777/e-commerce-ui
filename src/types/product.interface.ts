export interface Product{
    id: number,
    name: string,
    categoryId: number,
    price: number,
    discount: number,
    description: string,
    images: string[],
    reviews: Review[],
    productDetails: ProductDetails[]
}
export interface Review{
    id: number,
    text: string
    userId: number
    productId: number
}
export interface ProductDetails{
    productId: number
    colors: string[]
    materials: string[]
    height: number
    width: number
    depth: number
    swivelMechanism: string
}