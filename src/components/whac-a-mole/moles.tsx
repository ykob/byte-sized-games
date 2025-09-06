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
    width: '100%',
    height: '100%',
  }),
  innerContainer: css({
    aspectRatio: '1 / 1',
    pos: 'relative',
    bgColor: '#ccc',
  }),
};
