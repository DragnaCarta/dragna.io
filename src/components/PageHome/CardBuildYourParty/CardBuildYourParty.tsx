import React from 'react';
import RadioGrid from '@/components/RadioGrid/RadioGrid';
import RefreshIcon from '@/components/RefreshIcon/RefreshIcon';
import PartyLevelOptions from '@/lib/PartyLevelOptions';
import PartySizeOptions from '@/lib/PartySizeOptions';

import styles from './CardBuildYourParty.module.css';

type CardBuildYourPartyProps = {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  partySize: number;
  setPartySize: (value: number) => void;
  partyAverageLevel: number;
  setPartyAverageLevel: (value: number) => void;
};

function CardBuildYourParty({
  isExpanded,
  partySize,
  setPartySize,
  partyAverageLevel,
  setPartyAverageLevel,
}: CardBuildYourPartyProps) {
  return (
    <>
      <div className={styles.cardTitleContainer}>
        <h2>Build Your Party</h2>

        <button
          className={styles.reset}
          onClick={() => {
            setPartyAverageLevel(0);
            setPartySize(0);
          }}
        >
          <RefreshIcon />
        </button>
      </div>

      <div className={`${styles.cardBody} ${styles.expanded}`}>
        <div style={{ margin: '0 1rem 1rem 1rem' }}>
          <RadioGrid
            label="Select the number of players in your party."
            options={PartySizeOptions}
            onChange={(value) => {
              setPartySize(value);
            }}
            selectedValue={partySize}
          />
        </div>
        <div style={{ margin: '1rem' }}>
          <RadioGrid
            label="Select your party's average level."
            options={PartyLevelOptions}
            onChange={(value) => {
              console.log('setting...', value);
              setPartyAverageLevel(value);
            }}
            selectedValue={partyAverageLevel}
          />
        </div>
      </div>
    </>
  );
}

export default CardBuildYourParty;
