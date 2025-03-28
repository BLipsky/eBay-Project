document.addEventListener("DOMContentLoaded", getEbayListings);

async function getEbayListings() {
    try {
        const response = await fetch("http://localhost:4000/ebay-listings");  // ✅ Change to actual backend URL when deployed
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
document.addEventListener("DOMContentLoaded", function () {
    const ebayAPIUrl = `https://svcs.ebay.com/services/search/FindingService/v1?` +
      `OPERATION-NAME=findItemsAdvanced&` +
      `SERVICE-VERSION=1.0.0&` +
      `SECURITY-Benjamin-Listings-PRD-c8c29dfc0-2c28de8c&` + // Replace with your actual eBay App ID
      `RESPONSE-DATA-FORMAT=JSON&` +
      `REST-PAYLOAD&` +
      `sellername=Ritekite`; // Filter by your store
  
    function getEbayListings() {
      fetch(ebayAPIUrl)
        .then(response => response.json())
        .then(data => {
          const items = data.findItemsAdvancedResponse[0].searchResult[0].item;
          const listingsContainer = document.getElementById("ebay-listings");
  
          items.forEach(item => {
            const listing = document.createElement("div");
            listing.classList.add("listing");
  
            const title = document.createElement("h3");
            title.textContent = item.title[0];
            listing.appendChild(title);
  
            const price = document.createElement("p");
            price.textContent = `Price: $${item.sellingStatus[0].currentPrice[0].__value__}`;
            listing.appendChild(price);
  
            const image = document.createElement("img");
            image.src = item.galleryURL[0];
            image.alt = item.title[0];
            listing.appendChild(image);
  
            listingsContainer.appendChild(listing);
          });
        })
        .catch(error => {
          console.error("Error fetching eBay listings:", error);
        });
    }
  
    getEbayListings();
  });
  