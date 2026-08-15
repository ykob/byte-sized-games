import { MoveLeftButton } from './move-left-button';
import { MoveRightButton } from './move-right-button';

export const MoveButtons = () => {
  return (
    <div className="z-game-ui absolute right-[var(--gutter)] bottom-[var(--gutter)] left-[var(--gutter)] flex justify-between [--gutter:calc(24/480*100cqw)]">
      <MoveLeftButton />
      <MoveRightButton />
    </div>
  );
};
