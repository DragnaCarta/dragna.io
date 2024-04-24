'use client';
import clsx from 'clsx';
import { useId, useState } from 'react';
import Big from 'big.js';

import IconPlus from '../components/icons/IconPlus';
import { IconRefresh } from '../components/icons/IconRefresh';
import { Allies } from './_components/Allies';
import { Wave } from './_components/Wave';
import EncounterCalculator from './_lib/EncounterCalculator';
import { INITIAL_PARTY_LEVEL } from './_lib/PartyLevelOptions';
import { INITIAL_PARTY_SIZE } from './_lib/PartySizeOptions';

const _encounterCalculator = new EncounterCalculator();

const powerToTextColor = [
  { max: 20, label: 'text-red-100' },
  { max: 40, label: 'text-red-200' },
  { max: 60, label: 'text-red-300' },
  { max: 80, label: 'text-red-400' },
  { max: 100, label: 'text-red-500' },
  { max: 130, label: 'text-red-600' },
  { max: 170, label: 'text-red-700' },
  { max: 250, label: 'text-red-800' },
  { max: Infinity, label: 'text-red-900' },
];

const useEncounterCreator = () => {
  const id = useId();

  return {};
};

export default function Home({
  searchParams,
}: {
  searchParams:
    | {
        partySize?: string;
        partyAverageLevel?: string;
        allies?: string;
      }
    | undefined;
}) {
  const waveId = useId();

  const [waves, setWaves] = useState<{ [key: string]: number[] }>({
    [waveId]: [],
  });

  const [partySize, setPartySize] = useState(
    searchParams?.partySize !== undefined
      ? Number(searchParams?.partySize)
      : INITIAL_PARTY_SIZE
  );
  const [partyAverageLevel, setPartyAverageLevel] = useState(
    searchParams?.partyAverageLevel !== undefined
      ? Number(searchParams?.partyAverageLevel)
      : INITIAL_PARTY_LEVEL
  );

  const [allies, setAllies] = useState<number[]>([]);

  // useEffect(() => {
  //   // Update URL
  //   if (
  //     partySize > 0 ||
  //     partyAverageLevel > 0 ||
  //     enemies.length > 0 ||
  //     allies.length > 0
  //   ) {
  //     const { protocol, host, pathname } = window.location;
  //     const paramString = queryString.stringify(
  //       {
  //         partySize: partySize === 0 ? undefined : partySize,
  //         partyAverageLevel:
  //           partyAverageLevel === 0 ? undefined : partyAverageLevel,
  //         enemies,
  //         allies,
  //       },
  //       { arrayFormat: 'comma' }
  //     );

  //     const url = new URL(`${protocol}${host}${pathname}?${paramString}`);

  //     history.replaceState(null, '', url);
  //   } else {
  //     const { protocol, host, pathname } = window.location;
  //     const url = new URL(`${protocol}${host}${pathname}`);

  //     history.replaceState(null, '', url);
  //   }
  // }, [partySize, partyAverageLevel, enemies, allies]);

  // useEffect(() => {
  //   const search = searchParams;
  //   if (search) {
  //     const parsedAllies =
  //       search.allies !== undefined && !Array.isArray(search.allies)
  //         ? search.allies.split(',')
  //         : [];
  //     const parsedEnemies =
  //       search.enemies !== undefined && !Array.isArray(search.enemies)
  //         ? search.enemies.split(',')
  //         : [];

  //     let allies: number[] = [];
  //     let enemies: number[] = [];

  //     allies = parsedAllies
  //       .filter((cr): cr is string => typeof cr === 'string')
  //       .map((cr: string) => parseFloat(cr as string));

  //     enemies = parsedEnemies
  //       .filter((cr): cr is string => typeof cr === 'string')
  //       .map((cr: string) => parseFloat(cr as string));

  //     const queryParams = {
  //       enemies,
  //       allies,
  //     };

  //     setEnemies(queryParams.enemies);
  //     setAllies(queryParams.allies);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  function addCreature(challengeRating: number) {
    setAllies([...allies, challengeRating]);
  }

  const setWaveEnemies = (waveId: string, enemies: number[]) => {
    setWaves((waves) => ({ ...waves, [waveId]: enemies }));
  };

  const deleteWave = (waveId: string) => {
    setWaves((waves) => {
      return Object.keys(waves)
        .filter((currentWaveId) => waveId !== currentWaveId)
        .reduce((acc, key) => ({ ...acc, [key]: waves[key] }), {});
    });
  };

  const encounters = Object.values(waves)
    .map((enemies) => {
      return _encounterCalculator.recalculateDifficulty(
        partyAverageLevel,
        partySize,
        enemies,
        allies
      );
    })
    .reduce(
      (acc, encounter) => ({
        ...acc,
        hpLost: Big(acc.hpLost).plus(encounter.hpLost),
        resourcesSpent: Big(acc.resourcesSpent).plus(encounter.resourcesSpent),
      }),
      { hpLost: Big(0), resourcesSpent: Big(0) }
    );

  const difficultyLevels: {
    max: number;
    label: string;
  }[] = [
    { max: 20, label: 'Mild' },
    { max: 40, label: 'Bruising' },
    { max: 60, label: 'Bloody' },
    { max: 80, label: 'Brutal' },
    { max: 100, label: 'Oppressive' },
    { max: 130, label: 'Overwhelming' },
    { max: 170, label: 'Crushing' },
    { max: 250, label: 'Devastating' },
    { max: Infinity, label: 'Impossible' },
  ];
  const encounterDifficulty =
    difficultyLevels.find((level) => encounters.hpLost.toNumber() <= level.max)
      ?.label || 'Unknown';

  const textColor =
    powerToTextColor.find((ptc) => encounters.hpLost.toNumber() <= ptc.max)
      ?.label ?? 'text-neutral';

  return (
    <section className="max-w-screen-md mx-auto">
      <div className="p-4">
        <h1 className="text-3xl mt-6">Challenge Rated</h1>

        <p className="text-lg mt-4">
          An encounter-building tool for determining combat difficulty in
          Dungeons & Dragons 5th Edition Based on the Challenge Ratings 2.0
          system developed by DragnaCarta.
        </p>

        <aside className="mt-10">
          <section>
            <div className="flex gap-2 items-center">
              <h2>Your Encounter</h2>
              <button
                className="btn btn-square btn-sm"
                onClick={() => {
                  setWaves({ [waveId]: [] });
                  setAllies([]);
                  setPartyAverageLevel(INITIAL_PARTY_LEVEL);
                  setPartySize(INITIAL_PARTY_SIZE);
                }}
              >
                <IconRefresh />
              </button>
            </div>

            <div
              className="w-full mt-6 md:grid"
              style={{ gridTemplateColumns: '1fr auto 1fr' }}
            >
              <div className="card bg-neutral textarea-info p-4 flex flex-col shadow-lg">
                <Allies
                  allies={allies}
                  setAllies={setAllies}
                  partySize={partySize}
                  addCreature={addCreature}
                  setPartySize={setPartySize}
                  partyAverageLevel={partyAverageLevel}
                  setPartyAverageLevel={setPartyAverageLevel}
                />
              </div>

              <div className="divider divider-vertical md:divider-horizontal">
                VS
              </div>
              <div className="textarea-info flex flex-col justify-between  gap-6">
                {Object.keys(waves).map((waveId, index, array) => {
                  const wave = waves[waveId];
                  const canDelete = array.length > 1;

                  return (
                    <div
                      key={waveId}
                      className="flex flex-col justify-between card bg-neutral p-4 shadow-lg "
                    >
                      <h3
                        className={clsx(
                          'text-lg flex items-center gap-2 ',
                          canDelete &&
                            'hover:text-error hover:line-through hover:cursor-pointer'
                        )}
                        onClick={() => canDelete && deleteWave(waveId)}
                      >
                        Wave/Phase #{index + 1}
                      </h3>
                      <Wave
                        enemies={wave}
                        setEnemies={(ns) => setWaveEnemies(waveId, ns)}
                        addCreature={(n) =>
                          setWaveEnemies(waveId, [...wave, n])
                        }
                      />
                    </div>
                  );
                })}
                <button
                  className="btn btn-sm"
                  onClick={() =>
                    setWaves((waves) => ({
                      ...waves,
                      [waveId + Object.keys(waves).length + 1]: [],
                    }))
                  }
                >
                  Add New Wave/Phase
                  <IconPlus style={{ height: '1.2rem', width: '1.2rem' }} />
                </button>
              </div>
            </div>
          </section>

          <section className="mt-10 mb-4 shadow-xl">
            <div className="stats w-full hidden md:inline-grid">
              <div className="stat">
                <p className="stat-title inline-flex items-center gap-2">
                  Difficulty
                </p>

                <p className={clsx('stat-value', textColor)}>
                  {encounterDifficulty}
                </p>
              </div>

              <div className="stat">
                <p className="stat-title inline-flex items-center gap-2">
                  HP Loss
                </p>

                <p className={clsx('stat-value', textColor)}>
                  {Number.isNaN(encounters.hpLost.toNumber())
                    ? 0
                    : Math.round(encounters.hpLost.toNumber())}
                  %
                </p>
              </div>
              <div className="stat">
                <p className="stat-title inline-flex items-center gap-2">
                  Resources Spent
                </p>

                <p className={clsx('stat-value', textColor)}>
                  {Number.isNaN(encounters.resourcesSpent.toNumber())
                    ? 0
                    : Math.round(encounters.resourcesSpent.toNumber())}
                  %
                </p>
              </div>
            </div>

            <div className="join join-vertical w-full md:hidden">
              <div
                className="stat join-item bg-base-100 border-b border-base"
                style={{ borderBottomWidth: 1.5 }}
              >
                <p className="stat-title inline-flex items-center gap-2">
                  Difficulty
                </p>

                <p className={clsx('stat-value', textColor)}>
                  {encounterDifficulty}
                </p>
              </div>

              <div className="stats bg-base-100 join-item md:w-full border-base-content">
                <div className="stat">
                  <p className="stat-title inline-flex items-center gap-2">
                    HP Loss
                  </p>

                  <p className={clsx('stat-value', textColor)}>
                    {Number.isNaN(encounters.hpLost.toNumber())
                      ? 0
                      : Math.round(encounters.hpLost.toNumber())}
                    %
                  </p>
                </div>

                <div className="stat">
                  <p className="stat-title inline-flex items-center gap-2">
                    Resources Spent
                  </p>

                  <p className={clsx('stat-value', textColor)}>
                    {Number.isNaN(encounters.resourcesSpent.toNumber())
                      ? 0
                      : Math.round(encounters.resourcesSpent.toNumber())}
                    %
                  </p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
