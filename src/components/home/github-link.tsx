import { mdiGithub } from '@mdi/js';
import { Button, Icon } from '../common';

export const GithubLink = () => {
  return (
    <Button
      as="a"
      circle
      href="https://github.com/ykob/byte-sized-games"
      target="_blank"
      rel="noreferrer"
    >
      <Icon path={mdiGithub} size={2} />
    </Button>
  );
};
