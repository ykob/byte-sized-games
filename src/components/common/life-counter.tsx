import { css, cx } from 'styled-system/css';
import { LifeMarker } from './life-marker';

type Props = {
  className: string;
  current: number;
  max: number;
};

export const LifeCounter = ({ className, current, max }: Props) => {
  return (
    <div className={cx(styles.container, className)}>
      {[...Array(max)].map((_, index) => {
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
