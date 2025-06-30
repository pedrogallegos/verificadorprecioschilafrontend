/**
 * ============================================
 * HOOKS CON PAGINACIÓN - VERSIÓN MEJORADA
 * ============================================
 */

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { productoService, type ProductosQueryParams, type PaginatedResponse } from '../services/api-paginated'
import type { ProductoInput, Producto } from '../types'

/**
 * QUERY KEYS PARA PAGINACIÓN
 */
export const PAGINATION_QUERY_KEYS = {
  productos: ['productos', 'paginated'] as const,
  productosInfinite: (params: ProductosQueryParams) => ['productos', 'infinite', params] as const,
  producto: (id: string) => ['productos', id] as const,
}

/**
 * HOOK: useProductosPaginated
 * 
 * Obtiene productos con paginación tradicional (página por página)
 * Ideal para interfaces con botones de página
 */
export const useProductosPaginated = (params: ProductosQueryParams = {}) => {
  return useQuery({
    queryKey: [...PAGINATION_QUERY_KEYS.productos, params],
    queryFn: () => productoService.getProductosPaginated(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    placeholderData: (previousData) => previousData, // Mantiene datos previos durante loading
  })
}

/**
 * HOOK: useProductosInfinite
 * 
 * Obtiene productos con scroll infinito (más moderno)
 * Ideal para interfaces móviles y desktop modernas
 */
export const useProductosInfinite = (params: Omit<ProductosQueryParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: PAGINATION_QUERY_KEYS.productosInfinite(params),
    queryFn: ({ pageParam }) => 
      productoService.getProductosPaginated({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<Producto>) => 
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    // Configuración para mejor UX
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

/**
 * HOOK: useCreateProducto
 * Actualizado para invalidar queries paginadas
 */
export const useCreateProductoPaginated = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (producto: ProductoInput) => productoService.createProducto(producto),
    onSuccess: () => {
      // Invalida tanto las queries tradicionales como las paginadas
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      queryClient.invalidateQueries({ queryKey: PAGINATION_QUERY_KEYS.productos })
    },
  })
}

/**
 * HOOK: useUpdateProducto
 * Actualizado para invalidar queries paginadas
 */
export const useUpdateProductoPaginated = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ identifier, data }: { identifier: string; data: Partial<ProductoInput> }) =>
      productoService.updateProducto(identifier, data),
    onSuccess: (updatedProducto) => {
      // Invalida queries y actualiza cache específico
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      queryClient.invalidateQueries({ queryKey: PAGINATION_QUERY_KEYS.productos })
      queryClient.setQueryData(PAGINATION_QUERY_KEYS.producto(updatedProducto._id), updatedProducto)
    },
  })
}

/**
 * HOOK: useDeleteProducto
 * Actualizado para invalidar queries paginadas
 */
export const useDeleteProductoPaginated = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (identifier: string) => productoService.deleteProducto(identifier),
    onSuccess: () => {
      // Invalida todas las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      queryClient.invalidateQueries({ queryKey: PAGINATION_QUERY_KEYS.productos })
    },
  })
}
