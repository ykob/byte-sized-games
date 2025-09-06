import { useAtomValue } from 'jotai';
import { getMolesAtom } from './store';

type MolesProps = {
  time: number;
};

export const Moles = ({ time }: MolesProps) => {
  const moles = useAtomValue(getMolesAtom);

  return (
    <div>
      {moles.map((mole) => {
        return (
          <div>
            show: {time > mole.time ? 'true' : 'false'} / hide:
            {time > mole.time + mole.visibleDuration ? 'true' : 'false'}
          </div>
        );
      })}
    </div>
  );
};
