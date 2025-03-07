interface ICategory {
  id: string
  name: string
  image: string
}

export interface Product {
  id: string
  title: string
  price: number
  description: string
  images: string[]
  category: ICategory
}

export interface LoadProductsInterface {
  id?: string | null
  title?: string | null
  price_min?: string | null
  price_max?: string | null
}
