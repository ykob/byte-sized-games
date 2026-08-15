import { useAtomValue, useSetAtom } from 'jotai';
import { useTimerValue } from '~/hooks/use-timer/store';
import { getMolesAtom, hitBadMoleAtom, hitGoodMoleAtom } from '../stores';
import { Mole } from './mole';

export const Moles = () => {
  const moles = useAtomValue(getMolesAtom);
  const time = useTimerValue();
  const hitBadMole = useSetAtom(hitBadMoleAtom);
  const hitGoodMole = useSetAtom(hitGoodMoleAtom);

  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-full max-w-[540px] bg-[#ccc]">
        {moles.map((mole, index) => {
          return (
            <Mole
              key={`mole-${mole.id}`}
              hide={time >= mole.time + mole.visibleDuration}
              hit={mole.hit}
              position={mole.position}
              show={time >= mole.time}
              type={mole.type}
              onClick={() => {
                if (mole.type === 'good') {
                  hitGoodMole(index);
                } else {
                  hitBadMole(index);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
