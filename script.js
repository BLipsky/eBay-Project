async function getEbayListings() {
    try {
        const response = await fetch("http://localhost:4000/ebay-listings");  // Fetch from your own server
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        displayListings(data);
    } catch (error) {
        console.error("Error fetching eBay listings:", error);
        document.getElementById("listingsContainer").innerHTML = 
            "<p>Error loading listings. Try again later.</p>";
    }
}

function displayListings(items) {
    const listingsContainer = document.getElementById("listingsContainer");
    listingsContainer.innerHTML = items.length > 0 ? 
        items.map(item => `
            <div class="listing">
                <img src="${item.image?.imageUrl || 'placeholder.jpg'}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Price: ${item.price?.value} ${item.price?.currency}</p>
                <a href="${item.itemWebUrl}" target="_blank">View on eBay</a>
            </div>
        `).join('') 
        : "<p>No listings found.</p>";
}

document.addEventListener("DOMContentLoaded", getEbayListings);
