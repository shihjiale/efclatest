document.addEventListener('DOMContentLoaded', function() {
  let themeButton = document.getElementById("theme-button");
  loadSignatures();
  if (themeButton) {
    themeButton.addEventListener("click", toggleDarkMode);
  }

  const form = document.getElementById('prayerRequests');
  if (form) {
    form.addEventListener('submit', printRequests);
  }

  // This seems to be your intent to correct the mismatched ID issue
  const signButton = document.getElementById('sign-now-button'); // Corrected ID as per your note
  if (signButton) {
    signButton.addEventListener('click', addSignature);
  }
});

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

const printRequests = (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  let name = document.getElementById('name').value;
  let request = document.getElementById('request').value;

  // Print the name and request to console
  console.log(name);
  console.log(request);
}

function addSignature(event) {
  event.preventDefault(); // Prevents form from submitting and refreshing the page

  const name = document.getElementById('name') ? document.getElementById('name').value : '';
  const hometown = document.getElementById('hometown') ? document.getElementById('hometown').value : '';
  const email = document.getElementById('email') ? document.getElementById('email').value : '';

  const newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

  const signaturesSection = document.getElementById('signatures');
  if (signaturesSection) {
    signaturesSection.appendChild(newSignature);
  }

  console.log(name, hometown, email);
  form.reset();
  saveSignatureToStorage(signatureText);
}
function saveSignatureToStorage(signatureText) {
  // Retrieve existing signatures from localStorage, if any
  const existingSignatures = JSON.parse(localStorage.getItem('signatures')) || [];
  existingSignatures.push(signatureText); // Add the new signature

  // Save back to localStorage
  localStorage.setItem('signatures', JSON.stringify(existingSignatures));
}

function loadSignatures() {
  const signatures = JSON.parse(localStorage.getItem('signatures')) || [];
  signatures.forEach(signatureText => {
    const signaturesSection = document.getElementById('signatures');
    const signature = document.createElement('p');
    signature.textContent = signatureText;
    signaturesSection.appendChild(signature);
  });
}
