async function getEbayListings() {
    try {
        const response = await fetch('http://localhost:3000/ebay-listings');
        const data = await response.json();
        displayListings(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayListings(data) {
    const listingsContainer = document.getElementById("listing");
    listingsContainer.innerHTML = ""; // Clear previous listings

    if (!data.itemSummaries) {
        listingsContainer.innerHTML = "<p>No listings found.</p>";
        return;
    }

    data.itemSummaries.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("listing");

        const itemImage = document.createElement("img");
        itemImage.src = item.image.imageUrl;
        itemElement.appendChild(itemImage);

        const itemTitle = document.createElement("h3");
        itemTitle.textContent = item.title;
        itemElement.appendChild(itemTitle);

        const itemPrice = document.createElement("p");
        itemPrice.textContent = `Price: $${item.price.value}`;
        itemElement.appendChild(itemPrice);

        const itemLink = document.createElement("a");
        itemLink.href = item.itemWebUrl;
        itemLink.textContent = "View Item";
        itemLink.target = "_blank";
        itemElement.appendChild(itemLink);

        listingsContainer.appendChild(itemElement);
    });
}
