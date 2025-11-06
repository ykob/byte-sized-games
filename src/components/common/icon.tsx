type IconProps = {
  path: string;
};

export const Icon = ({ path }: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );
};
