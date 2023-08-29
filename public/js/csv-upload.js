const fileInput=document.querySelector('#csv-upload');
const selectedFile=document.querySelector('.selected-file');
const submitButton=document.querySelector('.submit-wrapper button');
fileInput.addEventListener('change',(event)=>{
    const uploadedFile=event.target.files[0];   
    if(selectedFile){
        selectedFile.innerHTML=uploadedFile.name;
        submitButton.removeAttribute('disabled');
    }else{
        console.log('no file selected');
    }
})