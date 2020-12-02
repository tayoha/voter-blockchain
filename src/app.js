const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
const transactionType = {
  CREATE: 0,
  UPDATE: 1,
  DELETE: 2
}

const identityType = {
  SSN: 'ssn',
  DL: 'dl',
  STATE_ID: 'state_id',
  RESIDENCY: 'residency'
}

// TODO: deploy should take arguments from the front-end, i.e. deploy(name, dob, ...)
const deploy = async () => {
  const raw = await $.getJSON('Registration.json')
  const abi = raw["abi"]
  const accounts = await web3.eth.getAccounts();
  const first_name = document.getElementById('first-name').value
  const middle_name = document.getElementById('middle-name').value
  const last_name = document.getElementById('last-name').value
  const dob = document.getElementById('dob').value
  const address = document.getElementById('mailing-address-1').value + ' ' + document.getElementById('mailing-address-2').value + ' ' + document.getElementById('city').value + ', '
  + document.getElementById('state').value + ' ' + document.getElementById('zip').value
  const party = document.getElementById('party').value 
  const ident = document.getElementById('ssn').value
  var hash = sha3_256.create();
  hash.update(ident)
  hash.update('30458340')
  const hashed_ident = hash.hex()
  // Contract address needs to be updated every call to migration
  await new web3.eth.Contract(abi, '0xD7DA4BE45e4DFC0Af1d3ccB288dC5EE9a33D0489')
    .methods
    .createVoter(
      true,
      first_name + ' ' + middle_name + ' ' + last_name,
      dob,
      address,
      party,
      transactionType.CREATE,
      Date.now(),
      hashed_ident,
      identityType.SSN
      )
    .send({ 'from': accounts[0], 'gas': '1000000' });
    window.location.reload(true);
};
