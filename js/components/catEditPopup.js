const generateCatEditPopup = (cat) => {
	return `<section class="popup-wrapper-cat-card active">
		<div class="popup active" id="popup-form">
			<h2 class="popup-title">${cat ? 'Изменить котика' : 'Добавить нового кота'}</h2>
			<button class="popup-close btn js-popup-close">
				<span class="visually-hidden">Закрыть.</span>
			</button>

			<form action="" class="${cat ? `js-submit-edit`:`js-submit-add`}">
			${cat ? `<div class="div1 form-container form-img"><label class="form-label" for="id-cats">ID</label>
								<input type="number" name="id-cats" placeholder="Номер кота" value="${cat?.id}" readonly/>
								</div>` : ''} 
				
			
				<div class="div2 form-container form-img">
					<label class="form-label" for="name">Имя</label>
					<input type="text" name="name" required placeholder="Имя" value="${cat?.name || ''}" />
				</div>
			
				<div class="div3 form-container form-img">
					<label class="form-label" for="img_link">Ссылка на изображение </label>
					<input type="text" name="img_link" placeholder="Ссылка на изображение" value="${cat?.image || ''}"/>
				</div>
			
			<div class="div4 form-container form-img">
				<label class="form-label" for="age">Возраст</label>
				<input type="number" name="age" placeholder="Возраст" value="${cat?.age || ''}" />
			</div>
			
			<div class="div4 form-container form-img">
				<label class="form-label" for="rate">Рейтинг</label>
				<input
				required
				type="number"
				name="rate"
				placeholder="Рейтинг (0-10)"
				min="0"
				max="10"
				value="${cat?.rate || ''}"
				/>
			</div>
			
			<label>Любимчик 
				<input type="checkbox" name="favorite" placeholder="" ${cat?.favorite ? `checked=checked` : ''}"/>
				${cat?.favorite ? `<i class="fa-solid fa-heart"></i>`: ''}
				</label>
			<div class="div4 form-container form-img">
				<label class="form-label" for="description">Описание котика</label>
				<textarea name="description" placeholder="Тут написано про котика">${cat?.description || ''}</textarea>
			</div>
			<button class="btn" type="submit">${cat ? `Редактировать` : `Добавить`}</button>  
	
			<button class="btn js-popup-close" type="reset">Закрыть</button>
			
			</form>
</div>
</section>`;
};
