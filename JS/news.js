// Your API key for NewsData.io
const API_KEY = 'pub_5695608439e5f2b46d80ceb59517e6761da7a';
const BASE_URL = 'https://newsdata.io/api/1/news';
let articles = [];
let currentArticleIndex = 0;
const articlesPerLoad = 10; // Load more articles at once

// Fetch disaster-related articles from NewsData.io
async function fetchNewsArticles() {
    const url = `${BASE_URL}?apikey=${API_KEY}&q=flood OR rain OR cyclone OR earthquake OR fire OR disaster OR natural disaster&country=in&language=en`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            articles = data.results;  // Store articles globally
            displayArticles();
            document.getElementById('load-more').style.display = articles.length > articlesPerLoad ? 'block' : 'none';
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (err) {
        console.error('Error fetching articles:', err);
        document.getElementById('news-container').innerHTML = `<p class="no-articles-message">Failed to load articles. Please try again later.</p>`;
    }
}

// Display articles on the page
function displayArticles() {
    const newsContainer = document.getElementById('news-container');
    const articlesToDisplay = articles.slice(currentArticleIndex, currentArticleIndex + articlesPerLoad);

    if (articlesToDisplay.length === 0 && currentArticleIndex === 0) {
        newsContainer.innerHTML = '<p class="no-articles-message">No articles available.</p>';
        return;
    }

    articlesToDisplay.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const imageUrl = article.image_url || '';
        const description = article.description || article.body || 'No description available';
        const truncatedBody = description.length > 100 ? description.substring(0, 100) + '...' : description;

        newsItem.innerHTML = `
            <div class="news-image ${imageUrl ? '' : 'fallback'}">
                ${imageUrl ? `<img src="${imageUrl}" alt="News Image">` : `<i class="fas fa-newspaper"></i>`}
            </div>
            <h4>${article.title || 'No Title'}</h4>
            <p>${truncatedBody}</p>
            <small class="date">${new Date(article.pubDate).toLocaleDateString()}</small>
            <a class="read-more" href="${article.link}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });

    currentArticleIndex += articlesPerLoad;
    document.getElementById('load-more').style.display = currentArticleIndex < articles.length ? 'block' : 'none';
}

// Load more articles when button is clicked
function loadMoreArticles() {
    displayArticles();
}

// Search function with debounce
let debounceTimeout;
function filterArticles() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase();

        if (searchTerm === '') {
            currentArticleIndex = 0;
            document.getElementById('news-container').innerHTML = '';
            displayArticles();
            return;
        }

        const filteredArticles = articles.filter(article =>
            (article.title && article.title.toLowerCase().includes(searchTerm)) ||
            (article.body && article.body.toLowerCase().includes(searchTerm)) ||
            (article.description && article.description.toLowerCase().includes(searchTerm))
        );

        currentArticleIndex = 0;
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';

        const articlesToDisplay = filteredArticles.slice(currentArticleIndex, currentArticleIndex + articlesPerLoad);
        articlesToDisplay.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            const imageUrl = article.image_url || '';
            const description = article.description || article.body || 'No description available';
            const truncatedBody = description.length > 100 ? description.substring(0, 100) + '...' : description;

            newsItem.innerHTML = `
                <div class="news-image ${imageUrl ? '' : 'fallback'}">
                    ${imageUrl ? `<img src="${imageUrl}" alt="News Image">` : `<i class="fas fa-newspaper"></i>`}
                </div>
                <h4>${article.title || 'No Title'}</h4>
                <p>${truncatedBody}</p>
                <small class="date">${new Date(article.pubDate).toLocaleDateString()}</small>
                <a class="read-more" href="${article.link}" target="_blank">Read More</a>
            `;
            newsContainer.appendChild(newsItem);
        });

        currentArticleIndex += articlesPerLoad;
        document.getElementById('load-more').style.display = currentArticleIndex < filteredArticles.length ? 'block' : 'none';
    }, 300);  // debounce delay of 300ms
}

// Initial article fetch and setup load more functionality
document.addEventListener('DOMContentLoaded', () => {
    fetchNewsArticles();
    document.getElementById('load-more').addEventListener('click', loadMoreArticles);
});
