// This is a very simple ECMA 6 (JS) class. It can only be imported into other files using the script tag. Using the common.js library allows you to 
// import and export classes like this into other classes similar to Ember and Angular. 

class Stock {
	constructor() {

	}

	Search(searchQuery) {
		let constants = new Constants();
		let url = constants.apiPathStockSearch + `/${searchQuery}/${constants.userID}`;
		return new Promise(
			(resolve, reject) => {
				const request = new XMLHttpRequest();
				Object.assign(request, {
					onload() {
						if (this.status === 200) {
							var res = this.response;
							var resObj = JSON.parse(res);

							if (resObj === 'fail') {
								$("#status").html("Invalid Symbol or not found");
								setTimeout(function () { $("#status").html("") }, 5000); // clear message after 5 secs								
							} else {
								resolve(resObj);
							}

						} else {
							reject(new Error(this.statusText));
						}
					},
					onerror() {
						reject(new Error(
							'XMLHttpRequest Error: ' + this.statusText));
					}
				});
				request.open('GET', url);
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				request.send();
			});
	}

	AddFavorite(stockFavoriteModel) {
		let constants = new Constants();
		let url = constants.apiPathStockAddFavorite;
		return new Promise(
			(resolve, reject) => {
				const request = new XMLHttpRequest();
				Object.assign(request, {
					onload() {
						if (this.status === 200) {
							var res = this.response;
							var resObj = JSON.parse(res);

							if (resObj === 'fail') {
								$("#status").html("Invalid Symbol or not found");
								setTimeout(function () { $("#status").html("") }, 5000); // clear message after 5 secs
							} else {
								resolve(resObj);
							}

						} else {
							reject(new Error(this.statusText));
						}
					},
					onerror() {
						reject(new Error(
							'XMLHttpRequest Error: ' + this.statusText));
					}
				});
				request.open('POST', url);
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				request.send(JSON.stringify(stockFavoriteModel));
			});
	}

	EditFavorite(stockFavoriteModel) {
		let constants = new Constants();
		let url = constants.apiPathStockEditFavorite;
		return new Promise(
			(resolve, reject) => {
				const request = new XMLHttpRequest();
				Object.assign(request, {
					onload() {
						if (this.status === 200) {
							var res = this.response;
							var resObj = JSON.parse(res);

							if (resObj === 'fail') {
								$("#status").html("Invalid Symbol or not found");
								setTimeout(function () { $("#status").html("") }, 5000); // clear message after 5 secs
							} else {							
								resolve(resObj);
							}

						} else {
							reject(new Error(this.statusText));
						}
					},
					onerror() {
						reject(new Error(
							'XMLHttpRequest Error: ' + this.statusText));
					}
				});
				request.open('POST', url);
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				request.send(JSON.stringify(stockFavoriteModel));
			});
	}

	RemoveFavorite(stockFavoriteModel) {
		let constants = new Constants();
		let url = constants.apiPathStockRemoveFavorite;
		return new Promise(
			(resolve, reject) => {
				const request = new XMLHttpRequest();
				Object.assign(request, {
					onload() {
						if (this.status === 200) {
							var res = this.response;
							var resObj = JSON.parse(res);

							if (resObj === 'fail') {
								$("#status").html("Unable to Remove favorite at this time.");
								setTimeout(function () { $("#status").html("") }, 5000); // clear message after 5 secs
							} else {							
								resolve(resObj);
							}

						} else {
							reject(new Error(this.statusText));
						}
					},
					onerror() {
						reject(new Error(
							'XMLHttpRequest Error: ' + this.statusText));
					}
				});
				request.open('POST', url);
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				request.send(JSON.stringify(stockFavoriteModel));
			});
	}	

	ListFavorites() {
		let constants = new Constants();
		let url = constants.apiPathStockListFavorites + `/${constants.userID}`;
		return new Promise(
			(resolve, reject) => {
				const request = new XMLHttpRequest();
				Object.assign(request, {
					onload() {
						if (this.status === 200) {
							var res = this.response;
							var resObj = JSON.parse(res);

							if (resObj === 'fail') {
								$("#status").html("There was an error retrieving favorites.");
								setTimeout(function () { $("#status").html("") }, 5000); // clear message after 5 secs
							} else {
								resolve(resObj);
							}

						} else {
							reject(new Error(this.statusText));
						}
					},
					onerror() {
						reject(new Error(
							'XMLHttpRequest Error: ' + this.statusText));
					}
				});
				request.open('GET', url);
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				request.send();
			});
	}

	GetFavorite(stockSymbol) {
		let constants = new Constants();
		let url = constants.apiPathStockGetFavorite + `/${constants.userID}/${stockSymbol}`;
		return new Promise(
			(resolve, reject) => {
				const request = new XMLHttpRequest();
				Object.assign(request, {
					onload() {
						if (this.status === 200) {
							var res = this.response;
							var resObj = JSON.parse(res);

							if (resObj === 'fail') {
								$("#mainBoxMiddle").html("Unable to fetch favorite data at this time.");
								setTimeout(function(){ $("#status").html("") }, 5000); // clear message after 5 secs
							} else {								
								resolve(resObj);
							}

						} else {
							reject(new Error(this.statusText));
						}
					},
					onerror() {
						reject(new Error(
							'XMLHttpRequest Error: ' + this.statusText));
					}
				});
				request.open('GET', url);
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				request.send();
			});
	}			

}