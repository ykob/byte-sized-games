import { useAtomValue } from 'jotai';
import { getMolesAtom } from './store';

export const Moles = () => {
  const moles = useAtomValue(getMolesAtom);

  return (
    <div>
      {moles.map((mole) => {
        return (
          <div>
            time: {mole.time} / duration: {mole.visibleDuration} / position: {mole.position}
          </div>
        );
      })}
    </div>
  );
};
