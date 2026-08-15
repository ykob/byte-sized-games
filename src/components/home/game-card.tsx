interface Props {
  href: string;
  title: string;
}

export const GameCard = ({ href, title }: Props) => {
  return (
    <a
      className="bg-bg-main block rounded-lg p-[32px] text-[max(1.2em,2.4cqw)] text-inherit no-underline shadow-[0_2px_10px_0_#80aeae]"
      href={href}
    >
      {title}
    </a>
  );
};
