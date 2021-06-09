# Medi-Care <img src="https://pbs.twimg.com/profile_images/653586573/Logo_wc-2_400x400.png" height="30px" width="30px"/>

A decentralized web application using ReactJS, Flask, Solidity, IPFS and the Ethereum Blockchain to store and view all medical documents securely.

## About the D-App

<b>The app has 2 main users:</b>
1. Patient
2. Doctor

<b>Patients can:</b>
<ol>
<li> Upload a document to the blockchain. The document is added as a node in IPFS which returns a hash. The hash is then stored on the blockchain</li>
<li> View the uploaded documents.</li>
<li> Analyse the uploaded documents. The text from the document is extracted and <b>NER</b>(Named Entity Recognition) is performed on the text using <b>BNER</b>(Biomedical Named Entity recognition and multi-type Normalization.)</li>
<li> Analyse their reports to find keywords related to <b>Drugs</b> or <b>Diseases</b>.</li>
<li> Add a trusted doctor to view their medical documents.</li>
</ol>

<b>Doctors can:</b>
<ol>
<li> Upload a medical document about a certain patient to the blockchain.</li>
<li> View a certain patient's uploaded document.</li>
</ol>

## System Architecture

<a href="https://ibb.co/mCq4TDZ"><img src="https://i.ibb.co/6RPFwn9/diagram.jpg" alt="System Architecture" border="0"></a><br />

| Number      | Description |
| ----------- | ----------- |
| 1           | User scans and uploads a medical record.       |
| 2      | The record is then encrypted from the client side and sent to the Flask Server.        |
| 3, 4           | The Flask server sends this encrypted file to the IPFS network for storage. Once stored, it returs back a file hash.       |
| 5       | The file hash is then returned back to the client app.        |
| 6        | The hash is then stored securely on the Ethereum Blockchain        |
| 7          | The user can then choose to perform NER(Named-Entity-Recognition) on the data in the medical record. This is the make the user aware about the complex terms and data in the report. The record is sent to the Flask server.       |
| 8, 9        | The Flask server runs the BNER(Biomedical NER) model on the recieved data after performing OCR on the report to get the text from the scanned medical record PDF. The medical keywords are then passed back to the Flask server.        |
| 10 | The Flask server sends this data back to the client app and the client can view the keywords and click on it for more information |
| 11           | The doctor can view the medical record(s) of <b>ONLY his/her</b> patient.      |

## About the Ethereum Blockchain

<img src="https://ethereum.org/static/c3bcc8c47890ffd2a2c329972c73d0fd/31987/ethereum-logo-portrait-black-gray.png" height="210px" width="360px"/>

<b>Ethereum</b> is an open source, public, blockchain-based distributed computing platform and operating system featuring smart contract functionality.

## About the InterPlanetary File System(IPFS)

<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png" height="330px" width="360px"/>

The <b>InterPlanetary File System</b> is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

## Dependencies
<ul>
  <li>React.js</li>
  <li>Web3.js</li>
  <li>Ganache-cli</li>
  <li>Truffle</li>
  <li>Solidity</li>
  <li>Metamask</li>
  <li>Flask</li>
  <li>Ipfs</li>
  <li>Pytesseract</li>
</ul>


## Getting Started

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
## Working Demonstration

![](Readme_requirements/Medi-Care.gif)

## References

<a href="https://www.devteam.space/blog/how-can-blockchain-keep-medical-records-secure/">How Can Blockchain Keep Medical Records Secure?</a>

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT License Link](https://github.com/sherwyn11/Medi-Care/blob/master/LICENSE)

<br></br>
&copy; 2020 Sherwyn D'souza
