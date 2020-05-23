pragma solidity ^0.6.6;

contract Patient {

    struct patientData {
        address id;
        string name;
        string contact;
        string email;
        uint fileCount;
        uint doctorCount;
    }

    struct fileData {
        string fileName;
        string fileHash;
        string datetime;
    }

    struct doctorData {
        address doctorAcc;
        string docName;
    }

    mapping (address => patientData) public patients;
    mapping (address => mapping (uint => fileData)) public files;
    mapping (address => mapping (uint => doctorData)) public doctors;

    constructor() public {}

    function addPatient(address _id, string memory _name, string memory _contact, string memory _email) public {
        patientData storage p = patients[msg.sender];
        p.id = _id;
        p.name = _name;
        p.contact = _contact;
        p.email = _email;
        p.fileCount = 0;
        p.doctorCount = 0;
    }

    function saveFile(string memory _fname, string memory _fhash, string memory _datetime) public {
        patientData storage p = patients[msg.sender];
        files[msg.sender][p.fileCount] = fileData(_fname, _fhash, _datetime);
        p.fileCount ++;
    }

    function saveDoctor(string memory _docName, address _doctorAcc) public {
        patientData storage p = patients[msg.sender];
        doctors[msg.sender][p.doctorCount] = doctorData(_doctorAcc, _docName);
        p.doctorCount ++;
    }

}