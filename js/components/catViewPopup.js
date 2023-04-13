const generateCatCardPopup = (cat) => {
	return `<div class="popup-wrapper-cat-card active">
        <div class="popup-cat-card active">
        <div class="popup-close-cat-card btn"><i class="fa-solid fa-xmark"></i></div>
            <div class="${
							cat.favourite ? 'card like' : 'card'
						}" style="background-image: url(${
		cat.image || 'images/cat.png'
	})">
            <div>Имя котика: ${cat?.name}</div>
            <div>описание: ${cat.description}</div>
            <div>возраст: ${cat.age}</div>
            <div>рейтинг: ${cat.rate}</div>
        </div>
    </div>`;
};
