import { css } from 'styled-system/css';
import logo from '~/assets/img/logo.png';
import { GithubLink } from '~/components/home/github-link';

export const Header = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>
        <img src={logo.src} alt="Byte Sized Games" />
      </h1>
      <div>
        <GithubLink />
      </div>
    </div>
  );
};

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 'clamp(12px, 3cqw, 32px)',
  }),
  heading: css({
    w: '80%',
    maxW: '480px',
  }),
};
