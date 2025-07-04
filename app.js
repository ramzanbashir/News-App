let getDiv = document.getElementById("newscnt");
let form = document.getElementById("searchForm");
let input = document.getElementById("searchInput");

// Load default news
fetchNews("Palestine");

// Function to fetch news
function fetchNews(query) {
  getDiv.innerHTML = "<p>Loading news...</p>"; // show loading

  fetch(`
https://newsapi.org/v2/everything?q=${query}&from=2025-06-04&sortBy=publishedAt&apiKey=677c12de5f124b76a9e84f9ed365e436
`)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      getDiv.innerHTML = ""; // clear old news
      if (!data.articles.length) {
        getDiv.innerHTML = "<p>No news found.</p>";
        return;
      }

    // Clear existing content first
getDiv.innerHTML = '';

// Then populate with new content
data.articles.map(function (value) {
  getDiv.innerHTML += `
    <div class="card mb-3 position-relative" style="width: 18rem; min-height: 400px;">
      <img src="${value.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top mt-2" alt="News Image">
      <div class="card-body">
        <h5 class="card-title">${value.title}</h5>
        <p class="card-text">${value.description || 'No description available.'}</p>
      </div>
      <a href="${value.url}" target="_blank" class="btn btn-primary position-absolute start-0 bottom-0 m-2">Read More</a>
    </div>`;
});

    })
    .catch(function (error) {
      getDiv.innerHTML = "<p>Error loading news.</p>";
      console.log("Error fetching data:", error);
    });
}

// Form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop form from reloading page
  let searchValue = input.value.trim();
  if (searchValue !== "") {
    fetchNews(searchValue);
  }
});
