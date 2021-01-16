let apiUrl = (code) => `https://ifsc.razorpay.com/${code}`;

let loader = getEle('loader');
let query = getEle('search');
let message = getEle('message');
let content = getEle('content');

// Get Bank details
async function getDetails() {
  try {
    message.innerText = '';
    loader.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    </div>
    <br>`;

    let req = await fetch(apiUrl(query.value));
    let res = await req.json();

    console.log(res);
    populateData(res);
    message.innerText = 'Please find the details below !!';
    setAttribute(message, 'class', 'text-success');
    loader.innerHTML = '';
    content.classList.add('visible');
    content.classList.remove('invisible');
  } catch (error) {
    loader.innerHTML = '';
    setAttribute(message, 'class', 'text-danger');
    message.innerText = 'Please enter a valid IFSC Code !!';
    content.classList.add('invisible');
    content.classList.remove('visible');
  }
}

function btnCheck() {
  let btn = document.getElementById('search-btn');

  if (query.value.length === 0) {
    setAttribute(btn, 'disabled', 'true');
  } else {
    btn.removeAttribute('disabled');
  }
}
function searchEvent(event) {
  event.preventDefault();
  getDetails();
}

function populateData(data) {
  let addr = getEle('addr');
  addr.innerText = data.ADDRESS;

  let bank = getEle('bank');
  bank.innerText = data.BANK;

  let bankCode = getEle('bankCode');
  bankCode.innerText = data.BANKCODE;

  let branch = getEle('branch');
  branch.innerText = data.BRANCH;

  let centre = getEle('centre');
  centre.innerText = data.CENTRE;

  let city = getEle('city');
  city.innerText = data.CITY;

  let contact = getEle('contact');
  contact.innerText = data.CONTACT;

  let district = getEle('district');
  district.innerText = data.DISTRICT;

  let ifsc = getEle('ifsc');
  ifsc.innerText = data.IFSC;

  let imps = getEle('imps');
  imps.innerHTML = data.IMPS === true ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>';

  let micr = getEle('micr');
  micr.innerText = data.MICR;

  let neft = getEle('neft');
  neft.innerHTML = data.NEFT === true ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>';

  let rtgs = getEle('rtgs');
  rtgs.innerHTML = data.RTGS === true ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>';

  let state = getEle('state');
  state.innerText = data.STATE;

  let upi = getEle('upi');
  upi.innerHTML = data.UPI === true ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>';
}
