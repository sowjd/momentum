const body = document.querySelector("body");

const IMAGE_SRC = ['https://cdn.pixabay.com/photo/2015/10/12/14/59/milky-way-984050_1280.jpg',
'https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg',
'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg',
'https://cdn.pixabay.com/photo/2020/10/11/11/07/castle-5645512_1280.jpg',
'https://cdn.pixabay.com/photo/2020/10/11/17/27/mountain-5646490_1280.jpg',
'https://cdn.pixabay.com/photo/2020/10/12/15/34/vineyard-5649128_1280.jpg',
'https://cdn.pixabay.com/photo/2020/10/09/21/48/river-5641608_1280.jpg',
'https://cdn.pixabay.com/photo/2020/09/27/17/40/city-5607312_1280.jpg',
'https://cdn.pixabay.com/photo/2020/09/19/16/19/channel-5584870_1280.jpg',
'https://cdn.pixabay.com/photo/2020/09/30/13/51/palace-5615793_1280.jpg',
'https://cdn.pixabay.com/photo/2020/07/09/14/22/asia-5387558_1280.jpg'];

function setBackgroundImg(idx){
    const img = new Image();
    img.src = IMAGE_SRC[idx];
    img.classList.add("bfgImage");
    body.appendChild(img);
}

function generateRandom(){
    const num = Math.floor(Math.random() * IMAGE_SRC.length);
    return num;
}

function init(){
    setBackgroundImg(generateRandom());
}

init();

