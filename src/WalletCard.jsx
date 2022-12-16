import React, { useState } from 'react'
import { ethers } from 'ethers'
import { Box, Button, Typography } from '@mui/material';
import { formattedNum } from 'Helpers';
import useRate from 'Hooks/rate';

const WalletCard = ({ donatorAddressChangeHandler, handleDonatorBalance, errMessage }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [userBalanceUsd, setUserBalanceUsd] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const { rate } = useRate();

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				setButtonDisabled(true)
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});
		} else {
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const accountChangedHandler = (newAccount) => {
		donatorAddressChangeHandler(newAccount);
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			const usdBalance = formattedNum(rate * userBalance);
			setUserBalance(ethers.utils.formatEther(balance));
			setUserBalanceUsd(usdBalance);
			handleDonatorBalance(usdBalance);
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		window.location.reload();
	}

	window.ethereum?.on('accountsChanged', accountChangedHandler);
	window.ethereum?.on('chainChanged', chainChangedHandler);
	
	return (
		<Box my={4} gap={2} display='flex' flexDirection='column'>
			<Button
				variant="outlined"
				fullWidth={false}
				disabled={buttonDisabled}
				sx={{px: 5}}
				onClick={connectWalletHandler}
				>
					{connButtonText}
			</Button>
			<Typography>Address: {defaultAccount || 'none'}</Typography>
			<Typography>Balance: {userBalance || '0.0'} ({ userBalanceUsd || '0.0' } $)</Typography>
			<Typography variant='body1' color='MenuText'>{errorMessage || errMessage}</Typography>
		</Box>
	);
}

export default WalletCard;