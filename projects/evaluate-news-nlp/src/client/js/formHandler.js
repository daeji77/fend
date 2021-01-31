async function get_api_key() {
  console.log('calling');
  const res = await fetch('/api/get_key');
  const data = await res.json();
  return data.key;
};

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const formText = document.getElementById('name').value
    Client.checkForName(formText)

    const key = await get_api_key();

    console.log("::: Form Submitted :::");

    const formTextEncoded = encodeURIComponent(formText.trim());
    const url = 'https://api.meaningcloud.com/sentiment-2.1?' +
        `key=${key}&of=json&txt=${formTextEncoded}&lang=en`;
    console.log(url);

    fetch(url, {
      method: 'post',
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res);
        document.getElementById('results').innerHTML = res.subjectivity;
    })
}

function onBlur() {
}

export {
  handleSubmit,
  onBlur
}
