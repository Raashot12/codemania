/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-useless-return */
import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Loader,
  Stack,
  useMantineColorScheme,
} from '@mantine/core';
import { Layout } from 'components/Layout/Layout';
import Products from 'components/MerchCollection/Products';
import { featured } from 'components/MerchCollection/staticData';
import { CategoriesType } from 'types/merchSection';
import MerchHeroSection from 'components/MerchCollection/MerchHeroSection';
import Cards from 'components/MerchCollection/Cards';
import Wilderness from 'components/MerchCollection/Wilderness';
import Accessories from 'components/MerchCollection/Accessories';
import MerchCollectionBlog from 'components/MerchCollection/MerchCollectionBlog';
import {
  Product,
  useApiServicesAppProductGetQuery,
} from 'state/services/productApi';
import { IconAlertCircle } from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import { usePagination } from 'hooks/usePagination';
import Pagination from 'components/Pagination';

const MerchCollectionPage = () => {
  const { data, isLoading, isError, refetch } =
    useApiServicesAppProductGetQuery({});
  const { colorScheme } = useMantineColorScheme();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filterArray, setFilterArray] = useState<string[]>([]);

  const matches = useMediaQuery('(max-width: 991.5px)');
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({
      itemsPerPage: matches ? 4 : 4,
      data: allProducts,
      startFrom: 1,
    });

  useEffect(() => {
    if (!isLoading && !isError) {
      const { products } = data;
      setAllProducts(products);
      const allCategories = [
        ...new Set(
          products?.map(
            (item) =>
              item.category.charAt(0).toUpperCase() + item.category.slice(1)
          )
        ),
      ];
      setFilterArray(allCategories);
    }
  }, [data, isError, isLoading]);

  const filterItems = (categories: string) => {
    if (!isLoading && !isError) {
      const { products } = data;
      const otherCategories = data.products.filter(
        (item) => item.category === categories
      );
      if (categories === 'all') {
        setAllProducts(products);
      } else {
        setAllProducts(otherCategories);
      }
    }
  };
  const sortByPriceAndRating = (ascending: string) => {
    const sorted = [...allProducts].sort((a, b) => {
      if (a.price === b.price) {
        // If prices are equal, compare by rating
        return ascending === 'Rating'
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
      // Otherwise, compare by price
      return ascending === 'Price' ? a.price - b.price : b.price - a.price;
    });
    setAllProducts(sorted);
  };
  return (
    <Layout pageTitle="Merch Collections">
      <MerchHeroSection />
      <Box sx={{ background: colorScheme === 'dark' ? '#232324' : '#ffff' }}>
        <Container size="xl">
          <Cards />
          {isLoading ? (
            <Center>
              <Loader size={'lg'} variant="bars" color="#E25D24" />
            </Center>
          ) : isError ? (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Error"
              color="red.6"
              variant="outline"
              withCloseButton
              mb={50}
            >
              Error Fetching product data{' '}
              <Button
                sx={{
                  height: '25px',
                  background: '#E25D24',
                  ':hover': {
                    background: '#E25D24',
                    transition: 'all ease-in-out 0.5s',
                  },
                  '.mantine-Button-label': {
                    fontSize: '14px',
                    padding: '0',
                  },
                }}
                onClick={refetch}
              >
                Try again!
              </Button>
            </Alert>
          ) : (
            <Stack mb={40}>
              <Products
                filterItems={filterItems}
                product={slicedData}
                filterArray={filterArray}
                sortByPriceAndRating={sortByPriceAndRating}
              />
              <Pagination
                idToClampTo="blogs"
                pagination={pagination}
                prevPage={prevPage}
                nextPage={nextPage}
                changePage={changePage}
              />
            </Stack>
          )}
        </Container>
      </Box>
      <Wilderness />
      <Accessories />
      <MerchCollectionBlog />
    </Layout>
  );
};

export default MerchCollectionPage;
