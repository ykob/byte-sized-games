import { cn } from '~/utils';

interface Props {
  href: string;
  title: string;
}

export const GameCard = ({ href, title }: Props) => {
  return (
    <a
      className={cn(
        // Layout & Display
        'block no-underline',
        // Padding & Radius
        'rounded-lg p-[32px]',
        // Typography & Colors
        'bg-bg-main text-[max(1.2em,2.4cqw)] text-inherit',
        // Elevation
        'shadow-[0_2px_10px_0_#80aeae]'
      )}
      href={href}
    >
      {title}
    </a>
  );
};
