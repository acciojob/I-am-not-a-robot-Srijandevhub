//your code here
const imagesContainer = document.getElementById('images-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const message = document.getElementById('para');

let selectedImages = [];
let images = ['img1', 'img2', 'img3', 'img4', 'img5'];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderImages() {
    // Reset the container
    imagesContainer.innerHTML = '';
    selectedImages = [];

    // Pick a random image to duplicate
    const duplicateImage = images[Math.floor(Math.random() * images.length)];

    // Create an array with the images plus the duplicate
    const imagesToDisplay = [...images, duplicateImage];

    // Shuffle the images
    shuffle(imagesToDisplay);

    // Render the images
    imagesToDisplay.forEach((imgClass, index) => {
        const img = document.createElement('img');
        img.className = imgClass;
        img.setAttribute('data-class', imgClass);
        img.addEventListener('click', () => handleImageClick(img));
        imagesContainer.appendChild(img);
    });

    // Hide buttons and message
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    message.innerText = '';
}

function handleImageClick(img) {
    const imgClass = img.getAttribute('data-class');
    // Ignore double clicks on the same image
    //if (selectedImages.includes(imgClass)) return;

    selectedImages.push(imgClass);

    // Show reset button
    resetButton.style.display = 'block';

    // Show verify button only if two different images are selected
    if (selectedImages.length === 2) {
        verifyButton.style.display = 'block';
    }

    // Reset selection if more than 2 images are clicked
    if (selectedImages.length > 2) {
        selectedImages = [imgClass];
        verifyButton.style.display = 'none';
    }
}
function handleReset() {
    renderImages();
}

function handleVerify() {
    if (selectedImages.length !== 2) return;

    const imgClass1 = selectedImages[0];
    const imgClass2 = selectedImages[1];

    verifyButton.style.display = 'none';

    if (imgClass1 === imgClass2) {
        message.innerText = 'You are a human. Congratulations!';
    } else {
        message.innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
}
// Event listeners
resetButton.addEventListener('click', handleReset);
verifyButton.addEventListener('click', handleVerify);

// Initial render
renderImages();