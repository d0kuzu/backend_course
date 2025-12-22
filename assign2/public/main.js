const loadBtn = document.getElementById("loadUserBtn");

loadBtn.addEventListener("click", async () => {
    clearSections();

    try {
        const response = await fetch("localhost:3000/api/user");
        const data = await response.json();

        renderUser(data.user);
        renderCountry(data.country);
        renderExchange(data.exchangeRates);
        renderNews(data.news);

    } catch (error) {
        alert("Failed to load data");
        console.error(error);
    }
});

function clearSections() {
    document.getElementById("userSection").innerHTML = "";
    document.getElementById("countrySection").innerHTML = "";
    document.getElementById("exchangeSection").innerHTML = "";
    document.getElementById("newsSection").innerHTML = "";
}

/* ---------- RENDER FUNCTIONS ---------- */

function renderUser(user) {
    document.getElementById("userSection").innerHTML = `
        <h2>User Profile</h2>
        <img src="${user.picture}" alt="Profile Picture" />
        <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Date of Birth:</strong> ${user.dob}</p>
        <p><strong>Address:</strong> ${user.address}, ${user.city}</p>
        <p><strong>Country:</strong> ${user.country}</p>
    `;
}

function renderCountry(country) {
    document.getElementById("countrySection").innerHTML = `
        <h2>Country Information</h2>
        <img src="${country.flag}" alt="Flag" width="80" />
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Languages:</strong> ${country.languages.join(", ")}</p>
        <p><strong>Currency:</strong> ${country.currency}</p>
    `;
}

function renderExchange(rates) {
    document.getElementById("exchangeSection").innerHTML = `
        <h2>Exchange Rates</h2>
        <p>1 ${rates.base} = ${rates.USD} USD</p>
        <p>1 ${rates.base} = ${rates.KZT} KZT</p>
    `;
}

function renderNews(newsList) {
    const container = document.getElementById("newsSection");
    container.innerHTML = "<h2>Related News</h2>";

    newsList.forEach(news => {
        container.innerHTML += `
            <div class="news-card">
                ${news.image ? `<img src="${news.image}" />` : ""}
                <h3>${news.title}</h3>
                <p>${news.description || "No description available."}</p>
                <a href="${news.url}" target="_blank">Read more</a>
            </div>
        `;
    });
}
