const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
var idenType
const idenSelector = document.getElementById('iden-selector')
const inputTypes = document.getElementById('input-types')

idenSelector.addEventListener('change', (event) => {
  const inputField = document.getElementById(event.target.value)
  idenType = event.target.value
  inputTypes.querySelectorAll('.usa-input').forEach(input => {
    input.setAttribute('disabled', true)
  })
  inputField.removeAttribute('disabled')
})

const deploy = async () => {
  // get form values
  const raw = await $.getJSON('/json/Registration.json')
  const abi = raw["abi"]
  const accounts = await web3.eth.getAccounts();
  const first_name = document.getElementById('first-name').value
  const middle_name = document.getElementById('middle-name').value
  const last_name = document.getElementById('last-name').value
  const dob = document.getElementById('dob').value
  const address = document.getElementById('mailing-address-1').value + ' ' + document.getElementById('mailing-address-2').value + ' ' + document.getElementById('city').value + ', '
  + document.getElementById('state').value + ' ' + document.getElementById('zip').value
  const party = document.getElementById('party').value 
  const ident = document.getElementById(idenType).value
  // hash sensitive identification information
  var hash = sha3_256.create();
  hash.update(ident)
  hash.update('30458340')
  const hashed_ident = hash.hex()
  const transaction_type = parseInt(document.getElementById('trans-type').value)
  const valid = (transaction_type === 0 || transaction_type === 1) ? true : false
  // push voter to blockchain
  // Contract address needs to be updated every call to migration
  // TODO: allow option for deleting voter or updating information
  await new web3.eth.Contract(abi, '0xD7DA4BE45e4DFC0Af1d3ccB288dC5EE9a33D0489')
    .methods
    .createVoter(
      valid,
      first_name + ' ' + middle_name + ' ' + last_name,
      dob,
      address,
      party,
      transaction_type,
      Date.now(),
      hashed_ident,
      idenType
      )
    .send({ 'from': accounts[0], 'gas': '1000000' });
  // store voter information in local database
  fetch('/', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "valid": valid,
        "first_name": first_name,
        "middle_name" : middle_name,
        "last_name": last_name,
        "dob": dob,
        "addr": address,
        "transaction_type": transaction_type,
        "time_stamp": Date.now(),
        "hashed_ident": ident,
        "ident_type": idenType
      }),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
      })
      .catch((error) => console.log(error));
    window.location.reload(true);
};
