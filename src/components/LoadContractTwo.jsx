import { useContractRead, useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import ccABI from '../contractABI/ccABI.json';
import '../styles/select.css'
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const LoadContractTwo = (props) => {

    const toast = useToast;

    const ccTwoContract = {
        addressOrName: '0xD6647b1967c4495000a80B2912521F5e2C429A18',
        contractInterface: ccABI,
    }

    const trashcanAddress = '0x618943dcf871C947Eb7D7ecfF48f153ec7dEA49B';

    const { address, isConnecting, isDisconnected } = useAccount();

    const { data, error, isError, isSuccess } = useContractRead({
        ...ccTwoContract,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, props.tokenToSearch],
        onSuccess(data) {
            console.log("C2", data);
        },
        onError(error) {
            console.log("C2", error);
        }
    });

    const { config, error: prepError } = usePrepareContractWrite({
        ...ccTwoContract,
        functionName: 'transferFrom',
        args: [address, trashcanAddress, data.toString()],
        onError(prepError) {
            console.log("Error in prep 2: ", prepError);
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
        txLoading ?
        <>
            <p>Tx is loading I guess?</p>
        </> :
        <></>
    );
}

export default LoadContractTwo;