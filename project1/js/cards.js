document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.card_collection .container');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        data.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('card');

            const image = document.createElement('img');
            image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Kawazu-zakura2.jpg/530px-Kawazu-zakura2.jpg';
            image.alt = 'Image';
            card.appendChild(image);

            const title = document.createElement('h3');
            title.textContent = post.title;
            card.appendChild(title);

            const description = document.createElement('p');
            description.textContent = post.body;
            card.appendChild(description);

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
