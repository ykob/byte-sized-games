interface Props {
  href: string;
  title: string;
}

export const GameCard = ({ href, title }: Props) => {
  return (
    <a
      className="block rounded-lg p-[32px] text-[max(1.2em,2.4cqw)] bg-bg-main shadow-[0_2px_10px_0_#80aeae] no-underline text-inherit"
      href={href}
    >
      {title}
    </a>
  );
};
