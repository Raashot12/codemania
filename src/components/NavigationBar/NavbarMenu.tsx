/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
import Link from 'next/link';
import {
  Burger,
  Container,
  Group,
  Header,
  Text,
  createStyles,
  Transition,
  Paper,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { links } from 'components/staticData/Navbar';
import { DataTypes } from 'types/merchSection';
import styled from '@emotion/styled';

const CustomLink = styled(Link)`
  font-weight: 500;
  &.active {
    color: #e1621b;
    font-weight: 600;
  }

  &.not-active:hover {
    color: #e1621b;
    font-weight: 600;
    transition: all ease-in-out 0.5s;
  }
`;
const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    padding: '20px',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  linkDesktop: {
    color: '#262a2c',
    ':hover': {
      color: '#E25D24',
    },
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  isActive: {
    color: '#E25D24',
  },
}));
const Navbar = (): JSX.Element => {
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Header height={80} className={classes.root}>
      <Container size="xl" className={classes.header}>
        <Link href="/">
          <Text fz={{ base: '25px', sm: '35px' }} sx={{ fontWeight: 700 }}>
            Jack&June
          </Text>
        </Link>
        <Group spacing={30} className={classes.links}>
          {links.map((link: DataTypes, index) => {
            return (
              <CustomLink href={link.link} key={index} passHref>
                <Text fw={500}>{link.label}</Text>
              </CustomLink>
            );
          })}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="md"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              className={classes.dropdown}
              style={styles}
              sx={{ zIndex: 999 }}
            >
              <Box className={classes.wrap}>
                {links.map((link) => (
                  <Link href={link.link} key={link.label} onClick={close}>
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default Navbar;
