import IconMinus from '@/app/components/IconMinus';
import IconPlus from '@/app/components/IconPlus';
import Fraction from 'fraction.js';
import EncounterCalculator from '../../_lib/EncounterCalculator';

type CreatureListItemProps = {
  challengeRating: number;
  count: number;
  increaseCount: (challengeRating: number) => void;
  decreaseCount: (challengeRating: number) => void;
};

export function CreatureItem({
  challengeRating,
  count,
  increaseCount,
  decreaseCount,
}: CreatureListItemProps) {
  const crDisplay = new Fraction(challengeRating).toFraction(true);

  return (
    <div
      className="grid justify-between gap-2"
      style={{ gridTemplateColumns: '1fr 0fr' }}
    >
      <p className="inline-flex items-center rounded-md grow">
        CR: {crDisplay} &middot;{' '}
        {EncounterCalculator.CRPowerLookup[challengeRating]} Power
      </p>
      <div className="items-center join grow-0 shrink">
        <button
          className="btn btn-sm btn-square btn-error join-item"
          onClick={() => decreaseCount(challengeRating)}
        >
          <IconMinus />
        </button>
        <button className="btn btn-sm join-item" tabIndex={-1}>
          {count}
        </button>
        <button
          className="btn btn-sm btn-square btn-success join-item"
          onClick={() => increaseCount(challengeRating)}
        >
          <IconPlus />
        </button>
      </div>
    </div>
  );
}
