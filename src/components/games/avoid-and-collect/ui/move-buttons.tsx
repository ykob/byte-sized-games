import { MoveLeftButton } from './move-left-button';
import { MoveRightButton } from './move-right-button';

export const MoveButtons = () => {
  return (
    <div className="flex justify-between absolute [--gutter:calc(24/480*100cqw)] bottom-[var(--gutter)] left-[var(--gutter)] right-[var(--gutter)] z-game-ui">
      <MoveLeftButton />
      <MoveRightButton />
    </div>
  );
};
