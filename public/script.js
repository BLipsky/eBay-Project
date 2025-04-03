async function getEbayListings() {
    try {
      const response = await fetch("https://ebay-backend-w0r2.onrender.com/ebay-listings");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      displayListings(data);
    } catch (error) {
      console.error("Error fetching eBay listings:", error);
      document.getElementById("listingsContainer").innerHTML = 
          "<p>Error loading listings. Try again later.</p>";
    }
  }
  
  function displayListings(listings) {
    const container = document.getElementById("listingsContainer");
    container.innerHTML = ""; // Clear any previous listings
  
    listings.forEach(listing => {
      const listingElement = document.createElement("div");
      listingElement.classList.add("listing");
  
      listingElement.innerHTML = `
        <h3>${listing.title}</h3>
        <img src="${listing.imageUrl}" alt="${listing.title}" />
        <p>${listing.price.value} ${listing.price.currency}</p>
        <a href="${listing.itemWebUrl}" target="_blank">View Item</a>
      `;
      container.appendChild(listingElement);
      if (data.length === 0) {
        document.getElementById("listingsContainer").innerHTML = 
            "<p>No listings found. Please add items to your eBay inventory.</p>";
      } else {
        displayListings(data);
      }
      
    });
  }
  
  document.addEventListener("DOMContentLoaded", getEbayListings);
  