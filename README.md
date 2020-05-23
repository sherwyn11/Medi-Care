# Medi-Care &nbsp; <img src="https://pbs.twimg.com/profile_images/653586573/Logo_wc-2_400x400.png" height="30px" width="30px"/>

A decentralized web application using ReactJS, Flask, Solidity and the Ethereum Blockchain to store all medical documents securely

# About the Ethereum Blockchain

<img src="https://miro.medium.com/max/16000/1*AReX8uZOZKpGcvuUjogh0g.png" height="210px" width="360px"/>

<b>Ethereum</b> is an open source, public, blockchain-based distributed computing platform and operating system featuring smart contract functionality.

# About InterPlanetary File System(IPFS)

<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" height="330px" width="360px"/>

The <b>InterPlanetary File System</b> is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices

# About the D-App

<b>The E-Voting app has 2 main users:</b>
1. Patient 
2. Doctor

<b>Patients can:</b>
<ol>
<li> Upload a document to the blockchain. The document is added as a node in IPFS which returns a hash. The hash is then stored on the blockchain</li>
<li> View the uploaded documents</li>
<li> Analyse their reports to find keywords related to <b>Drugs</b> or <b>Diseases</b></li>
<li> Add a trusted doctor to view their medical documents</li>
</ol>

<b>Doctors can:</b>
<ol>
<li> Upload a document to the blockchain to a certain patient</li>
<li> View a certain patient's uploaded document</li>
</ol>

# Dependencies
<ul>
  <li>Node.js</li>
  <li>npm</li>
  <li>React.js</li>
  <li>Web3.js</li>
  <li>Ganache-cli</li>
  <li>Truffle</li>
  <li>Solidity</li>
  <li>MongoDB</li>
  <li>Metamask</li>
</ul>


# Getting Started

### To run React development server

```bash
cd blockchain
npm start
```

### To run Flask server
```bash
cd server
python app.py
```
# Working Demonstration
<br></br>

![](Readme_requirements/Medi-Care.gif)

# License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT License Link](https://github.com/sherwyn11/Medi-Care/blob/master/LICENSE)

<br></br>
© 2020 Sherwyn D'souza
