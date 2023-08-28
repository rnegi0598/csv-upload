const fileInput=document.querySelector('#csv-upload');
const selectedFile=document.querySelector('.selected-file');

fileInput.addEventListener('change',(event)=>{
    const uploadedFile=event.target.files[0];   
    if(selectedFile){
        selectedFile.innerHTML=uploadedFile.name;
    }else{
        console.log('no file selected');
    }
})