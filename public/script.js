async function getEbayListings() {
  try {
    const response = await fetch("http://localhost:4000/ebay-listings"); // Update the URL if needed
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

  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.classList.add("listing");

    listingElement.innerHTML = `
      <h3>${listing.title}</h3>
      <img src="${listing.imageUrl}" alt="${listing.title}" />
      <p>${listing.price} ${listing.currency}</p>
      <a href="${listing.itemWebUrl}" target="_blank">View Item</a>
    `;
    container.appendChild(listingElement);
  });

  if (listings.length === 0) {
    container.innerHTML = "<p>No listings found. Please add items to your eBay inventory.</p>";
  }
}

document.addEventListener("DOMContentLoaded", getEbayListings);