import { cn } from '~/utils';
import { MoveLeftButton } from './move-left-button';
import { MoveRightButton } from './move-right-button';

export const MoveButtons = () => {
  return (
    <div
      className={cn(
        // Layout & Position
        'z-game-ui absolute right-[var(--gutter)] bottom-[var(--gutter)] left-[var(--gutter)] [--gutter:calc(24/480*100cqw)]',
        // Alignment
        'flex justify-between'
      )}
    >
      <MoveLeftButton />
      <MoveRightButton />
    </div>
  );
};
