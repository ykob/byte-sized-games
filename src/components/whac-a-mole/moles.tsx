import { useAtomValue, useSetAtom } from 'jotai';
import { css } from 'styled-system/css';
import { Mole } from './mole';
import { getMolesAtom, hitBadMoleAtom, hitGoodMoleAtom } from './store';

type MolesProps = {
  time: number;
};

export const Moles = ({ time }: MolesProps) => {
  const moles = useAtomValue(getMolesAtom);
  const hitBadMole = useSetAtom(hitBadMoleAtom);
  const hitGoodMole = useSetAtom(hitGoodMoleAtom);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
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

const styles = {
  container: css({
    pos: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
  }),
  innerContainer: css({
    w: '100%',
    maxW: '540px',
    aspectRatio: '1 / 1',
    pos: 'relative',
    bgColor: '#ccc',
  }),
};
