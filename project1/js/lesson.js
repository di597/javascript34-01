// Tab slider
const tabContents = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll ('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContents.forEach( (tabContent) => {
        tabContent.style.display = 'none'
    })
    tabItems.forEach((tabItem) => {
        tabItem.classList.remove ('tab_content_item_active')
    })

}
const showTabContent = (index = 0) => {
    tabContents[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
};

const switchTabAutomatically = () => {
    let currentIndex = 0
    
    const nextTab = () => {
        hideTabContent()
        currentIndex = (currentIndex + 1) % tabContents.length;
        showTabContent(currentIndex)
    }

   
    setInterval(nextTab, 3000)
}

hideTabContent()
showTabContent()
switchTabAutomatically()
tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent();
                showTabContent(tabIndex)
            }
        })
    }
}
//phone checker
const phoneInput = document.getElementById('phone_input');
const phoneButton = document.getElementById('phone_button');
const phoneResult = document.getElementById('phone_result');

phoneButton.addEventListener('click', () => {
    const phoneNumber = phoneInput.value.trim();

    if (isValidPhoneNumber(phoneNumber)) {
        phoneResult.textContent = 'Phone number is valid!';
        phoneResult.style.color = 'green';
    } else {
        phoneResult.textContent = 'Invalid phone number format';
        phoneResult.style.color = 'red';
    }
});

const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+996\d{9}$/;
    return phoneRegex.test(phoneNumber);
};

// converter
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const jpyInput = document.querySelector('#jpy');

const converter = (element, targetElement1, targetElement2, currentValue) => {
    element.oninput = () => {
        const inputValue = element.value;

        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
            switch (currentValue) {
                case 'som':
                    targetElement1.value = (inputValue / data.usd).toFixed(2);
                    targetElement2.value = (inputValue / data.jpy).toFixed(2);
                    break;
                case 'usd':
                    targetElement1.value = (inputValue * data.usd).toFixed(2);
                    targetElement2.value = (inputValue * data.usd / data.jpy).toFixed(2);
                    break;
                case 'jpy':
                    targetElement1.value = (inputValue * data.usd / data.jpy).toFixed(2);
                    targetElement2.value = (inputValue * data.eurInUsd).toFixed(2);
                    break;
                default:
                    break;
            }

            if (currentValue === 'som' && inputValue.trim() === '') {
                usdInput.value = '';
                jpyInput.value = '';
            }
        };
    };
};

converter(somInput, usdInput, jpyInput, 'som');
converter(usdInput, somInput, jpyInput, 'usd');
converter(jpyInput, somInput, usdInput, 'jpy');

//card switcher
const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 1;

const fetchData = async (count) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

btnNext.onclick = async () => {
    count = count % 200 + 1;
    const data = await fetchData(count);
    updateCard(data);
};

btnPrev.onclick = async () => {
    count = (count - 2 + 200) % 200 + 1;
    const data = await fetchData(count);
    updateCard(data);
};

const updateCard = (data) => {
    if (data) {
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `;
        card.style.borderColor = data.completed ? 'green' : 'red';
    }
};

fetchData(count);

//weather
const cityInput = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const searchButton = document.querySelector('#search');

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

const citySearch = () => {
    cityInput.oninput = async () => {
        const cityName = cityInput.value.trim();

        if (!cityName) {
            city.innerHTML = '';
            temp.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`);
            const data = await response.json();

            city.innerHTML = data.name || '';
            temp.innerHTML = data.main?.temp ? `${Math.round(data.main.temp - 273)} &deg;C` : '';
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
};

citySearch();

