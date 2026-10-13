import { fakeStoreClient } from './client';
import { Product } from './types';

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  return fakeStoreClient<Product[]>('/products', { signal });
}

export async function getProduct(id: number, signal?: AbortSignal): Promise<Product> {
  return fakeStoreClient<Product>(`/products/${id}`, { signal });
}
