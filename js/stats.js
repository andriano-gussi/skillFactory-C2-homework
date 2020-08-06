const progressCats = document.querySelector('#cats');
const progressDogs = document.querySelector('#dogs');
const progressParrots = document.querySelector('#parrots');

//высчитывает процент голосов (allVoute - сумма голосов по всем питомцам; petVoute - кол-во голосов за питомца)
const calculatePercent = (allVoute, petVoute) => {
	return Math.round(petVoute * 100 / allVoute * 10) / 10;
};
//отрисовывает на странице прогрессбар (progressBarName - соответствующий элемент на странице;
//										percent - посчитанный ранее процент голосов;
//										petVoutes - количество голосов за питомца)
const showProgress = (progressBarName, percent, petVoutes) => {
	progressBarName.style.cssText = `width: ${percent}%;`
    progressBarName.textContent = `${percent}% (voutes: ${petVoutes})`;
};
// получает и обрабатывает данные статистики от сервера
const requestStats = () => {
	const header = new Headers({
		'Access-Control-Allow-Credentials': true, 
  		'Access-Control-Allow-Origin': '*'
	});

	const ES = new EventSource('https://sf-pyw.mosyag.in/sse/vote/stats', header);

	ES.onerror = error => {
  		ES.readyState ? console.error("Something is wrong!: ", error) : null;
	};

	ES.onmessage = message => {
		const result = JSON.parse(message.data);
		const allVoutes = result.cats + result.dogs + result.parrots;
	
		const catsPercent = calculatePercent(allVoutes, result.cats);
		const dogsPercent = calculatePercent(allVoutes, result.dogs);
		const parrotsPercent = calculatePercent(allVoutes, result.parrots);

		showProgress(progressCats, catsPercent, result.cats);
		showProgress(progressDogs, dogsPercent, result.dogs);
		showProgress(progressParrots, parrotsPercent, result.parrots);
	};
};

requestStats();