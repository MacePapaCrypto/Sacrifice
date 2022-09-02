import '../styles/select.css'
import LoadContractOne from './LoadContractOne';
import LoadContractTwo from './LoadContractTwo';
import React, { useEffect, useState } from 'react';

const DynamicTokenLoad = (props) => {
    
    let contractOneIndexes = [];
    let contractTwoIndexes = [];

    const makeObjectToMapForEachContract = () => {
        for(let i = 0; i < props.numberOfTokens[0]; i++) {
            contractOneIndexes[i] = i;
        }
        for(let i = 0; i < props.numberOfTokens[1]; i++) {
            contractTwoIndexes[i] = i;
        }
    }

    useEffect(() => {
        makeObjectToMapForEachContract();
    }, []);

    return(
        <div style={{display: "flex", justifyContent: "center", color: "white"}}>
            <div style={{display: "grid"}}>
                
                {contractOneIndexes.map((token) => {
                    console.log(token);
                    return (<LoadContractOne key={token.key} tokenToSearch={token}/>)
                })}
            </div>
            <div style={{display: "grid"}}>
                <LoadContractTwo tokenToSearch={contractTwoIndexes[0]}/>
                {contractTwoIndexes.map(token => {
                    return (<LoadContractTwo key={token.key} tokenToSearch={token}/>)
                })}
            </div>
        </div>
    );
}

export default DynamicTokenLoad;