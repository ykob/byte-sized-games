import { mdiHome } from '@mdi/js';
import { IconButton } from '~/components/common';

export const HomeLink = () => {
  return (
    <IconButton
      as="a"
      buttonType="secondary"
      circle
      href={import.meta.env.BASE_URL}
      iconPath={mdiHome}
    />
  );
};
