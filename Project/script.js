const access_key = "kaLfqBOjBIEyd_1oH4PzyhZIjdoM7ACzVnHvQimdCCQ"
const secret_key = "R4YjBFwgIA_rjOTB1le_98gOxAkRaXy3SGn6ruL4Ets"

let search_query = document.getElementById("search_query")

let image = document.getElementById('sourceImage');

let canvas = document.getElementById('canvas');

let context = canvas.getContext('2d');

let brightnessSlider = document.getElementById("brightnessSlider");
let contrastSlider = document.getElementById("contrastSlider");
let grayscaleSlider = document.getElementById("grayscaleSlider");
let hueRotateSlider = document.getElementById("hueRotateSlider");
let saturateSlider = document.getElementById("saturationSlider");
let sepiaSlider = document.getElementById("sepiaSlider");

let urls = [];
let currentImage = 0;

function searchUnsplash() {

	const deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	const apiUrl = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${search_query.value}`;

	urls = [];

	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			if (data.results && data.results.length > 0) {
				
				data.results.forEach(result => {
					const imageUrl = deviceWidth > 768 ? result.urls.regular : result.urls.small;
					urls.push(imageUrl);
				});
				currentImage = 0;
				image.src = urls[currentImage];
				document.querySelector('.help-text').style.display = "none";
			} else {
				const helpText = document.getElementById("help-text");
				helpText.style.display = "block";
				helpText.innerText = "No Images Found";
			}
		})
		.catch(error => {
			console.log('Error:', error);
		});


	image.onload = function () {
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.crossOrigin = "anonymous";
		resetImage();
	};

	

	document.querySelector('.image-save').style.visibility = "visible";
	document.querySelector('.image-controls').style.visibility = "visible";
	document.querySelector('.preset-filters').style.visibility = "visible";
}

function nextImage() {
	currentImage++;
	if (currentImage === urls.length) {
		currentImage = 0;
	}
	image.src = urls[currentImage];
}

document.getElementById("next-image").addEventListener("click", nextImage)

function previousImage() {
	currentImage--;
	if (currentImage === -1) {
		currentImage = urls.length - 1;
	}
	image.src = urls[currentImage];
}

document.getElementById("previous-image").addEventListener("click", previousImage)

function applyFilter() {

	let filterString =
		"brightness(" + brightnessSlider.value + "%" +
		") contrast(" + contrastSlider.value + "%" +
		") grayscale(" + grayscaleSlider.value + "%" +
		") saturate(" + saturateSlider.value + "%" +
		") sepia(" + sepiaSlider.value + "%" +
		") hue-rotate(" + hueRotateSlider.value + "deg" + ")";

	context.filter = filterString;

	context.drawImage(image, 0, 0);
}

function brightenFilter() {
	resetImage();
	brightnessSlider.value = 130;
	contrastSlider.value = 120;
	saturateSlider.value = 120;
	applyFilter();
}

function bwFilter() {
	resetImage();
	grayscaleSlider.value = 100;
	brightnessSlider.value = 120;
	contrastSlider.value = 120;
	applyFilter();
}

function funkyFilter() {
	resetImage();

	hueRotateSlider.value =
		Math.floor(Math.random() * 360) + 1;
	contrastSlider.value = 120;
	applyFilter();
}

function vintageFilter() {
	resetImage();
	brightnessSlider.value = 120;
	saturateSlider.value = 120;
	sepiaSlider.value = 150;
	applyFilter();
}

function resetImage() {
	brightnessSlider.value = 100;
	contrastSlider.value = 100;
	grayscaleSlider.value = 0;
	hueRotateSlider.value = 0;
	saturateSlider.value = 100;
	sepiaSlider.value = 0;
	applyFilter();
}

function saveImage() {
	if(urls.length < 1){
		return;
	}
	let linkElement = document.getElementById('link');
	linkElement.setAttribute(
		'download', 'edited_image.png'
	);

	let canvasData = canvas.toDataURL("image/png")

	canvasData.replace(
		"image/png", "image/octet-stream"
	)

	linkElement.setAttribute('href', canvasData);

	linkElement.click();
}
