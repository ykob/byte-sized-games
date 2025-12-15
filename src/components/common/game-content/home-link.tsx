import { mdiHome } from '@mdi/js';
import { IconButton } from '~/components/common';

export const HomeLink = () => {
  return <IconButton as="a" buttonType="secondary" circle href="/" iconPath={mdiHome} />;
};
