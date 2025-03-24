document.addEventListener("DOMContentLoaded", async function () {
    const listingsContainer = document.getElementById("listings");

    async function getEbayListings() {
        try {
            const response = await fetch("http://localhost:3000/ebay-listings");
            if (!response.ok) throw new Error("Failed to fetch listings");

            const data = await response.json();
            if (data.length === 0) {
                listingsContainer.innerHTML = "<p>No listings found.</p>";
                return;
            }

            listingsContainer.innerHTML = "";
            data.forEach(item => {
                const listingElement = document.createElement("div");
                listingElement.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>Price: ${item.price.value} ${item.price.currency}</p>
                    <img src="${item.image ? item.image.imageUrl : ''}" alt="${item.title}" width="150">
                    <p><a href="${item.itemWebUrl}" target="_blank">View on eBay</a></p>
                `;
                listingsContainer.appendChild(listingElement);
            });
        } catch (error) {
            console.error("Error fetching eBay listings:", error);
            listingsContainer.innerHTML = "<p>Error loading listings.</p>";
        }
    }

    getEbayListings();
});