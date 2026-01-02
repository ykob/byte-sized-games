import { css } from 'styled-system/css';
import logo from '~/assets/img/logo.png';
import { GithubLink } from './github-link';
import { HomeLink } from './home-link';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo.src} alt="Byte Sized Games" />
      </div>
      <div className={styles.buttons}>
        <HomeLink />
        <GithubLink />
      </div>
    </div>
  );
};

const styles = {
  header: css({
    display: 'none',
    '@container (width < 1120px) and (width >= 640px)': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '@container (width >= 1120px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
    },
  }),
  logo: css({
    '@container (width < 1120px) and (width >= 640px)': {
      width: '160px',
    },
  }),
  buttons: css({
    display: 'flex',
    gap: '16px',
  }),
};
