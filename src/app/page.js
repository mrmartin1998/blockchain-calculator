'use client'

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const RockPaperScissorsABI = [
  {
    "inputs": [],
    "name": "result",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "a",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "a",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "subtract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "a",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "divide",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "a",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "multiply",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0x95d3f055b36635908caD1b37Dd6019F6833c5954";

const IndexPage = () => {
    const [web3, setWeb3] = useState(null);
    const [rockPaperScissorsContract, setRockPaperScissorsContract] = useState(null);
    const [displayValue, setDisplayValue] = useState('');
    const [operation, setOperation] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const initializeWeb3AndContract = async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    console.log("Connected to MetaMask");
                    const web3Instance = new Web3(window.ethereum);
                    const contractInstance = new web3Instance.eth.Contract(RockPaperScissorsABI, contractAddress);
                    console.log("Web3 and Contract Initialized");
                    setWeb3(web3Instance);
                    setRockPaperScissorsContract(contractInstance);
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccounts(accounts);
                } else {
                    throw new Error("MetaMask is not installed!");
                }
            } catch (error) {
                console.error("Error initializing Web3 and contract:", error);
            }
        };

        initializeWeb3AndContract();
    }, []);

    function addToDisplay(number) {
        setDisplayValue(prevValue => prevValue + number);
    }

    function clearDisplay() {
        setDisplayValue('');
    }

    function performOperation(op) {
        setOperation(op);
        addToDisplay(op);
    }

    async function calculate() {
        const values = displayValue.split(operation);

        if (values.length < 2) {
            console.error('Invalid operation');
            setDisplayValue('Invalid operation');
            return;
        }

        const a = parseInt(values[0]);
        const b = parseInt(values[1]);

        if (!accounts || accounts.length === 0) {
            console.error('No accounts found. Please ensure MetaMask is connected.');
            setDisplayValue('No accounts found. Please ensure MetaMask is connected.');
            return;
        }

        try {
            let transaction;
            switch (operation) {
                case '+':
                    transaction = rockPaperScissorsContract.methods.add(a, b);
                    break;
                case '-':
                    transaction = rockPaperScissorsContract.methods.subtract(a, b);
                    break;
                case '*':
                    transaction = rockPaperScissorsContract.methods.multiply(a, b);
                    break;
                case '/':
                    transaction = rockPaperScissorsContract.methods.divide(a, b);
                    break;
                default:
                    console.error('Invalid operation');
                    setDisplayValue('Invalid operation');
                    return;
            }

            console.log('Sending transaction...', { a, b, operation });
            const result = await transaction.send({ from: accounts[0] });
            console.log('Transaction result:', result);

            const updatedResult = await rockPaperScissorsContract.methods.result().call();
            console.log('Updated result from contract:', updatedResult);
            setDisplayValue(updatedResult.toString());
        } catch (error) {
            console.error('Error in executing contract method:', error);
            setDisplayValue('An error occurred. Check the console for more details.');
        }
    }

    return (
        <div className="calculator-container">
            <input
                type="text"
                id="display"
                className="calculator-input"
                value={displayValue}
                disabled
            />
            <table className="calculator-table">
                <tbody>
                    <tr>
                        <td><button className="calculator-button" onClick={() => addToDisplay('7')}>7</button></td>
                        <td><button className="calculator-button" onClick={() => addToDisplay('8')}>8</button></td>
                        <td><button className="calculator-button" onClick={() => addToDisplay('9')}>9</button></td>
                        <td><button className="calculator-button" onClick={() => performOperation('+')}>+</button></td>
                    </tr>
                    <tr>
                        <td><button className="calculator-button" onClick={() => addToDisplay('4')}>4</button></td>
                        <td><button className="calculator-button" onClick={() => addToDisplay('5')}>5</button></td>
                        <td><button className="calculator-button" onClick={() => addToDisplay('6')}>6</button></td>
                        <td><button className="calculator-button" onClick={() => performOperation('-')}>-</button></td>
                    </tr>
                    <tr>
                        <td><button className="calculator-button" onClick={() => addToDisplay('1')}>1</button></td>
                        <td><button className="calculator-button" onClick={() => addToDisplay('2')}>2</button></td>
                        <td><button className="calculator-button" onClick={() => addToDisplay('3')}>3</button></td>
                        <td><button className="calculator-button" onClick={() => performOperation('*')}>*</button></td>
                    </tr>
                    <tr>
                        <td><button className="calculator-button" onClick={() => addToDisplay('0')}>0</button></td>
                        <td><button className="calculator-button" onClick={clearDisplay}>C</button></td>
                        <td><button className="calculator-button" onClick={calculate}>=</button></td>
                        <td><button className="calculator-button" onClick={() => performOperation('/')}>/</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default IndexPage;
