async function get_api_key() {
  console.log('calling');
  const res = await fetch('/api/get_key');
  const data = await res.json();
  return data.key;
};

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    const key = await get_api_key();

    console.log(`key: ${key}`);
    console.log("::: Form Submitted :::");

    // fetch('http://localhost:8080/test')
    fetch('https://api.meaningcloud.com/sentiment-2.1', {
      method: 'post',
      // credentials: 'same-origin',
      headers: {
          'content-type': 'application/json',
      },
      // body data type must match "content-type" header
      // body: json.stringify(data),

      // // api specific parameters
      // key: key,
      // lang: 'en',
      // txt: formtext,

      body: JSON.stringify({
        // api specific parameters
        key: key,
        lang: 'en',
        txt: formText,
      })
    })
    .then(res => res.json())
    .then(function(res) {
        document.getelementbyid('results').innerhtml = res.message
    })
}

function onBlur() {
}

export {
  handleSubmit,
  onBlur
}
