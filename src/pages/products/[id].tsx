import { Layout } from 'components/Layout/Layout';
import ProductDetails from 'components/MerchCollection/ProductDetails';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Product } from 'state/services/productApi';

type ProductProps = {
  productsData: Product;
};

const SingleItem: React.FC<ProductProps> = ({ productsData }) => {
  return (
    <Layout pageTitle={`Merch collection | ${productsData.title}`}>
      <ProductDetails {...productsData} />
    </Layout>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_SERVICE_BASE_URL}/products`
  );
  // ProductList
  const productsData = await res.json();
  const { products } = productsData;
  // Generate paths for each post
  const ids = products?.map((post) => post.id);
  const paths = ids?.map((id) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async ({
  params,
}) => {
  // Fetch data for a specific post based on the ID
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_SERVICE_BASE_URL}/products/${params?.id}`
  );
  const productsData: Product = await res.json();
  return {
    props: { productsData },
  };
};
export default SingleItem;
