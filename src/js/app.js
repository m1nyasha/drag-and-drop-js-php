// dragenter - когда сущность над элементом
// dragleave - когда сущность вышла за пределы элемента
// dragover - срабатывает постоянно, когда сущность над элементом
// drop - срабатывает, когда объект был отпущен над элементом

let imagesForUpload = [];

const types = ['image/jpeg', 'image/png']

let dragAndDrop = document.querySelector('.drag-and-drop'),
    imagesList = document.querySelector('.images-list'),
    uploadBtn = document.querySelector('.upload-btn')

dragAndDrop.addEventListener('dragenter', (e) => {
    e.preventDefault()
    dragAndDrop.classList.add('active')
})
dragAndDrop.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dragAndDrop.classList.remove('active')
})
dragAndDrop.addEventListener('dragover', (e) => {
    e.preventDefault()
})

dragAndDrop.addEventListener('drop', (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    for (let key in files) {
        if (!types.includes(files[key].type)) {
            continue;
        }
        imagesForUpload.push(files[key])
        let imageTmpUrl = URL.createObjectURL(files[key])
        imagesList.innerHTML += `<img src="${imageTmpUrl}" class="images-list-picture" alt="">`
    }
    if (imagesForUpload.length > 0) {
        uploadBtn.removeAttribute('disabled')
    }

    dragAndDrop.classList.remove('active');
})

const uploadImages = () => {
    let formData = new FormData();

    imagesForUpload.forEach((image, key) => {
        formData.append(key, image);
    })

    fetch('/core/upload.php', {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            if (result.status) {
                imagesForUpload = []
                imagesList.innerHTML = ``
                uploadBtn.setAttribute('disabled', true)
                alert('Файлы успешно загружены')
            }
        })
}