import { FallingItem } from './falling-item';

export const FallingItems = () => {
  const fallingItemIndices = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div>
      {fallingItemIndices.map((index) => (
        <FallingItem key={index} index={index} />
      ))}
    </div>
  );
};
