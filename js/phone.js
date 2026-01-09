const loadPhoneData = async (inputSearchText = '13') => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputSearchText}`);
  const data = await res.json();
  const phones = data.data;
  //  console.log(phones);
  displayPhone(phones);
};
//----------------- display phone----------------
const displayPhone = phones => {
  //  console.log(phones)
  const phoneContainer = document.getElementById('phone-container');
//   ----------------clear contain-------------------
    phoneContainer.textContent = '';
    // --------------------showall button-------------------------------------
    const showallContainer = document.getElementById('showall-container')
    if(phones.length > 12 ){
      showallContainer.classList.remove('hidden')
    }
    else{
      showallContainer.classList.add('hidden')
    }
    // --------------slice-------------------------------------------
   
     phones = phones.slice(0,12);
  
  phones.forEach((phone) => {
    // console.log(phone)
    // ----------------crate a div----------------------------
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray w-96 shadow-sm`;
    phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes"class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-2xl text-[#403f3f]">${phone.phone_name}</h2>
            <p class="text-lg text-[#706f6f]">There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-[#403f3f] text-[25px]">$999</p>
            <div class="card-actions">
                <button onclick = "handleShowAllDetails('${phone.slug}')"
                class="btn bg-[#0d6efd] text-sm text-[#fff]">Show Details</button>
            </div>
        </div>
    `;
     phoneContainer.appendChild(phoneCard);

  });
  loadingToggle(false);
}
// --------------------handle Show all details--------------------------
const handleShowAllDetails = async(id)=>{
    // console.log('show all details',id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phones = data.data;
  showphoneDetails(phones);
}
// ------------------dispaly details-------------------
const showphoneDetails = (phone)=>{
  // console.log(phone);
  show_datails_modal.showModal()
  // show details
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML =`<img src="${phone.image}" alt="">
                  <h1 class ="text-[#403f3f] text-2xl>${phone.name}</h1>
                  <p class ="text-[#403f3f] text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                  <p class="text-[#403F3F] text-xl" >Storage:<span class ="text-[#403f3f] text-lg">${phone?.mainFeatures?.storage}</span></p>
                  <p class="text-[#706f6f] text-xl>Display Size:<span  class ="text-[#403f3f] text-lg">${phone?.mainFeatures?.displaySize}</span></p>
                  <p class="text-[#706f6f] text-xl>Chipset:<span class ="text-[#403f3f] text-lg">${phone?.mainFeatures?.chipSet}</span></p>
                  <p class="text-[#706f6f] text-xl>memory:<span class ="text-[#403f3f] text-lg">${phone?.mainFeatures?.memory}</span></p>
                  <p class="text-[#706f6f] text-xl>Slug:<span class ="text-[#403f3f] text-lg">${phone?.mainFeatures?.slug}</span></p>
                  <p class="text-[#706f6f] text-xl>Release data:<span class ="text-[#403f3f] text-lg">${phone?.mainFeatures?.releaseDate}</span></p>
                  <p class="text-[#706f6f] text-xl>Brand :<span class ="text-[#403f3f] text-lg">${phone?.mainFeatures?.brand}</span></p>
                  <p class="text-[#403F3F] text-xl>GPS:<span class ="text-[#403f3f] text-lg">${phone?.others?.GPS || 'NO GPS'}</span></p>
  `
}
// ---------------------search--------------------------
const handleSearch = () =>{
  loadingToggle(true);
    const inputsearchField = document.getElementById('input-field');
    const inputSearchText = inputsearchField.value;
    loadPhoneData(inputSearchText);
    // console.log(inputSearchText)
}

// -------------loading-spinner----------------------
const loadingToggle = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
        loadingSpinner.classList.add('hidden')
  }
}
// -----------------show all button click------------------
const showAll = ()=>{
  loadPhoneData();
}

loadPhoneData();
