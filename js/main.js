// import {api} from "./api.js";
// import {store} from "./store.js";
// import {generateCard} from './components/cart.js';
// import {generateCatCardPopup} from './components/catViewPopup.js'
// import {generateCatEditPopup} from './components/catEditPopup.js'

const deleteCatFromLocalStorage = (catId) => {
	store.setItem(
		'cats',
		JSON.stringify(
			JSON.parse(store.getItem('cats')).filter((el) => el.id != catId) // загуглить и поиграться с filter
		)
	);
};

document
	.getElementsByClassName('content')[0]
	.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			// переписать на switch
			if (event.target.className === 'cat-card-view') {
				api.getCatById(event.target.value).then((res) => {
					openCatCardPopup(res);
				});
			} else if (event.target.className === 'cat-card-update') {
				api.getCatById(event.target.value).then((res) => {
					openCatEditPopup(res);
				});
			} else if (event.target.className === 'cat-card-delete') {
				api.deleteCat(event.target.value).then((res) => {
					deleteCatFromLocalStorage(event.target.value);
					showAllCats();
				});
			}
		}
	});

const openCatCardPopup = (cat) => {
	const content = document.getElementsByClassName('content')[0];
	content.insertAdjacentHTML('afterbegin', generateCatCardPopup(cat));

	let catPopup = document.querySelector('.popup-wrapper-cat-card');
	let closeCatPopup = document.querySelector('.popup-close-cat-card');
	closeCatPopup.addEventListener('click', () => {
		catPopup.remove();
	});
};

const openCatEditPopup = (cat) => {
	const content = document.getElementsByClassName('content')[0];
	content.insertAdjacentHTML('afterbegin', generateCatEditPopup(cat));

	let catPopup = document.querySelector('.popup-wrapper-cat-card');
	let closeCatPopups = document.querySelectorAll('.js-popup-close');
	closeCatPopups.forEach((btn)=>{
		btn.addEventListener('click', () => {
			catPopup.remove();
		});
	})
	const submitEditForm =  document.querySelector('.js-submit-edit');
	submitEditForm.addEventListener('submit', (ev) => {
		ev.preventDefault();
		const body= {
			id:ev.target['id-cats'].value,
			name: ev.target.name.value,
			rate: ev.target.rate.value,
			image: ev.target.img_link.value,
			description:ev.target.description.value,
			favorite: ev.target.favorite.checked,
			age: ev.target.age.value,
		}

		api.updateCat(body)
			.then(() => {
				catPopup.remove();
				showAllCats();
			});
	})
};
document.querySelector('.js-update-content').addEventListener('click', function (){
	showAllCats();
})
document.querySelector('.js-add-cat-popup').addEventListener('click', function (){
	const content = document.getElementsByClassName('content')[0];
	content.insertAdjacentHTML('afterbegin', generateCatEditPopup());
	let catPopup = document.querySelector('.popup-wrapper-cat-card');
	let closeCatPopups = document.querySelectorAll('.js-popup-close');
	closeCatPopups.forEach((btn)=>{
		btn.addEventListener('click', () => {
			catPopup.remove();
		});
	})
	const submitEditForm =  document.querySelector('.js-submit-add');
	submitEditForm.addEventListener('submit', (ev) => {
		ev.preventDefault();
		const ids = JSON.parse(store.getItem('cats')).map((cat) => cat.id);
		const id = getMaxOfArray(ids) +1;
		const body= {
			id,
			name: ev.target.name.value,
			rate: ev.target.rate.value,
			image: ev.target.img_link.value,
			description:ev.target.description.value,
			favorite: ev.target.favorite.checked,
			age: ev.target.age.value,
		}
		api.addCat(body)
			.then(() => {
				catPopup.remove();
				showAllCats();
			});
	})
});
function getMaxOfArray(numArray) {
	return Math.max.apply(null, numArray);
}

function showAllCats() {
	const content = document.getElementsByClassName('content')[0];
	content.innerHTML = '';
	api.getAllCats().then((res) => {
		store.setItem('cats', JSON.stringify(res)); // пополнение локального хранилища нашими котами
		const cards = res.reduce((acc, el) => (acc += generateCard(el)), '');
		content.insertAdjacentHTML('afterbegin', cards);

		let cards2 = document.getElementsByClassName('card');
		for (let i = 0, cnt = cards2.length; i < cnt; i++) {
			const width = cards2[i].offsetWidth;
			cards2[i].style.height = width * 0.6 + 'px';
		}
	});
}

showAllCats();

