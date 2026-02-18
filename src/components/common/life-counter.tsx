import { css, cx } from 'styled-system/css';
import { LifeMarker } from './life-marker';

type Props = {
  className?: string;
  current: number;
  max: number;
};

export const LifeCounter = ({ className, current, max }: Props) => {
  const displayMax = Math.min(max, 5);

  return (
    <div className={cx(styles.container, className)}>
      {[...Array(displayMax)].map((_, index) => {
        return <LifeMarker key={index} lost={index >= current} />;
      })}
    </div>
  );
};

const styles = {
  container: css({
    display: 'flex',
    gap: '4px',
  }),
};
