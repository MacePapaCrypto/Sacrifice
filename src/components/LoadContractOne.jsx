import { useContractRead, useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import ccABI from '../contractABI/ccABI.json';
import '../styles/select.css'
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const LoadContractOne = (props) => {

    const toast = useToast;

    const ccOneContract = {
        addressOrName: '0xBcE593d80B889C5F89819bE4be80Bd8396AAdEA9',
        contractInterface: ccABI,
    }

    const trashcanAddress = '0x618943dcf871C947Eb7D7ecfF48f153ec7dEA49B';

    const { address, isConnecting, isDisconnected } = useAccount();

    const { data, error, isError, isSuccess } = useContractRead({
        ...ccOneContract,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, props.tokenToSearch],
        onSuccess(data) {
            console.log("C1", data);
        },
        onError(error) {
            console.log("C1", error);
        }
    });

    const { config, error: prepError } = usePrepareContractWrite({
        ...ccOneContract,
        functionName: 'transferFrom',
        args: [address, trashcanAddress, data.toString()],
        onError(prepError) {
            console.log("Error in prep 1: ", prepError);
            console.log("Address From: ", address);
            console.log("Address To: ", trashcanAddress);
            console.log("Token Id: ", props.tokenToSearch);
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
        isSuccess ?
        <>
            <p>{data.toString()}</p>
            <button onClick={() => write?.()}>Throw Away NFT</button>
        </> :
        isError ?
        <>
            <p>Error grabbing token id for index: {props.tokenToSearch}</p>
        </> :
        txError ?
        <>
            <p>Error loading the write function</p>
        </> :
        <></>
    );
}

export default LoadContractOne;