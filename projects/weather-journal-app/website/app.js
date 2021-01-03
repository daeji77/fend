/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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
        console.log('new data: ', newData);
        return newData
    } catch(error) {
        console.log('error', error);
    }
}

const getData = async(url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log('get /all', data);
    } catch(error) {
        console.log('error', error);
    }
};

document.getElementById('generate').addEventListener('click', () => {
    postData('/postData', {a: '123', b: 'xyz'})
    .then(
        getData('/all')
    );
});
