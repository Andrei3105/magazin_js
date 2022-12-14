
document.addEventListener('DOMContentLoaded',  ()=>{
	
	//Tabs
	const tabs = document.querySelectorAll(".tabheader__item"),
	tabContent = document.querySelectorAll(".tabcontent"),
	tabParent = document.querySelector(".tabheader__items");

function hideTabsContents() {
	tabContent.forEach(items => {
		items.style.display = "none";
	})

	tabs.forEach(item => {
		item.classList.remove('tabheader__item_active');
	})
};

function showContent(i = 0) {
	tabContent[i].style.display = "block";
	tabs[i].classList.add('tabheader__item_active');

}

tabParent.addEventListener('click', (event) => {
	const target = event.target;
	if (target && target.classList.contains("tabheader__item")) {
		tabs.forEach((item, i) => {
			if (target == item) {
				hideTabsContents();
				showContent(i);
			}
		})
	}

})

hideTabsContents();
showContent();

// Timer

	const endDate = "2022-07-30";

	function valuesAllTimes(endDate){
		const t = Date.parse(endDate) - Date.parse(new Date());
		const seconsds = Math.floor((t/1000)%60),
			  minutes = Math.floor(t/(1000*60)%60),
			  hours = Math.floor((t/(1000*60*60))%24),
			  days = Math.floor((t/(1000*60*60*24)));
			  

			return {"t": t,
					'seconds': seconsds,
					'minutes': minutes,
					'hours': hours,
					'days':days,
			  }
	};
	
	function getZero(num){
		if(num>=0 && num < 10){
			return `0${num}`;
		}else{
			return num;
		}
	}
	function selectAllvalues(select, endDate){
		const wraper = document.querySelector(select),
			  seconds = wraper.querySelector('#seconds'),
			  minutes = wraper.querySelector('#minutes'),
			  hours = wraper.querySelector('#hours'),
			  days = wraper.querySelector('#days');
		let intervalChange = setInterval (changeElementsValues, 1000);
		changeElementsValues();
		function changeElementsValues(){
			  const t = valuesAllTimes(endDate);
			  seconds.innerHTML = getZero(t.seconds);
			  minutes.innerHTML = getZero(t.minutes);
			  hours.innerHTML = getZero(t.hours);
			  days.innerHTML = getZero(t.days);
			  if(t.t <=0){
				clearInterval(intervalChange);
			  }
		}		
	}
	selectAllvalues('.timer', endDate);


	//Modal
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		  modal = document.querySelector('.modal');
		
			function openModal(){
				modal.classList.add('show');
				modal.classList.remove('hide');
				// modal.classList.toggle('show');
				document.body.style.overflow = 'hidden';
			};

		  modalTrigger.forEach(btn=>{
			btn.addEventListener('click', openModal);

		  function closeModal (){
			modal.classList.add('hide');
			modal.classList.remove('show');
			// modal.classList.toggle('show');
			document.body.style.overflow = '';
		  };
		  
		  modal.addEventListener("click", (e)=>{
			if(e.target === "modal" || e.target.getAttribute('data-close') == '')
			{
				closeModal();
			}
		  });

		  document.addEventListener("keydown", (e)=>{
			if(e.code === "Escape" && modal.classList.contains('show'))
			{
				closeModal();
			}
		  });

		  const modalTimerId = setTimeout(openModal, 5000);

		// function showModalScroll(){
		// 	if(window.pageYOffset + document.documentElement.clientHeight >= 
		// 		documentElement.scrollHeight())
		// 	{
		// 		openModal();
		// 		window.removeEventListener("scrol", showModalScroll)
		// 	}
		// }

		//   window.addEventListener('scroll', showModalScroll)
		});


		//???????????????? ?? ?????????????? ???????????? ????????????????

		class MenuCard{
			constructor(src, alt, title, descr, price, parentSelector, ...classes){
				this.src = src;
				this.alt= alt;
				this.title = title;
				this.descr = descr;
				this.price = price;
				this.parent = document.querySelector(parentSelector);
				this.classes = classes;
				this.transfer = 27;
				this.changeToUAH();
			}

			changeToUAH(){
				this.price = this.price * this.transfer;
			}

			render(){
				const element = document.createElement('div');
				if(this.classes.length === 0 ){
					this.element = 'menu_item';
					element.classList.add(this.element);
				}else{
					this.classes.forEach(className=>element.classList.add(className));
				}
				element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                    </div>
				`;
				this.parent.append(element);
			}
		}

		new MenuCard(
			"img/tabs/vegy.jpg",
			"vegy",
			'???????? "????????????"',
			'???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!',
			9,
			".menu .container",
			"menu__item",
			"big"
		).render();

		//FORMS

		const forms =  document.querySelectorAll('form');
		
		const message = {
			loading : 'img/form/spinner.svg',
			success: '??????????????! ?????????? ???? ?? ???????? ????????????????',
			failure: '??????-???? ?????????? ???? ??????'
		}

		forms.forEach(item=>{
			postData(item);
		})

		function postData(form){
			form.addEventListener('submit', (element)=>{
				element.preventDefault();

				const statusMessage = document.createElement('img');
				statusMessage.src = message.loading;
				statusMessage.textContent = message.loading;
				statusMessage.style.cssText =`
					display: block;
					margin: 0 auto;
				`;
				form.insertAdjacentElement('afterend', statusMessage);

				const request = new XMLHttpRequest();
				request.open("POST", "server.php");
				/**
				 * ????-???? ???????? ?????? ???? ?????????????????? XMLHttpRequest ???????????????????? 
				 * ?? multipart/form-data ???? ???? ?????????? ???????????????????? ?? ?????????????????? ?????????? 
				 * ???????????? ???? ????????????????????
				 */
				// request.setRequestHeader("Content-type", "multipart/form-data");
				request.setRequestHeader("Content-type", "application/json");
				const formData = new FormData(form);

				const object = {};
				formData.forEach(function(value, key){
					object[key] = value;
				});

				const json = JSON.stringify(object);

				request.send (json);

				request.addEventListener("load", ()=>{
					if(request.status === 200){
						console.log(request.response);
						showThanksModal(message.success);
						form.reset();
						statusMessage.remove();
					}else{
						showThanksModal(message.failure);
					}
				})
			})
		};

		function showThanksModal(message){
			const prevModalDialog = document.querySelector('.modal__dialog');

			prevModalDialog.classList.add('hide');
			openModal();

			const thanksModal = document.createElement('div');
			thanksModal.classList.add('modal__dialog');
			thanksModal.innerHTML = `
				<div class="modal__content">
					<div data-close class="modal__close">&times;</div>
					<div class="modal__title">${message}</div>
				</div>
			`;

			document.querySelector('.modal').append(thanksModal);

			setTimeout(()=>{
				thanksModal.remove();
				prevModalDialog.classList.add('show');
				prevModalDialog.classList.remove('hide');
				closeModal();
			});
		}

		//????????
		const formData = new FormData(form);
		const json = JSON.stringify(Object.fromEntries(formData.entries()));
});
