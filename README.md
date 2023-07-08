# ChainCloud DApp

## Introduction

ChainCloud is a decentralized application (DApp) built on the blockchain using Solidity for smart contract development. It utilizes the Hardhat environment for contract deployment and testing, while the frontend is developed using the Next.js framework. The DApp integrates Moralis Provider and web3uikit for seamless interaction with the blockchain.

## Overview

ChainCloud provides a decentralized platform for users to upload their data onto the blockchain. It ensures data privacy and allows users to grant or revoke permission for other users to access their data. Additionally, users can view a list of individuals who have been granted access to their data.

To optimize gas costs, ChainCloud uses the IPFS (InterPlanetary File System) protocol to store the actual data. The DApp stores the IPFS URI on the blockchain, enabling efficient data storage while maintaining data integrity. Pinata, a pinning service, is employed for IPFS storage.

## Smart Contract Functions

### `upload`

This function allows users to upload their data to the blockchain. The data is stored using the IPFS protocol, and the URI of the data is saved on the blockchain. This approach reduces gas costs for users since storing the entire data directly on the blockchain would be more expensive.

### `PermsAllow`

Users can grant permission for other addresses to access their data by using the `PermsAllow` function. It maintains a dynamic array of users with their corresponding permissions, allowing users to grant access to multiple individuals.

### `PermsRevoke`

If a user wishes to revoke permission for a particular address to access their data, they can use the `PermsRevoke` function. This ensures that users have complete control over their data and can modify permissions as needed.

### `displayData`

The `displayData` function enables both the data owner and the users with permission to access and view the data stored on the blockchain. This ensures that authorized individuals can securely access the data shared with them.

### `showAccess`

The `showAccess` function allows users to view a list of individuals whom they have granted permission to access their data. This feature provides transparency and helps users keep track of who can access their data.

## Installation

To run the ChainCloud DApp locally, follow these steps:

### 1. Clone the repository

git clone https://github.com/Nilesh-Nath/ChainCloud.git

### 2. Install dependencies

yarn install

## Usage

To use ChainCloud DApp, follow these steps:

### 1. Start the local development server

yarn run dev

### 2. Access the DApp

Visit `http://localhost:3000` in your web browser to access the ChainCloud DApp.

### 3. Interact with the DApp

- Use the DApp to upload data securely onto the blockchain.
- Grant/revoke permissions for other users to access your data.
- Utilize the `displayData` function to access and view the data stored on the blockchain.
- Employ the `showAccess` function to view a list of individuals with permission to access your data.
