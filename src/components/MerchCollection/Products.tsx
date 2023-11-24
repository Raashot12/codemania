import React from 'react';
import { Box, Flex, Select } from '@mantine/core';
import { Product as ProductInterface } from 'state/services/productApi';
import styled from '@emotion/styled';
import IconSort from 'components/Icons/IconSort';
import Product from './Product';

const SortSelection = styled(Select)`
  font-weight: 600 !important;
  & .mantine-Select-input {
    font-weight: 500;
    &::placeholder {
      color: #051438 !important;
    }
  }
  & .mantine-Input-rightSection {
    display: none;
  }
`;
const Products = ({
  filterItems,
  product,
  filterArray,
  sortByPriceAndRating,
}: {
  product: ProductInterface[];
  filterArray: string[];
  filterItems: (categories: string) => void;
  sortByPriceAndRating: (ascending: string) => void;
}) => {
  return (
    <Box pt={{ base: 10, md: 60 }} pb={{ base: 10, md: 60 }} id="blogs">
      <Flex
        justify={'space-around'}
        gap={20}
        align={'center'}
        data-testid="form__container"
      >
        <Flex
          align="center"
          justify={'flex-end'}
          columnGap="sm"
          w={260}
          mb={40}
        >
          <IconSort />
          <SortSelection
            placeholder="Filter by"
            variant="unstyled"
            data={['All', ...filterArray]}
            sx={{ fontWeight: 600, flex: 1 }}
            onChange={(value: string) => {
              filterItems(value.toLowerCase());
            }}
          />
        </Flex>
        <Flex
          align="center"
          justify={'flex-end'}
          columnGap="sm"
          w={260}
          mb={40}
        >
          <IconSort />
          <SortSelection
            placeholder=" Sort by"
            variant="unstyled"
            data={['Rating', 'Price']}
            sx={{ fontWeight: 600, flex: 1 }}
            onChange={(value: string) => {
              sortByPriceAndRating(value);
            }}
          />
        </Flex>
      </Flex>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            '@media (min-width: 767px)': {
              flexDirection: 'row',
              columnGap: '20px',
            },
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          columnGap: '40px',

          '@media (min-width: 768px)': {
            rowGap: '15px',
            justifyContent: 'center',
          },
          '@media (min-width: 1200px)': {
            justifyContent: 'start',
          },
        }}
      >
        {product?.map((item) => (
          <React.Fragment key={item.id}>
            <Product {...item} />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
