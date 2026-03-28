document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURATION ---
    // Official Helldivers 2 Steam News Feed URL
    const RSS_URL = 'https://store.steampowered.com/feeds/news/app/553850/';
    const FEED_CONTAINER = document.getElementById('rss-feed');

    // --- 2. FETCH UPDATES FUNCTION ---
    async function loadGameUpdates() {
        try {
            // We use rss2json.com to convert the XML feed to JSON and bypass CORS
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

            const response = await fetch(apiUrl);

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            // Clear the loading text
            FEED_CONTAINER.innerHTML = '';

            // Create a list for the items
            const list = document.createElement('ul');
            list.className = 'news-list';

            // Loop through the top 5 news items
            data.items.slice(0, 5).forEach(item => {
                const li = document.createElement('li');

                // Format the date nicely
                const dateObj = new Date(item.pubDate);
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                li.innerHTML = `
                    <span class="news-date">[${dateStr}]</span>
                    <a href="${item.link}" target="_blank" class="news-link">${item.title}</a>
                `;
                list.appendChild(li);
            });

            FEED_CONTAINER.appendChild(list);

        } catch (error) {
            console.error('Failed to load updates:', error);
            FEED_CONTAINER.innerHTML = `
                <div class="error-msg">
                    ⚠️ COMM LINK INTERRUPTED<br>
                    <small>Unable to reach Super Earth servers.</small>
                </div>
            `;
        }
    }

    // --- 3. INITIALIZE ---
    loadGameUpdates();
});