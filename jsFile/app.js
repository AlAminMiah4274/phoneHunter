const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display only 10 phone
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phone found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    // stop spinner or loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    // start spinner or loader
    toggleSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = '';
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// not the best way to show All
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

// loadPhones();