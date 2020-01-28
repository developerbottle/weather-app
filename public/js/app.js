const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = search.value;
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    messageOne.className = 'loading';
    messageTwo.className = '';
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
    
                messageOne.className = 'error';
                messageTwo.className = '';
                
                return;
            }
            
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            
            messageOne.className = 'success';
            messageTwo.className = '';
        });
    });
    
    weatherForm.reset();
});