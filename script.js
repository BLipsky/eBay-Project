// Frontend JavaScript

const accessToken = "your_access_token";  // Replace with your actual eBay access token

const query = "laptop";  // Example query, change as needed

// eBay API URL
const url = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=5`;

// Fetch listings directly from eBay API
fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);  // Log the response to the console
    displayListings(data);  // Call the function to display the listings
})
.catch(error => {
    console.error('Error:', error);
});

// Function to display listings in HTML
function displayListings(data) {
    const listingsContainer = document.getElementById("listings");
    data.itemSummaries.forEach(item => {
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing");

        listingElement.innerHTML = `
            <h3><a href="${item.itemWebUrl}" target="_blank">${item.title}</a></h3>
            <p>Price: $${item.price.value}</p>
            <p>Condition: ${item.condition}</p>
            <img src="${item.image.imageUrl}" alt="${item.title}" />
        `;

        listingsContainer.appendChild(listingElement);
    });
}

// If you face CORS issues, use a proxy during development
const proxyUrl = "https://cors-anywhere.herokuapp.com/";  // Free CORS proxy (for development only)
const targetUrl = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=5`;

fetch(proxyUrl + targetUrl, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
    displayListings(data);  // Display the listings
})
.catch(error => console.error('Error:', error));
