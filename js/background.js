const images = ["bg01", "bg02", "bg03"]

randomImg = images[Math.floor(Math.random() * images.length)];

const img = document.createElement("img");
img.src = `img/${randomImg}.jpg`

document.body.appendChild(img);




