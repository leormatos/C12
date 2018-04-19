var randomize = function randomize(arr) {
	var random = Math.floor(Math.random() * arr.length)
	return arr[random]
}

var setContent = function setContent(elementID, arr) {
	document.querySelector("#" + elementID + " .response").innerHTML = randomize(arr)
}
