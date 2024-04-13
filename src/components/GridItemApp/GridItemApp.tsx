import React from 'react';
import styles from './GridItemApp.module.css';

function GridItemApp () {
    return (
        <a className="app" href="/iterm">
            <div className="icon">
                <img 
                    alt="iTerm" 
                    loading="lazy" 
                    width="200" 
                    height="200" 
                    decoding="async" 
                    data-nimg="1" 
                    src="/icons/used/pack-7/042-haunted house.svg" 
                    style={{color: 'transparent'}} 
                />
            </div>
                <div className="content">
                    <span className="title">iTerm</span>
                    <span className="views">359,069 views</span>
                </div>
        </a>
    );
}

export default GridItemApp;