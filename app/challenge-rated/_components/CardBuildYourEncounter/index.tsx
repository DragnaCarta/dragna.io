import IconPlus from '@/app/components/IconPlus';
import ChallengeRatingOptions from '../../_lib/ChallengeRatingOptions';
import PartyLevelOptions from '../../_lib/PartyLevelOptions';
import PartySizeOptions from '../../_lib/PartySizeOptions';
import { CreatureItem } from '../CreatureItem';
import RefreshIcon from '../RefreshIcon';
import { useState } from 'react';
import EncounterCalculator from '../../_lib/EncounterCalculator';
import { IconInfo } from '@/app/components/IconInfo';

type CardBuildYourEncounterProps = {
  partySize: number;
  setPartySize: (value: number) => void;
  partyAverageLevel: number;
  setPartyAverageLevel: (value: number) => void;

  addCreature: (value: number, toggle: 0 | 1) => void;
  enemies: number[];
  setEnemies: (value: number[]) => void;
  allies: number[];
  setAllies: (value: number[]) => void;
};

export function CardBuildYourEncounter({
  partySize,
  partyAverageLevel,
  setPartySize,
  setPartyAverageLevel,
  addCreature,
  enemies,
  setEnemies,
  allies,
  setAllies,
}: CardBuildYourEncounterProps) {
  function addAlly(challengeRating: number) {
    setAllies([...allies, challengeRating]);
  }

  function removeAlly(challengeRating: number) {
    const index = allies.indexOf(challengeRating);
    if (index > -1) {
      allies.splice(index, 1);
      setAllies([...allies]);
    }
  }

  function addEnemy(challengeRating: number) {
    setEnemies([...enemies, challengeRating]);
  }

  function removeEnemy(challengeRating: number) {
    const index = enemies.indexOf(challengeRating);

    if (index > -1) {
      enemies.splice(index, 1);
      setEnemies([...enemies]);
    }
  }

  //
  const enemyCrOccurrences = enemies.reduce(function (
    acc: Record<number, number>,
    curr
  ) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  },
  {});

  const allyCrOccurrences = allies.reduce(function (
    acc: Record<number, number>,
    curr
  ) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  },
  {});

  return (
    <>
      <div className="flex gap-2 items-center">
        <h2>Build Your Encounter</h2>
        <button
          className="btn btn-square btn-sm"
          onClick={() => {
            setEnemies([]);
            setAllies([]);
            setPartyAverageLevel(0);
            setPartySize(0);
          }}
        >
          <RefreshIcon />
        </button>
      </div>

      <div
        className="w-full mt-6"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        <div className="card bg-neutral p-4 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <label className="form-control">
              <select
                value={partySize}
                className="select select-sm"
                onChange={(event) => setPartySize(event.target.value)}
              >
                <option disabled>0</option>
                {PartySizeOptions.map((pso) => (
                  <option key={pso.displayText} value={pso.value}>
                    {pso.displayText}
                  </option>
                ))}
              </select>
            </label>
            <div className="inline-flex items-center">
              players&nbsp;
              <div
                className="tooltip"
                data-tip="We use pre-generated character benchmarks to estimate the strength of your party. "
              >
                <IconInfo width={16} height={16} />
              </div>
              &nbsp;of level&nbsp;
            </div>
            <label className="form-control">
              <select
                value={partyAverageLevel}
                className="select select-sm"
                onChange={(event) => setPartyAverageLevel(event.target.value)}
              >
                {PartyLevelOptions.map((pso) => (
                  <option key={pso.displayText} value={pso.value}>
                    {pso.displayText}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-2 my-4">
            {Object.keys(allyCrOccurrences)
              .map((x) => parseFloat(x))
              .sort(_numberSort)
              .map((cr) => {
                const crCount = allyCrOccurrences[cr];
                return (
                  <CreatureItem
                    key={cr}
                    challengeRating={cr}
                    count={crCount}
                    increaseCount={(cr) => addAlly(cr)}
                    decreaseCount={(cr) => removeAlly(cr)}
                  />
                );
              })}
          </div>

          <AddCreature
            addCreature={addCreature}
            creatureToggle={1}
            unit="Power"
          />
        </div>
        <div className="divider divider-vertical">VS</div>
        <div className="card bg-neutral textarea-info p-4 flex flex-col justify-between">
          <div className="flex flex-col gap-2 mb-4">
            {Object.keys(enemyCrOccurrences)
              .map((x) => parseFloat(x))
              .sort(_numberSort)
              .map((cr) => {
                const crCount = enemyCrOccurrences[cr];

                return (
                  <CreatureItem
                    key={cr}
                    challengeRating={cr}
                    count={crCount}
                    increaseCount={(cr) => addEnemy(cr)}
                    decreaseCount={(cr) => removeEnemy(cr)}
                  />
                );
              })}
          </div>

          <AddCreature
            addCreature={addCreature}
            creatureToggle={0}
            unit="Power"
          />
        </div>
      </div>
    </>
  );
}

function AddCreature({
  addCreature,
  creatureToggle,
  unit,
}: Pick<CardBuildYourEncounterProps, 'addCreature'> & {
  creatureToggle: 0 | 1;
  unit: string;
}) {
  const [creature, setCreature] = useState<string | undefined>(
    String(ChallengeRatingOptions[0].value)
  );

  return (
    <div className="form-control">
      <div className="join w-full flex">
        <div
          className="tooltip tooltip-accent"
          data-tip="We use the Monster Statistics by Challenge Ratings chart in the Dungeon Master's Guide to estimate the strength of NPCs and other creatures involved in the encounter."
        >
          <div
            className="btn btn-sm join-item cursor-default animate-none"
            tabIndex={-1}
          >
            {creatureToggle ? 'ALLY' : 'ENEMY'}{' '}
            <IconInfo width={16} height={16} />
          </div>
        </div>

        <select
          className="select select-sm join-item grow"
          value={creature}
          onChange={(event) => setCreature(event.target.value)}
        >
          {ChallengeRatingOptions.map((cr) => (
            <option
              key={cr.displayText}
              value={cr.value}
              selected={cr.value == creature}
            >
              CR {cr.displayText} &middot;{' '}
              {EncounterCalculator.CRPowerLookup[cr.value]} {unit}
            </option>
          ))}
        </select>
        <button
          className="btn btn-sm btn-square join-item"
          disabled={!creature}
          onClick={() => addCreature(Number(creature!), creatureToggle)}
        >
          <IconPlus />
        </button>
      </div>
    </div>
  );
}

function _numberSort(a: number, b: number) {
  return a - b;
}
