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

}

function CardBuildYourParty({ 
    isExpanded, 
    setIsExpanded,
    partySize,
    setPartySize,
    partyAverageLevel, 
    setPartyAverageLevel 
}: CardBuildYourPartyProps
    ) {

    return(
        <>
        <div className={styles.cardTitleContainer}>
            <div 
                className={`${styles.animateVisibility} ${isExpanded ? '' : styles.isCollapsed}`}
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'end'
                }}
                onClick={() => {
                    if(partyAverageLevel > 0 && partySize > 0) {
                        setPartyAverageLevel(0);
                        setPartySize(0);
                        setIsExpanded(!isExpanded);
                    }
                }}
            >
                <h2 className={isExpanded ? '' : styles.expandToggle}>Build Your Party</h2> 
                <div
                    className={`${styles.sometimesGhost} ${isExpanded ? styles.isInvisible : ''}`} 
                    style={{ marginLeft: '15px' }
                }>
                    <span 
                        className={`${styles.textDynamic} ${isExpanded ? '' : styles.expandToggle}`}
                    >
                        Reset?
                    </span>
                </div>
            </div>

            <div  
                className={`${styles.sometimesGhost} ${isExpanded ? styles.isInvisible : ''}`}
                style={{ fontSize: '16px', height: '28px', }}
            >
                <span className={styles.textDynamic}>{partySize}</span> Players at Level 
                {' '}<span className={styles.textDynamic}>{partyAverageLevel}</span>
            </div>
        </div>

        <div className={`${styles.cardBody} ${isExpanded ? styles.expanded : ''}`}>
            <div style={{ margin: '0 1rem 1rem 1rem' }}>
                <RadioGrid 
                    label="Select the number of players in your party."
                    options={PartySizeOptions}
                    onChange={(value) => {
                        setPartySize(value);
                        if(value > 0 && partyAverageLevel > 0) { setIsExpanded(false ); }
                    }}
                    selectedValue={partySize}
                />
            </div>
            <div style={{ margin: '1rem' }}>
                <RadioGrid 
                    label="Select your party's average level."
                    options={PartyLevelOptions}
                    onChange={(value) => {
                        console.log('setting...', value)
                        setPartyAverageLevel(value);
                        if(partySize > 0 && value > 0) { setIsExpanded(false ); }
                    }}
                    selectedValue={partyAverageLevel}
                />
            </div>
        </div>
    </>
  );
}

export default CardBuildYourParty;