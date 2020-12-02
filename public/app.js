const firebaseConfig = {

  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const imagesRef = db.collection('images');

  const storage = firebase.storage();

  imagesRef.onSnapshot( snapshot => {
      let update = snapshot.docChanges();
 
      update.forEach( image => {
  
        const imgPath = image.doc.data().imageURL;
        imageCircles.push(new ImageCircle(imgPath))
        // imgPaths.push(imgPath);
        console.log(imgPaths);
        // addToGallery(imgPath);
      })
  })



    const drop = document.querySelector('#drop');
    const gallery = document.querySelector('#gallery');

window.addEventListener('dragover', (e) => {
    e.preventDefault();
})

window.addEventListener('drop', (e) => {
    e.preventDefault();
})

drop.addEventListener('drop', (e) => {
    e.preventDefault();
    const file =  e.dataTransfer.files[0];
    const fileSize = file.size / 1024 / 1024;
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
        let fileURL = reader.result;
        const metadata = { contentType : file.type};

        uploadFile(file, metadata);
        
        // addToGallery(fileURL);
    })

    if(file){
        if(fileSize > 1){
            alert('file must be smaller than 1 MB');
        } else {
            reader.readAsDataURL(file);
        }
    }
})

function addToGallery(url){
    console.log(url);
    const newGalleryItem = document.createElement('div');
    newGalleryItem.className = 'img-item';
    const imgElement = document.createElement('img');
    imgElement.src = url;
    newGalleryItem.appendChild(imgElement);
    gallery.appendChild(newGalleryItem);
}

function uploadFile(file, metadata){
    const uniqueID = window.crypto.getRandomValues(new Uint32Array(1))[0]
    const filePath = `images/${uniqueID}.jpg`;
    const upload = storage.ref().child(filePath).put(file, metadata).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            imagesRef.add({imageURL: downloadURL})
        })
    })  
}
