import { mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import { css } from 'styled-system/css';

export const GithubLink = () => {
  return (
    <a
      className={styles.container}
      href="https://github.com/ykob/byte-sized-games"
      target="_blank"
      rel="noreferrer"
    >
      <Icon path={mdiGithub} size={2} />
    </a>
  );
};

const styles = {
  container: css({}),
};
