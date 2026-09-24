export interface subCategory {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface subCategoriesMetadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface SubCategoriesResponse {
  results: number
  metadata: subCategoriesMetadata
  data: subCategory[]
}