import { mdiGithub } from '@mdi/js';
import { css } from 'styled-system/css';

export const GithubLink = () => {
  return (
    <a
      className={styles.container}
      href="https://github.com/ykob/byte-sized-games"
      target="_blank"
      rel="noreferrer"
    >
      <svg width="48" height="48" viewBox="0 0 24 24">
        <path d={mdiGithub} />
      </svg>
    </a>
  );
};

const styles = {
  container: css({}),
};
