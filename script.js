const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");
const count = 5;
const client_id = 'Tt0oV6OCChbNGUGE3MQeRi2JBK0qNn6PhFnqodcHKOg';
const apiUrl = `https://api.unsplash.com/photos/random?count=${count}&client_id=${client_id}`
let photoArray = []

function showloader() {
    loader.hidden = false;
    imageContainer.hidden = true;
}

function removeloader() {
    loader.hidden = true;
    imageContainer.hidden = false;
}

async function getPhotos() {
    showloader();
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    createImageElement(photoArray);
    removeloader();
    
}

function createImageElement(photoArray) {
    photoArray.map((photo)=>{
        const aTag = document.createElement("a");
        const downloadLinkTag = document.createElement("a");
        const imgElement= document.createElement("img");
        const downloadButton = document.createElement("button");
        let downloadPhoto = photo.links.download;
        downloadButton.textContent = "Download"
        aTag.setAttribute('href',photo.links.html)
        imgElement.setAttribute('src',photo.urls.regular)
        downloadLinkTag.setAttribute('href',`${downloadPhoto}&force=true&w=1920`)
        aTag.appendChild(imgElement);
        downloadLinkTag.appendChild(downloadButton);
        imageContainer.appendChild(aTag)
        imageContainer.appendChild(downloadLinkTag);

    })
    
}


window.addEventListener("scroll",()=>{
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        getPhotos();
    }
})

// onloads

getPhotos();
