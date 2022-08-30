const loadPhone= async(searchText,dataLimit)=>{
    const url =(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const res = await fetch(url);
    const data = await res.json()
    displayPhone(data.data,dataLimit)
}

const displayPhone=(phones,dataLimit)=>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML=''
    //display 10 phones only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length>10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    

    //display no phones found
    const noPhone = document.getElementById('none-messege')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    //display all phones
    phones.forEach(phone=>{
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="loadPhoneDetail('${phone.slug}')">show details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });
    //stop loader
    toggleSpinner(false)
}

const processSearch =(dataLimit)=>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText=searchField.value;
    loadPhone(searchText,dataLimit)
    //searchField.value=''
}
document.getElementById('btn-search').addEventListener('click',function(){
    //start loader
    processSearch(10)
})

// search input field by enter key handler
document.getElementById('search-field').addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        processSearch(10)
    }
})
const toggleSpinner = isLoading=>{
    const loader = document.getElementById('loader')
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}
//not the best way to show all
document.getElementById('btn-showall').addEventListener('click',function(){
    processSearch()
})

const loadPhoneDetail=async(id)=>{
    
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    displayPhonedetails(data.data)
}

const displayPhonedetails=(data)=>{
    //console.log(data)
    const modalTitel = document.getElementById('exampleModalLabel')
    modalTitel.innerText=data.name
    const phoneModalDetails = document.getElementById('modal-detail')
    phoneModalDetails.innerHTML=`
    <p>Chipset:${data.mainFeatures.chipSet}</p>
    <p>Sensors: ${data.mainFeatures.sensors}</p>
    <p>Storage: ${data.mainFeatures.storage}</p>
    <p>Release date: ${data.releaseDate ? data.releaseDate : 'N/A'}</p>
    `
}
//loadPhone()