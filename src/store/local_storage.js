function saveToken(token) {
	localStorage.setItem('shoe_store', JSON.stringify(token));
}

function getToken() {
	return JSON.parse(localStorage.getItem('shoe_store'));
}

function removeToken() {
	localStorage.removeItem('shoe_store');
}

function updateToken(data, type) {
	let cartItems = [];
	data.qtu = 1;
	const cartLocal = JSON.parse(localStorage.getItem('shoe_store'));
	// items in local storage
	if (cartLocal) {
		cartItems = cartLocal;
		const foundItem = cartItems.find(e => e.id === data.id);
		// item not in cart, add
		if (!foundItem) {
			cartItems = [data, ...cartItems]
		} else {
			// remove item
			if (type === 0) {
				const indx = cartItems.findIndex(v => v.id === data.id);
				cartItems.splice(indx, indx >= 0 ? 1 : 0);
				//cartItems.filter(item => item.id !== data.id);
				return cartItems;
			}
			// item in cart, update
			cartItems.find((i) => {
				if (i.id === foundItem.id) {
					type === 1 ? i.qtu++ : i.qtu > 1 ? i.qtu-- : '';
				}
			});
		}
	} else {
		// local storage was empty
		cartItems.push(data);
	}
	return cartItems;
}

export {
	saveToken,
	getToken,
	removeToken,
	updateToken
}