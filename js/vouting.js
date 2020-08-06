const btnSend = document.querySelector('#send');

const radioCats = document.querySelector('#cats');
const radioDogs = document.querySelector('#dogs');
const radioParrots = document.querySelector('#parrots');

// отправляет POST запрос с пустым телом для голосования за конкретного питомца
const requestPost = (pet) => {
	fetch(`https://sf-pyw.mosyag.in/sse/vote/${pet}`,
	{
		method: 'POST',
		body: ''
	})
	.then(response => {
		if (!response.ok) {
			alert("Something is wrong. Try again!");
			location.reload();
		}
	})
};

// по клику на кнопку "send voute" посылается соответствующий запрос на сервер 
btnSend.addEventListener('click', () => {
	if (!radioCats.checked && !radioDogs.checked && !radioParrots.checked) {
		alert("Make your choice, please!");
		location.reload();
	}
	if (radioCats.checked) {
		requestPost('cats');
	};
	if (radioDogs.checked) {
		requestPost('dogs');
	};
	if (radioParrots.checked) {
		requestPost('parrots');
	};
	
	// небольшая задержка перед переходом на страницу статистики, чтобы
	// сервер успел обработать отправленный голос (иначе статистика открывается
	// еще без учета отправленного голоса)
	setTimeout(() => {location.href = "./stats.html";}, 500);
});