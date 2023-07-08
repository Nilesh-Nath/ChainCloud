const abi = [
  {
    inputs: [],
    name: "ChainCloud__EmptyURL",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "perm",
        type: "bool",
      },
    ],
    name: "PermsGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "perm",
        type: "bool",
      },
    ],
    name: "PermsRevoked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "displayData",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "permsAllow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "permsRevoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "showAccess",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "bool",
            name: "access",
            type: "bool",
          },
        ],
        internalType: "struct ChainCloud.Access[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_url",
        type: "string",
      },
    ],
    name: "upload",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contractAddress = require("./contractAddress.json");

module.exports = {
  abi,
  contractAddress,
};
