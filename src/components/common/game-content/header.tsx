import logo from '~/assets/img/logo.png';
import { cn } from '~/utils';
import { GithubLink } from './github-link';
import { HomeLink } from './home-link';

const headerResponsiveStyles = {
  // スマホ表示時: 非表示
  base: 'hidden',
  // タブレット中画面 (640px ～ 1119px): 横並び配置
  medium: [
    '@min-[640px]/content:@max-[1119px]/content:flex',
    '@min-[640px]/content:@max-[1119px]/content:justify-between',
  ],
  // PC大画面 (1120px～): 縦並び中央揃え配置
  large: [
    '@min-[1120px]/content:flex',
    '@min-[1120px]/content:flex-col',
    '@min-[1120px]/content:items-center',
    '@min-[1120px]/content:gap-6',
  ],
};

export const Header = () => {
  return (
    <div
      className={cn(
        headerResponsiveStyles.base,
        headerResponsiveStyles.medium,
        headerResponsiveStyles.large
      )}
    >
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
