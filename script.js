
document.getElementById('country-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const countryName = document.getElementById('country-input').value.trim();
    if (countryName === '') return;

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) throw new Error('Country not found');
            return response.json();
        })
        .then(data => {
            const country = data[0];
            document.getElementById('country-name').textContent = country.name.common;
            document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'N/A';
            document.getElementById('population').textContent = country.population.toLocaleString();
            document.getElementById('region').textContent = country.region;
            document.getElementById('flag').src = country.flags.png;
            document.getElementById('flag').alt = `Flag of ${country.name.common}`;

            const bordersList = document.getElementById('borders-list');
            bordersList.innerHTML = '';

            if (country.borders) {
                country.borders.forEach(border => {
                    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then(res => res.json())
                        .then(borderData => {
                            const borderCountry = borderData[0];
                            const listItem = document.createElement('li');
                            listItem.innerHTML = `
                                ${borderCountry.name.common}
                                <img src="${borderCountry.flags.png}" alt="Flag of ${borderCountry.name.common}" width="30">
                            `;
                            bordersList.appendChild(listItem);
                        });
                });
            } else {
                bordersList.innerHTML = '<li>No bordering countries</li>';
            }
        })
        .catch(error => {
            document.getElementById('country-name').textContent = 'Error';
            document.getElementById('capital').textContent = '';
            document.getElementById('population').textContent = '';
            document.getElementById('region').textContent = '';
            document.getElementById('flag').src = '';
            document.getElementById('borders-list').innerHTML = '<li>Invalid country name</li>';
        });
});
