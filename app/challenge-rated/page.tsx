'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import queryString from 'query-string';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';
// import { Inter } from 'next/font/google'

import EncounterCalculator from './_lib/EncounterCalculator';
import CardBuildYourParty from './_components/CardBuildYourParty';
import CardBuildYourEncounter from './_components/CardBuildYourEncounter';

import styles from './styles.module.css';

// const inter = Inter({ subsets: ['latin'] });
const _encounterCalculator = new EncounterCalculator();

// This gets called on every request
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const search = context.query;
//   const parsedAllies =
//     search.allies !== undefined && !Array.isArray(search.allies)
//       ? search.allies.split(',')
//       : [];
//   const parsedEnemies =
//     search.enemies !== undefined && !Array.isArray(search.enemies)
//       ? search.enemies.split(',')
//       : [];

//   let allies: number[] = [];
//   let enemies: number[] = [];

//   allies = parsedAllies
//     .filter((cr): cr is string => typeof cr === 'string')
//     .map((cr: string) => parseFloat(cr as string));

//   enemies = parsedEnemies
//     .filter((cr): cr is string => typeof cr === 'string')
//     .map((cr: string) => parseFloat(cr as string));

//   const queryParams = {
//     partySize: search.partySize !== undefined ? Number(search.partySize) : 0,
//     partyAverageLevel:
//       search.partyAverageLevel !== undefined
//         ? Number(search.partyAverageLevel)
//         : 0,
//     enemies,
//     allies,
//   };

//   return {
//     props: {
//       queryParams,
//       initialIsExpanded: !(
//         queryParams.partySize > 0 && queryParams.partyAverageLevel > 0
//       ),
//     },
//   };
// };

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
  const [creatureToggle, setCreatureToggle] = useState(0);
  const [enemies, setEnemies] = useState<number[]>(searchParams?.enemies ?? []);
  const [allies, setAllies] = useState<number[]>(searchParams?.allies ?? []);

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

  //
  const { hpLost, resourcesSpent, encounterDifficulty } =
    _encounterCalculator.recalculateDifficulty(
      partyAverageLevel,
      partySize,
      enemies,
      allies
    );

  function addCreature(challengeRating: number) {
    if (creatureToggle === 0) {
      setEnemies([...enemies, challengeRating]);
    } else {
      setAllies([...allies, challengeRating]);
    }
  }

  return (
    <>
      <main className="max-w-screen-md mx-auto">
        <div className="p-4">
          {/* <Banner /> */}

          <section>
            <CardBuildYourParty
              partySize={partySize}
              setPartySize={setPartySize}
              partyAverageLevel={partyAverageLevel}
              setPartyAverageLevel={setPartyAverageLevel}
            />
          </section>

          <section>
            <CardBuildYourEncounter
              addCreature={addCreature}
              creatureToggle={creatureToggle}
              setCreatureToggle={setCreatureToggle}
              enemies={enemies}
              setEnemies={setEnemies}
              allies={allies}
              setAllies={setAllies}
            />
          </section>

          <section>
            {/* <Drawer> */}
            {/* Card 3 - Encounter Summary */}
            <div className="m-4">
              <h2>Encounter Summary</h2>
            </div>
            <div className="flex flex-row flex-wrap">
              <div className="grow">
                <div className="m-4">
                  <p className="font-bold">Party:</p>
                  <p>
                    {partySize} PCs at Level {partyAverageLevel}
                  </p>
                </div>
                <div className="grow">
                  <p className="font-bold">Difficulty</p>
                  <p>{encounterDifficulty}</p>
                </div>
                <div className="m-4">
                  <p className="font-bold">HP Loss</p>
                  <p>
                    {Number.isNaN(hpLost) ? 0 : Math.round(hpLost)}% of the
                    party&#39;s combined maximum hit points
                  </p>
                </div>
                <div className="m-4">
                  <p className="font-bold">Resources Spent</p>
                  <p>
                    {Number.isNaN(resourcesSpent)
                      ? 0
                      : Math.round(resourcesSpent)}
                    % of the party&#39;s combined daily features and resources
                  </p>
                </div>
              </div>

              {/* Left */}
              <div className="grow">
                {/* <button>Start Over</button>
                    
                    <div>
                      <div>Share this encounter:</div>
                      <div style={{}}>
                        <input 
                          type="text" 
                          value={'https://dragna.io/challenge-rated?'} 
                        />
                        <button></button>
                        
                      </div>
                    </div> */}
              </div>
            </div>
            {/* </Drawer> */}

            <section className="mx-4">
              <h2 className="mt-9">How This Calculator Works</h2>
              <h4>The Basics</h4>
              <p>
                The Challenge Rated calculator is built on the{' '}
                <a
                  href="https://www.gmbinder.com/share/-N4m46K77hpMVnh7upYa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Challenge Ratings 2.0 (CR2.0) system
                </a>
                &nbsp; developed by{' '}
                <a
                  href="https://www.patreon.com/DragnaCarta/posts"
                  target="_blank"
                  rel="noreferrer"
                >
                  DragnaCarta
                </a>
                . To help you build balanced encounters, the calculator
                estimates how many hit points your players will lose in a given
                fight. To do this, the calculator compares your players&#39;
                expected offensive and defensive strength to their enemies&#39;
                expected offensive and defensive strength, then applies a
                formula to calculate the expected hit points lost.
              </p>
              <h4>Under the hood</h4>
              <p>
                To calculate encounter difficulty (i.e., the approximate
                percentage of their summed maximum hit points that the players
                will need to spend to win), the calculator sums the “Power” of
                all player characters and allied NPCs and compares it to the
                summed “Power” of all enemy NPCs. (Here, “Power” is the square
                root of the effective hit points (EHP) and effective
                damage-per-round (EDPR) of a benchmarked character/NPC of that
                level/CR.)
              </p>
              <p>
                When comparing the total “Power” of an allied and enemy group,
                CR2.0 leverages the fact that the difficulty of a combat
                increases with the square of the number of enemies, rather than
                linearly. For example, because a group of four goblins has four
                times as many hit points and deals four times as much
                damage-per-round as a single goblin, that group of four goblins
                survives four times longer while dealing four times as much
                damage each round, dealing a cumulative sixteen times as much
                damage over the course of the combat. (This assumes, of course,
                that all goblins die approximately simultaneously. Early- and
                mid-combat enemy deaths, however, apply only a constant
                fractional multiplier to the enemy difficulty, allowing the
                CR2.0 algorithm to accurately approximate enemy difficulty
                within a reasonable degree of error.)
              </p>

              <aside className={clsx(styles.callout, 'mt-6')}>
                <p>
                  The Challenge Rated calculator assumes a “white-room”
                  scenario, in which all players and allied NPCs are fighting
                  all enemy NPCs simultaneously, and assuming no tactics,
                  advantages, or distractions. Moreover, natural variance in
                  dice rolls can create broad ranges in possible encounter
                  outcomes, even within a single standard deviation. While this
                  calculator is a helpful tool for calibrating an encounter’s
                  difficulty, it should be used in conjunction with a holistic
                  review of any complex combat factors (e.g., combat conditions,
                  environmental terrain, or additional objectives), as well as
                  proper playtesting if feasible.
                </p>
              </aside>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}