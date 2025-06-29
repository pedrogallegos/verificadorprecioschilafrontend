/**
 * ============================================
 * CUSTOM HOOKS PARA PRODUCTOS
 * ============================================
 * 
 * Este archivo contiene todos los hooks personalizados para manejar el estado
 * de los productos usando React Query. Cada hook abstrae una operación específica
 * y maneja automáticamente el cache, loading states, y sincronización con el servidor.
 * 
 * React Query Benefits:
 * - Cache automático con invalidación inteligente
 * - Loading y error states manejados automáticamente
 * - Optimistic updates para mejor UX
 * - Background refetching para datos frescos
 * - Deduplicación automática de requests
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productoService } from '../services/api'
import type { ProductoInput } from '../types'

/**
 * QUERY KEYS - IDENTIFICADORES DE CACHE
 * 
 * React Query usa estas keys para identificar y manejar el cache.
 * Usando arrays permite invalidación granular y jerárquica.
 * 
 * Ejemplo: ['productos'] invalida todo el cache de productos
 *          ['productos', 'search', 'coca'] invalida solo esa búsqueda
 */
export const QUERY_KEYS = {
  productos: ['productos'] as const,
  producto: (id: string) => ['productos', id] as const,
  search: (term: string) => ['productos', 'search', term] as const,
}

/**
 * HOOK: useProductos
 * 
 * Obtiene la lista completa de productos del inventario.
 * Ideal para la vista principal de productos.
 * 
 * Features:
 * - Cache de 5 minutos (staleTime)
 * - Auto-refetch en background
 * - Loading state automático
 * 
 * @returns {Object} { data: productos[], isLoading, error, refetch }
 */
export const useProductos = () => {
  return useQuery({
    queryKey: QUERY_KEYS.productos,
    queryFn: productoService.getProductos,
    staleTime: 5 * 60 * 1000, // 5 minutos - datos considerados frescos
  })
}

/**
 * HOOK: useProducto
 * 
 * Obtiene un producto específico por ID, código de barras o nombre exacto.
 * Se ejecuta solo cuando se proporciona un identifier válido.
 * 
 * @param {string} identifier - ID, código de barras, o nombre exacto
 * @returns {Object} { data: producto, isLoading, error, refetch }
 */
export const useProducto = (identifier: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.producto(identifier),
    queryFn: () => productoService.getProducto(identifier),
    enabled: !!identifier, // Solo ejecuta si identifier tiene valor
  })
}

// Hook para buscar productos por nombre
export const useSearchProductos = (searchTerm: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.search(searchTerm),
    queryFn: () => productoService.searchProductos(searchTerm),
    enabled: !!searchTerm && searchTerm.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

// Hook para crear producto
export const useCreateProducto = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (producto: ProductoInput) => productoService.createProducto(producto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.productos })
    },
  })
}

// Hook para actualizar producto
export const useUpdateProducto = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ identifier, data }: { identifier: string; data: Partial<ProductoInput> }) =>
      productoService.updateProducto(identifier, data),
    onSuccess: (updatedProducto) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.productos })
      queryClient.setQueryData(QUERY_KEYS.producto(updatedProducto._id), updatedProducto)
    },
  })
}

// Hook para eliminar producto
export const useDeleteProducto = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (identifier: string) => productoService.deleteProducto(identifier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.productos })
    },
  })
}
