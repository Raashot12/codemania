import Link from 'next/link';
import { createStyles, Text, Container, rem, Flex } from '@mantine/core';
import { BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { data } from 'components/staticData/Footer';
import { IconType } from 'react-icons';

const PageSocialMedia = ({ children }: { children: React.ReactElement }) => {
  return (
    <Flex
      sx={{ borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.3)' }}
      align="center"
      justify="center"
      w={22}
      h={22}
    >
      {children}
    </Flex>
  );
};

const ICON_LINKS: { name: IconType; url: string }[] = [
  {
    name: AiFillInstagram,
    url: '/',
  },
  {
    name: FaFacebookF,
    url: '/',
  },
  {
    name: BsTwitter,
    url: '/',
  },
  {
    name: FaLinkedin,
    url: '/',
  },
];
const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    padding: '48px 0',
    backgroundColor: '#eee8e863',
  },
  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: 'block',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: `30px`,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

const Footer = (): JSX.Element => {
  const { classes } = useStyles();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size="xl" className={classes.inner}>
        <div>
          <Text fz={{ base: '25px', sm: '35px' }} sx={{ fontWeight: 700 }}>
            Jack&June
          </Text>
          <Text className={classes.description}>
            Jack&June is a detailed shop for men and women fashion.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container size="xl" className={classes.afterFooter}>
        <Text>© 2023 Jack&June.</Text>

        <Flex align={'center'} columnGap={16}>
          {ICON_LINKS.map((value, index) => {
            return (
              <PageSocialMedia key={index}>
                <value.name
                  style={{ cursor: 'pointer' }}
                  size={13}
                  color={'black'}
                />
              </PageSocialMedia>
            );
          })}
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
