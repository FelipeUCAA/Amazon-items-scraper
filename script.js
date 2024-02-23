//Scrape function
function scrapeAmazon() {
    var keyword = document.getElementById("keyword").value;
    if (!keyword) {
        alert("Please enter a keyword");
        return;
    }

   
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/scrape?keyword=" + keyword, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
           
            displayResults(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}
//Scrap display organization
function displayResults(results) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No products found</p>";
    } else {
        results.forEach(function (product) {
            var productDiv = document.createElement("div");
            productDiv.classList.add("product");

            var title = document.createElement("p");
            title.innerHTML = "<strong>Title:</strong> " + product.title;
            productDiv.appendChild(title);

            var rating = document.createElement("p");
            rating.innerHTML = "<strong>Rating:</strong> " + product.rating;
            productDiv.appendChild(rating);

            var numReviews = document.createElement("p");
            numReviews.innerHTML = "<strong>Number of reviews:</strong> " + product.numReviews;
            productDiv.appendChild(numReviews);

            var imgUrl = document.createElement("img");
            imgUrl.src = product.imgUrl;
            productDiv.appendChild(imgUrl);

            resultsDiv.appendChild(productDiv);
        });
    }
}
