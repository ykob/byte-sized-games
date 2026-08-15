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
  root: 'flex flex-col items-center justify-center gap-[clamp(1rem,3cqw,2rem)]',
  heading: 'w-[80%] max-w-[480px]',
};
