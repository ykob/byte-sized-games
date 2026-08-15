import logo from '~/assets/img/logo.png';
import { GithubLink } from './github-link';
import { HomeLink } from './home-link';

export const Header = () => {
  return (
    <div className="hidden @min-[640px]/content:@max-[1119px]/content:flex @min-[640px]/content:@max-[1119px]/content:justify-between @min-[1120px]/content:flex @min-[1120px]/content:flex-col @min-[1120px]/content:items-center @min-[1120px]/content:gap-6">
      <div className="@min-[640px]/content:@max-[1119px]/content:w-[160px]">
        <img src={logo.src} alt="Byte Sized Games" />
      </div>
      <div className="flex gap-2">
        <HomeLink />
        <GithubLink />
      </div>
    </div>
  );
};
