import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { Mole } from './mole';
import { getMolesAtom } from './store';

type MolesProps = {
  time: number;
};

export const Moles = ({ time }: MolesProps) => {
  const moles = useAtomValue(getMolesAtom);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {moles.map((mole) => {
          return (
            <Mole
              show={time >= mole.time}
              hide={time >= mole.time + mole.visibleDuration}
              position={mole.position}
              key={`mole-${mole.id}`}
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
    width: '100%',
    aspectRatio: '1 / 1',
    pos: 'relative',
    bgColor: '#ccc',
  }),
};
