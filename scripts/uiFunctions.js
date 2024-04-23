function createUiElement(parentObjectSelector, element, id, class1, class2, textContent) {
	let parentObject = undefined;
	if(parentObjectSelector != "") parentObject = document.querySelector(parentObjectSelector);
	const newElement = document.createElement(element);
	if(id != "") newElement.id = id;
	if(class1 != "") newElement.classList.add(class1);
	if(class2 != "") newElement.classList.add(class2);
	if(textContent != "") newElement.textContent = textContent;
	if(parentObjectSelector != "") parentObject.appendChild(newElement);
	return newElement;
}