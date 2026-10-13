import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/products';
import { productKeys } from '../queryKeys';
import { Product } from '@/api/types';

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: productKeys.lists(),
    queryFn: ({ signal }) => getProducts(signal),
  });
}
