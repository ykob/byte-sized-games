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
  header:
    'hidden @min-[640px]/content:@max-[1119px]/content:flex @min-[640px]/content:@max-[1119px]/content:justify-between @min-[1120px]/content:flex @min-[1120px]/content:flex-col @min-[1120px]/content:items-center @min-[1120px]/content:gap-6',
  logo: '@min-[640px]/content:@max-[1119px]/content:w-[160px]',
  buttons: 'flex gap-2',
};
