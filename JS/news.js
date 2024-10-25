// Your API key for NewsData.io
const API_KEY = 'pub_5695608439e5f2b46d80ceb59517e6761da7a';

// Fetch disaster-related articles from NewsData.io
async function fetchNewsArticles() {
    const query = 'tornado OR earthquake OR cyclone OR landslide OR fire OR flood OR natural disaster OR disaster';
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodeURIComponent(query)}&country=in&language=en`;

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            displayNewsArticles(data.results);  // Use the correct property from the response
        } else {
            console.error('Failed to fetch articles:', response.status);
        }
    } catch (err) {
        console.error('Error in fetch:', err);
    }
}

// Function to truncate text to a specific length
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'; // Add ellipsis if truncated
    }
    return text;
}

// Display articles on the page
function displayNewsArticles(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';  // Clear existing articles

    if (articles && articles.length > 0) {
        articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            const imageUrl = article.image_url || '';  // Use image if available
            const truncatedDescription = truncateText(article.description || 'No description available', 150); // Limit to 150 characters

            newsItem.innerHTML = `
                <div class="news-image ${imageUrl ? '' : 'fallback'}">
                    ${imageUrl ? `<img src="${imageUrl}" alt="News Image">` : `<i class="fas fa-newspaper"></i>`}
                </div>
                <h4>${article.title}</h4>
                <p>${truncatedDescription}</p>
                <small class="date">${new Date(article.pubDate).toLocaleDateString()}</small>
                <a class="read-more" href="${article.link}" target="_blank">Read More</a>
            `;

            // Handle image loading errors
            const img = newsItem.querySelector('img');
            if (img) {
                img.onerror = function() {
                    img.style.display = 'none';
                    newsItem.querySelector('.news-image').classList.add('fallback');
                    newsItem.querySelector('.news-image').innerHTML = `<i class="fas fa-newspaper"></i>`;
                };
            }

            newsContainer.appendChild(newsItem);
        });
    } else {
        newsContainer.innerHTML = '<p>No relevant disaster-related news available at the moment.</p>';
    }
}

// Filter articles based on search input
function filterArticles() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const articles = document.querySelectorAll('.news-item');

    articles.forEach(article => {
        const title = article.querySelector('h4').textContent.toLowerCase();
        const body = article.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || body.includes(searchTerm)) {
            article.style.display = 'block'; // Show article
        } else {
            article.style.display = 'none'; // Hide article
        }
    });
}

// Fetch articles when the page loads
document.addEventListener('DOMContentLoaded', fetchNewsArticles);
