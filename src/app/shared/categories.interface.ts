export interface Categories {
  _id: string
  name: string
  subCategories: SubCategory[]
}

interface SubCategory {
  _id: string
  name: string
  category: string
}
