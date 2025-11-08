type IconProps = {
  path: string;
  size?: number;
};

export const Icon = ({ path, size = 1 }: IconProps) => {
  const width = 24 * size;

  return (
    <svg width={width} height={width} viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );
};
