const form = document.querySelector('form');
const text = document.querySelector('#search__area');
const btn = document.querySelector('#search__btn');
const countryName = document.querySelector('#countryName');
const abbreviation = document.querySelector('#abbreviation');
const capital = document.querySelector('#capital');
const region = document.querySelector('#region');
const subregion = document.querySelector('#subregion');
const flag = document.querySelector('#info__flag');
const coat = document.querySelector('#info__coat');
const loader = document.querySelector('#preloader');


const request = (config) => {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', function () {
		if (this.status >= 200 && this.status <= 300) {
			config.success(this.responseText)
		}
		else {
			config.error(this.status);
		}
		xhr.addEventListener('error', function () {
			config.error('No internet connection!');
		});
		xhr.addEventListener('timeout', function () {
			config.error('Time is out.');
		});
	});
	xhr.open(config.method, config.url);
	xhr.send();
}

form.addEventListener('submit', function (e) {
	e.preventDefault();
	loader.style.display = 'block';
	request({
		method: 'GET',
		url: 'https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,subregion,flags,coatOfArms',
		success: (data) => {
			const сountry = JSON.parse(data);
			let found = false;
			for (let i = 0; i < сountry.length; i++) {
				if (сountry[i].name.official === text.value) {
					found = true;
					loader.style.display = 'none';
					countryName.innerText = сountry[i].name.official;
					abbreviation.innerText = сountry[i].cca2;
					capital.innerText = сountry[i].capital;
					region.innerText = сountry[i].region;
					subregion.innerText = сountry[i].subregion;
					flag.setAttribute('src', сountry[i].flags.svg);
					flag.style.display = 'inline-block';
					coat.setAttribute('src', сountry[i].coatOfArms.svg);
					coat.style.display = 'inline-block';
					break;
				}
			}
			if (found === false) {
				alert('Wrong country');
				loader.style.display = 'none';
			}
		},
		error: (errorType) => {
			console.error(errorType);
			loader.style.display = 'none';
		}
	})
});