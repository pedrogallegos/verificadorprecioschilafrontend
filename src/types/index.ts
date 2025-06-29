export interface Producto {
  _id: string
  nombre: string
  precioPublico: number
  precioCompra: number
  descripcion: string
  codigoBarra: string
  cantidad: number
  imagen?: string
  createdAt: string
  updatedAt: string
}

export interface ProductoInput {
  nombre: string
  precioPublico: number
  precioCompra: number
  descripcion: string
  codigoBarra: string
  cantidad: number
  imagen?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiError {
  success: false
  message: string
  error?: string
}
