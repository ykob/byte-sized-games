import { css } from 'styled-system/css';

interface Props {
  href: string;
  title: string;
}

export const GameCard = ({ href, title }: Props) => {
  return (
    <a
      className={css({
        display: 'block',
        rounded: '8px',
        p: '32px',
        fontSize: 'max(1.2em, 2.4cqw)',
        bgColor: 'bg',
        boxShadow: '0 2px 10px 0 #80aeae',
        textDecoration: 'none',
        color: 'inherit',
      })}
      href={href}
    >
      {title}
    </a>
  );
};
