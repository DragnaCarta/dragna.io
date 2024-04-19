'use client';
import clsx from 'clsx';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
// import { Inter } from 'next/font/google'

import { CardBuildYourEncounter } from './_components/CardBuildYourEncounter';
import EncounterCalculator from './_lib/EncounterCalculator';
import { IconInfo } from '../components/IconInfo';

// const inter = Inter({ subsets: ['latin'] });
const _encounterCalculator = new EncounterCalculator();

// This gets called on every request
// export const getServerSideProps: GetServerSideProps = async (context) => {
//
// };

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

export default function Home({
  searchParams,
}: {
  searchParams:
    | {
        partySize?: number;
        partyAverageLevel?: number;
        enemies?: number[];
        allies?: number[];
      }
    | undefined;
}) {
  const [partySize, setPartySize] = useState(searchParams?.partySize ?? 0);
  const [partyAverageLevel, setPartyAverageLevel] = useState(
    searchParams?.partyAverageLevel ?? 0
  );

  const [enemies, setEnemies] = useState<number[]>([]);
  const [allies, setAllies] = useState<number[]>([]);

  useEffect(() => {
    // if(typeof window === 'undefined') return;

    // Update URL
    if (
      partySize > 0 ||
      partyAverageLevel > 0 ||
      enemies.length > 0 ||
      allies.length > 0
    ) {
      const { protocol, host, pathname } = window.location;
      const paramString = queryString.stringify(
        {
          partySize: partySize === 0 ? undefined : partySize,
          partyAverageLevel:
            partyAverageLevel === 0 ? undefined : partyAverageLevel,
          enemies,
          allies,
        },
        { arrayFormat: 'comma' }
      );

      const url = new URL(`${protocol}${host}${pathname}?${paramString}`);

      history.replaceState(null, '', url);
    } else {
      const { protocol, host, pathname } = window.location;
      const url = new URL(`${protocol}${host}${pathname}`);

      history.replaceState(null, '', url);
    }
  }, [partySize, partyAverageLevel, enemies, allies]);

  useEffect(() => {
    const search = searchParams;
    if (search) {
      const parsedAllies =
        search.allies !== undefined && !Array.isArray(search.allies)
          ? search.allies.split(',')
          : [];
      const parsedEnemies =
        search.enemies !== undefined && !Array.isArray(search.enemies)
          ? search.enemies.split(',')
          : [];

      let allies: number[] = [];
      let enemies: number[] = [];

      allies = parsedAllies
        .filter((cr): cr is string => typeof cr === 'string')
        .map((cr: string) => parseFloat(cr as string));

      enemies = parsedEnemies
        .filter((cr): cr is string => typeof cr === 'string')
        .map((cr: string) => parseFloat(cr as string));

      const queryParams = {
        partySize:
          search.partySize !== undefined ? Number(search.partySize) : 0,
        partyAverageLevel:
          search.partyAverageLevel !== undefined
            ? Number(search.partyAverageLevel)
            : 0,
        enemies,
        allies,
      };

      setPartySize(queryParams.partySize);
      setPartyAverageLevel(queryParams.partyAverageLevel);
      setEnemies(queryParams.enemies);
      setAllies(queryParams.allies);
    }
    // eslint-disable-next-line
  }, []);

  //
  const { hpLost, resourcesSpent, encounterDifficulty } =
    _encounterCalculator.recalculateDifficulty(
      partyAverageLevel,
      partySize,
      enemies,
      allies
    );

  function addCreature(challengeRating: number, creatureToggle: 0 | 1) {
    if (creatureToggle === 0) {
      setEnemies([...enemies, challengeRating]);
    } else {
      setAllies([...allies, challengeRating]);
    }
  }

  const textColor =
    powerToTextColor.find((ptc) => hpLost <= ptc.max)?.label ?? 'text-neutral';

  return (
    <>
      <main className="max-w-screen-xl mx-auto">
        <div className="p-4 flex gap-10">
          {/* <Banner /> */}
          <aside className="grow-0" style={{ minWidth: '24rem' }}>
            <section>
              <CardBuildYourEncounter
                partySize={partySize}
                setPartySize={setPartySize}
                partyAverageLevel={partyAverageLevel}
                setPartyAverageLevel={setPartyAverageLevel}
                addCreature={addCreature}
                enemies={enemies}
                setEnemies={setEnemies}
                allies={allies}
                setAllies={setAllies}
              />
            </section>

            <section className="mt-6 mb-4">
              <div className="join join-vertical w-full bg-neutral">
                <div className="stat border-b border-b-slate-800">
                  <p className="stat-title inline-flex items-center gap-2">
                    Difficulty{' '}
                    <div
                      className="tooltip"
                      data-tip={`We compare the estimated party and enemy strengths using a mathematical formula that accounts for "action economy," which allows us to predict approximately how many hit points your players will lose in this fight.`}
                    >
                      <IconInfo width={16} height={16} />
                    </div>
                  </p>
                  <p className={clsx('stat-value', textColor)}>
                    {encounterDifficulty}
                  </p>
                </div>
                <div className="join">
                  <div className="join-item stat">
                    <p className="stat-title inline-flex items-center gap-2">
                      HP Loss{' '}
                      <div
                        className="tooltip"
                        data-tip={`This is the approximate percentage of their total maximum hit points your players will likely lose in this battle. (Warning: This calculator does not account for tactics, terrain, or optimized builds that might make an encounter easier or harder.) `}
                      >
                        <IconInfo width={16} height={16} />
                      </div>
                    </p>
                    <p className={clsx('stat-value', textColor)}>
                      {Number.isNaN(hpLost) ? 0 : Math.round(hpLost)}%
                    </p>
                  </div>
                  <div className="join-item stat">
                    <p className="stat-title inline-flex items-center gap-2">
                      Resources Spent{' '}
                      <div
                        className="tooltip"
                        data-tip={`This is the approximate percentage of their daily spell slots, hit dice, magic item charges, and other expendable resources your players will likely spend during this encounter.`}
                      >
                        <IconInfo width={16} height={16} />
                      </div>
                    </p>
                    <p className={clsx('stat-value', textColor)}>
                      {Number.isNaN(resourcesSpent)
                        ? 0
                        : Math.round(resourcesSpent)}
                      %
                    </p>
                  </div>
                </div>
              </div>

              {/* <div tabIndex={0} className="collapse bg-base-200 mt-8">
                <div className="collapse-title text-xl font-medium">
                  Why use this calculator?
                </div>
                <div className="collapse-content prose max-w-full">
                  <p>
                    Boblin is a goblin. Boblin deals 5 points of damage per
                    round and has 7 hit points. If Boblin takes one full round
                    to kill, he deals 5 points of damage before dying.
                  </p>
                  <p>
                    Boblin&apos;s four best friends are also goblins, and call
                    themselves the Boblin Squad. Together, they deal 20 total
                    points of damage per round and have 28 total hit points. The
                    Boblin Squad survives for four full rounds and deals a total
                    of 80 damage before dying - sixteen times as much as Boblin.
                  </p>

                  <p>
                    The Boblin Squad is sixteen times as powerful as Boblin.
                    However, according to the official D&D encounter-building
                    math, Boblin is worth 50 XP and the Boblin Squad is worth
                    400 - only eight times as much.
                  </p>

                  <p>
                    This gets worse the more goblins we add. Imagine the Boblin
                    Squad becomes the Boblin Platoon, growing to include ten
                    goblins instead of four. The Boblin Platoon deals ten times
                    as much damage per round and survives ten times longer,
                    dealing one hundred times as much damage before dying.
                    However, according to the official D&D encounter-building
                    method, the Platoon is worth 1,250 XP - only twenty-five
                    times as much.
                  </p>
                  <p>
                    This is a problem because 5e uses enemy XP values to
                    determine the difficulty of encounters. If XP doesn&apos;t
                    reliably predict how strong a group of monsters is, we
                    can&apos;t use it to predict how difficult those monsters
                    will be to defeat in a fight.
                  </p>
                </div>
              </div> */}
            </section>
          </aside>

          <section className="grow">
            <h2 className="">How This Calculator Works</h2>
            <h4 className="text-md mt-4 mb-2">The Basics</h4>
            <p>
              The Challenge Rated calculator is built on the{' '}
              <a
                className="link"
                href="https://www.gmbinder.com/share/-N4m46K77hpMVnh7upYa"
                target="_blank"
                rel="noreferrer"
              >
                Challenge Ratings 2.0 (CR2.0) system
              </a>
              &nbsp; developed by{' '}
              <a
                className="link"
                href="https://www.patreon.com/DragnaCarta/posts"
                target="_blank"
                rel="noreferrer"
              >
                DragnaCarta
              </a>
              . To help you build balanced encounters, the calculator estimates
              how many hit points your players will lose in a given fight. To do
              this, the calculator compares your players&#39; expected offensive
              and defensive strength to their enemies&#39; expected offensive
              and defensive strength, then applies a formula to calculate the
              expected hit points lost.
            </p>
            <h4 className="text-md mt-4 mb-2">Under the hood</h4>
            <p>
              To calculate encounter difficulty (i.e., the approximate
              percentage of their summed maximum hit points that the players
              will need to spend to win), the calculator sums the “Power” of all
              player characters and allied NPCs and compares it to the summed
              “Power” of all enemy NPCs. (Here, “Power” is the square root of
              the effective hit points (EHP) and effective damage-per-round
              (EDPR) of a benchmarked character/NPC of that level/CR.)
            </p>
            <p>
              When comparing the total “Power” of an allied and enemy group,
              CR2.0 leverages the fact that the difficulty of a combat increases
              with the square of the number of enemies, rather than linearly.
              For example, because a group of four goblins has four times as
              many hit points and deals four times as much damage-per-round as a
              single goblin, that group of four goblins survives four times
              longer while dealing four times as much damage each round, dealing
              a cumulative sixteen times as much damage over the course of the
              combat. (This assumes, of course, that all goblins die
              approximately simultaneously. Early- and mid-combat enemy deaths,
              however, apply only a constant fractional multiplier to the enemy
              difficulty, allowing the CR2.0 algorithm to accurately approximate
              enemy difficulty within a reasonable degree of error.)
            </p>

            <aside className="border-2 border-warning bg-accent bg-opacity-10 p-4 rounded-xl mt-6">
              <p>
                The Challenge Rated calculator assumes a “white-room” scenario,
                in which all players and allied NPCs are fighting all enemy NPCs
                simultaneously, and assuming no tactics, advantages, or
                distractions. Moreover, natural variance in dice rolls can
                create broad ranges in possible encounter outcomes, even within
                a single standard deviation. While this calculator is a helpful
                tool for calibrating an encounter’s difficulty, it should be
                used in conjunction with a holistic review of any complex combat
                factors (e.g., combat conditions, environmental terrain, or
                additional objectives), as well as proper playtesting if
                feasible.
              </p>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}
