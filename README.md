# Blockchain Calculator DApp

## Introduction

Welcome to the **Blockchain Calculator DApp**, a decentralized application that allows users to perform basic arithmetic operations on the Ethereum blockchain. This project showcases my expertise in blockchain development, smart contract implementation, and full-stack development. Users can connect their Ethereum wallets via MetaMask to interact with the smart contract for secure and transparent calculations.

## Features

- **Decentralized Arithmetic Operations**: Perform addition, subtraction, multiplication, and division on the Ethereum blockchain.
- **Smart Contracts**: Secure and transparent operations powered by Ethereum smart contracts.
- **MetaMask Integration**: Connect and authenticate users using MetaMask.
- **User-Friendly Interface**: An intuitive and responsive UI built with modern web technologies.

## Technology Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend
- **Next.js API Routes**: Serverless functions for handling backend logic.
- **Vercel**: A platform for hosting the Next.js application.

### Blockchain
- **Truffle Framework**: A development environment for Ethereum smart contracts.
- **Ganache**: A personal blockchain for Ethereum development.
- **Solidity**: The programming language for writing Ethereum smart contracts.
- **Web3.js**: A JavaScript library for interacting with the Ethereum blockchain.
- **MetaMask**: For Ethereum wallet and transaction management.

## Project Structure

### Smart Contract

The core of the Blockchain Calculator DApp is the `Calculator` smart contract. It includes key functionalities such as:
- **Add**: Adds two numbers and stores the result.
- **Subtract**: Subtracts the second number from the first and stores the result.
- **Multiply**: Multiplies two numbers and stores the result.
- **Divide**: Divides the first number by the second and stores the result, ensuring the divisor is not zero.

### Frontend Implementation

The frontend is built using React.js and Next.js, with Tailwind CSS for styling. It interacts with the smart contract to perform calculations and display the results.

### Key Components

1. **IndexPage**: The main React component where users perform arithmetic operations.
2. **Layout**: Defines the basic layout and metadata for the application.

## How to Run the Project

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/mrmartin1998/blockchain-calculator.git
    cd blockchain-calculator
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start Ganache** (Personal Ethereum Blockchain):
    ```sh
    ganache-cli
    ```

4. **Deploy Smart Contracts**:
    ```sh
    truffle migrate --network development
    ```

5. **Run the Application**:
    ```sh
    npm run dev
    ```

6. **Open in Browser**:
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Connect MetaMask**: Ensure MetaMask is set up with your local blockchain and has some test Ether.
2. **Perform Arithmetic Operations**: Use the UI to enter numbers and select operations. Confirm transactions in MetaMask to execute operations on the blockchain.
3. **View Results**: The result of the operation will be displayed on the UI.

## Conclusion

This project demonstrates my ability to develop a full-stack decentralized application using modern technologies. It showcases my skills in smart contract development, blockchain integration, and building responsive web applications. Thank you for reviewing my project!

---

*Feel free to reach out to me for any questions or further discussions about this project.*

---

**Contact Information:**

- **Email**: martinemilbrabenec@gmail.com
- **LinkedIn**: [Martin Emil Brabenec](https://www.linkedin.com/in/martin-emil-brabenec-33b818148/)
- **GitHub**: [mrmartin1998](https://github.com/mrmartin1998/)
