const modal = document.querySelector('.modal')
const modalTriggerButton = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector ('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
modalTriggerButton.onclick = () => openModal()
modalCloseButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal){
        closeModal()
    }
}
const scrollHandler = () => {
    const isEndOfPage = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

    if (isEndOfPage) {
        openModal();
        window.removeEventListener('scroll', scrollHandler);
    }
};

window.addEventListener('scroll', scrollHandler);

setTimeout(() => {
     openModal();
 }, 10000);

//post data

const formElement = document.querySelector('form');

const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: data
    });
};

const fetchDataForPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(postsData => {
            console.log('Posts Data:', postsData);
        });
};

const bindPostData = (form) => {
    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const user = {};
        formData.forEach((item, index) => user[index] = item);
        const jsonUser = JSON.stringify(user);

        
        if (window.location.pathname === '/project/index.html') {
            postData('server.php', jsonUser);
        } else {
            postData('server.php', jsonUser);
        }

    
        fetchDataForPosts();
    };
};

bindPostData(formElement);
