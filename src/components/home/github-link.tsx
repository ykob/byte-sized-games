import { mdiGithub } from '@mdi/js';
import { IconButton } from '~/components/common';

export const GithubLink = () => {
  return (
    <IconButton
      as="a"
      buttonType="secondary"
      circle
      href="https://github.com/ykob/byte-sized-games"
      iconPath={mdiGithub}
      target="_blank"
      rel="noreferrer"
    />
  );
};
