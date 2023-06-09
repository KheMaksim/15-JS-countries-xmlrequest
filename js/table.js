const table = document.querySelector('.table');
loader.style.display = 'block';

request({
	method: 'GET',
	url: 'https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,subregion,flags,coatOfArms,population',
	success: (data) => {
		const сountry = JSON.parse(data);
		for (let i = 0; i < сountry.length; i++) {
			const row = document.createElement('tr');
			const numeration = document.createElement('td');
			row.classList.add('table__row');
			numeration.classList.add('table__numeration')
			numeration.innerHTML = i + 1;
			row.append(numeration);
			const countriesArr = [сountry[i].name.official, сountry[i].cca2, сountry[i].capital, сountry[i].region, сountry[i].subregion, сountry[i].population, `<img class='data__flag'  src='${сountry[i].flags.svg}' alt='flag'>`, `<img class='data__coat' src='${сountry[i].coatOfArms.svg}' alt='coat'>`];
			for (let j = 0; j < countriesArr.length; j++) {
				const col = document.createElement('td');
				col.classList.add('table__data')
				col.innerHTML = countriesArr[j];
				row.append(col);
			}
			table.append(row);
		}
		loader.style.display = 'none';
	},
	error: (errorType) => {
		console.error(errorType);
		loader.style.display = 'none';
	}
});