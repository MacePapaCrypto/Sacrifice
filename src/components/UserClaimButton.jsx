import '../styles/select.css'
import React, { useEffect } from 'react';
import trashABI from '../contractABI/trashABI.json';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useToast } from '@chakra-ui/react';

const UserClaimButton = () => {

    const toast = useToast();

    const trashContract = {
        addressOrName: "0x5Dd273CaaEE902bbeE70114A357640806F3a4ece",
        contractInterface: trashABI,
    }

    const { config, error: prepError } = usePrepareContractWrite({
        ...trashContract,
        functionName: 'payFrensCauseBroke',
        overrides: {
            value: 0
        },
        onError(prepError) {
            console.log("Error in prep 1: ", prepError);
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
                txLoading ? 
                <button disabled>...Claiming</button> :
                <button onClick={() => write?.()}>Claim Monies</button>
            }
        </div>
    )
}

export default UserClaimButton;