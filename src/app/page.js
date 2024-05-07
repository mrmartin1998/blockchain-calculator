'use client'

import { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function Page() {
    const [web3, setWeb3] = useState(null);
    const [contractInstance, setContractInstance] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [operation, setOperation] = useState('');
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        async function initializeWeb3AndContract() {
            if (typeof window.ethereum !== 'undefined') {
                const web3 = new Web3(window.ethereum);
                setWeb3(web3);

                const accounts = await web3.eth.getAccounts();
                setAccounts(accounts);

                const abi = [
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
                const contractAddress = '0x95d3f055b36635908caD1b37Dd6019F6833c5954';
                const contractInstance = new web3.eth.Contract(abi, contractAddress);
                setContractInstance(contractInstance);

                console.log('Web3 and Contract Initialized');
            } else {
                console.error('MetaMask is not installed!');
            }
        }
        
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
            alert('Invalid operation');
            return;
        }

        const a = parseInt(values[0]);
        const b = parseInt(values[1]);

        if (!accounts || accounts.length === 0) {
            alert('No accounts found. Please ensure MetaMask is connected.');
            return;
        }

        try {
            let transaction;
            switch (operation) {
                case '+':
                    transaction = contractInstance.methods.add(a, b);
                    break;
                case '-':
                    transaction = contractInstance.methods.subtract(a, b);
                    break;
                case '*':
                    transaction = contractInstance.methods.multiply(a, b);
                    break;
                case '/':
                    transaction = contractInstance.methods.divide(a, b);
                    break;
                default:
                    alert('Invalid operation');
                    return;
            }

            console.log('Sending transaction...', { a, b, operation });
            const result = await transaction.send({ from: accounts[0] });
            console.log('Transaction result:', result);

            const updatedResult = await contractInstance.methods.result().call();
            console.log('Updated result from contract:', updatedResult);
            setDisplayValue(updatedResult.toString());
        } catch (error) {
            console.error('Error in executing contract method:', error);
            alert('An error occurred. Check the console for more details.');
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
}

