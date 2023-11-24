import { baseApi as api } from './baseApi';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductList {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiServicesAppProductGet: build.query<ProductList, unknown>({
      query: () => ({
        url: `/product`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useApiServicesAppProductGetQuery } = injectedRtkApi;
