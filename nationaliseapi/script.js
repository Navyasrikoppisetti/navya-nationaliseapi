const NATIONALISE_ENDPOINT = 'https://api.nationalize.io?name='

async function fetchData(name) {
  try {
      const response = await fetch(`${NATIONALISE_ENDPOINT}${name}`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      return;
  }
}

function highlightText(text, keyword) {
  const regex = new RegExp(keyword, 'gi');
  return text.replace(regex, match => `<mark>${match}</mark>`);
}

function displayResult(data, keyword) {
  const resultDropdown = document.getElementById('resultDropdown');
  resultDropdown.innerHTML = '';

  if (data && data.country.length>=2) {
      data.country.slice(0, 2).forEach(country => {
          const nationality = country.country_id;
          const probability = country.probability.toFixed(2);

          const nationalityText = highlightText(nationality, keyword);

          const option = document.createElement('option');
          option.textContent = `Nationality: ${nationalityText} (Probability: ${probability})`;

          resultDropdown.appendChild(option);
      });
  } else {
      const option = document.createElement('option');
      option.textContent = 'No results found.';
      resultDropdown.appendChild(option);
  }
}

function handleSearch() {
  const name = document.getElementById('name').value.trim();

  fetchData(name)
      .then(data => {
          const keyword = name || '';
          displayResult(data, keyword);
      });
}