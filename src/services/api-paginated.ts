/**
 * ============================================
 * SERVICIO API CON PAGINACIÓN - VERSIÓN MEJORADA
 * ============================================
 */

import axios from 'axios'
import type { Producto, ProductoInput, ApiResponse } from '../types'

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Tipos para paginación
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface ProductosQueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: 'nombre' | 'precioPublico' | 'cantidad' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export const productoService = {
  // NUEVO: Obtener productos con paginación
  async getProductosPaginated(params: ProductosQueryParams = {}): Promise<PaginatedResponse<Producto>> {
    const queryParams = new URLSearchParams()
    
    // Parámetros por defecto
    queryParams.append('page', (params.page || 1).toString())
    queryParams.append('limit', (params.limit || 12).toString()) // 12 productos por página (grid 3x4)
    
    if (params.search) queryParams.append('search', params.search)
    if (params.sortBy) queryParams.append('sortBy', params.sortBy)
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
    
    const response = await api.get<ApiResponse<PaginatedResponse<Producto>>>(`/productos?${queryParams}`)
    return response.data.data
  },

  // MANTENER: Para compatibilidad (puede ser útil para otros componentes)
  async getProductos(): Promise<Producto[]> {
    const response = await api.get<ApiResponse<Producto[]>>('/productos?limit=1000') // Máximo 1000 para evitar problemas
    return response.data.data
  },

  // Buscar producto por ID, código de barras o nombre
  async getProducto(identifier: string): Promise<Producto> {
    const response = await api.get<ApiResponse<Producto>>(`/productos/${identifier}`)
    return response.data.data
  },

  // Buscar productos (con paginación)
  async searchProductos(searchTerm: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse<Producto>> {
    return this.getProductosPaginated({
      search: searchTerm,
      page,
      limit
    })
  },

  // Crear nuevo producto
  async createProducto(producto: ProductoInput): Promise<Producto> {
    const response = await api.post<ApiResponse<Producto>>('/productos', producto)
    return response.data.data
  },

  // Actualizar producto
  async updateProducto(identifier: string, producto: Partial<ProductoInput>): Promise<Producto> {
    const response = await api.patch<ApiResponse<Producto>>(`/productos/${identifier}`, producto)
    return response.data.data
  },

  // Eliminar producto
  async deleteProducto(identifier: string): Promise<Producto> {
    const response = await api.delete<ApiResponse<Producto>>(`/productos/${identifier}`)
    return response.data.data
  },
}
