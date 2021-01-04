/* Global Variables */
const api_key = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeatherData = async() => {
    const zip = document.getElementById('zip').value;

    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api_key}`;
    const res = await fetch(url);
    try {
        const data = await res.json();
        // console.log(data);
        const temp_kelvin = data['main']['temp'];
        const temp_fahrenheit = (temp_kelvin - 273.15) * 9 / 5 + 32 
        return temp_fahrenheit;
    } catch(error) {
        console.log('error', error);
    }
};

const postData = async(url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
      });

    try {
        const newData = await res.json();
        // console.log('new data: ', newData);
        return newData
    } catch(error) {
        console.log('error', error);
    }
}

const getAllData = async(url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        // console.log('get /all', data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

document.getElementById('generate').addEventListener('click', async() => {
    const temparature = await getWeatherData();

    const my_feeling = document.getElementById('feelings').value;
    await postData('/postData', {date: newDate, temp: temparature, feeling: my_feeling});
 
    const data = await getAllData('/all');

    document.getElementById('date').innerText = data['date'];
    document.getElementById('temp').innerText = data['temp'];
    document.getElementById('content').innerText = data['feeling'];
});
