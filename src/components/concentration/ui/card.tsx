import { useAtomValue, useSetAtom } from 'jotai';
import { memo } from 'react';
import { css } from 'styled-system/css';
import { flipCardAtom, getCardPropsAtom } from '../stores';
import { CardBackside } from './card-backside';
import { CardFrontside } from './card-frontside';

type CardProps = {
  index: number;
};

const CardComponent = ({ index }: CardProps) => {
  const { id, flipped, number } = useAtomValue(getCardPropsAtom(index));
  const flipCard = useSetAtom(flipCardAtom);

  return (
    <button onClick={() => flipCard(id)}>
      <div className={styles.container}>
        <CardFrontside flipped={flipped} number={number} />
        <CardBackside flipped={flipped} />
      </div>
    </button>
  );
};

export const Card = memo(CardComponent);

const styles = {
  container: css({
    cursor: 'pointer',
    position: 'relative',
    aspectRatio: '480 / 746',
    perspective: '1000px',
  }),
};
