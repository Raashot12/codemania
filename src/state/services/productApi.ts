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

export interface ProductList {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export type ApiServicesAppGetProductByIdArg = {
  id?: number;
};
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiServicesAppProductGet: build.query<ProductList, unknown>({
      query: () => ({
        url: `/products`,
        method: 'GET',
      }),
    }),
    apiServicesAppGetProductById: build.query<
      ProductList,
      ApiServicesAppGetProductByIdArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useApiServicesAppProductGetQuery,
  useLazyApiServicesAppGetProductByIdQuery,
} = injectedRtkApi;
