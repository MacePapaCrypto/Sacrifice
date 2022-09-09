import '../styles/select.css';
import '../App.css';
import React, { useEffect, useState } from 'react';
import trashABI from '../contractABI/trashABI.json';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useToast } from '@chakra-ui/react';
import { Typography } from '@mui/material';

const UserClaimButton = () => {

    const toast = useToast();
    const [isPrepError, setPrepError] = useState(false);

    const trashContract = {
        addressOrName: "0x544F5e4a0187E84435adBb6D20997bc735B0792C",
        contractInterface: trashABI,
    }

    const { config, error: prepError } = usePrepareContractWrite({
        ...trashContract,
        functionName: 'payFrensCauseBroke',
        overrides: {
            value: 0
        },
        onError(prepError) {
            console.log("Error in prep 1: ", prepError.name);
            if(prepError.message) {
                setPrepError(true);
            }
        }
    });

    const {
        data: txData,
        isError: txError,
        isLoading: txLoading,
        isSuccess: txSuccess,
        write,
    } = useContractWrite(config);

    const { error: txHashErrorData, isError: txHashError, isLoading: txIsLoading, isSuccess: txIsSuccess } = useWaitForTransaction({
        hash: txData?.hash,
    });

    useEffect(() => {
        txIsLoading && toast({
            title: "Transaction Sent",
            description: txData?.hash,
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top",
        });

        txIsSuccess && toast({
            title: "Transaction Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        });

        txHashError && toast({
            title: "Transaction Failed",
            description: txHashErrorData,
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "top",
        });
    }, [txIsLoading, txIsSuccess, txHashError, toast, txHashErrorData, txData]);

    return(
        <div style={{width: "100%", justifyContent: "center", alignContent: "center"}}>
            {
                txIsLoading ? 
                <button disabled>...Claiming</button> :
                isPrepError ?
                <Typography variant="body1" color="white" gutterBottom>
                    
                </Typography> :
                <button onClick={() => write?.()}>Claim offering</button>
            }
        </div>
    )
}

export default UserClaimButton;