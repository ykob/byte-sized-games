import { mdiGithub } from '@mdi/js';
import { css } from 'styled-system/css';
import { Icon } from '../common';

export const GithubLink = () => {
  return (
    <a
      className={styles.container}
      href="https://github.com/ykob/byte-sized-games"
      target="_blank"
      rel="noreferrer"
    >
      <Icon path={mdiGithub} />
    </a>
  );
};

const styles = {
  container: css({}),
};
