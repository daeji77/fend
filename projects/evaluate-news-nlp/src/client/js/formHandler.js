async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const formText = document.getElementById('name').value
    Client.checkForName(formText)

    const formTextEncoded = encodeURIComponent(formText.trim());
    const res =
        await fetch(`/api/query_sentiment?text=${formTextEncoded}`);
    const data = await res.json();

    console.log(data);

    document.getElementById('results').innerHTML = data.sentiment;
}

function onBlur() {
}

export {
  handleSubmit,
  onBlur
}
