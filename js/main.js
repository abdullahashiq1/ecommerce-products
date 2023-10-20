// fetch('https://dummyjson.com/products')


const fetchProducts = async() =>{
    const url = 'data.json'

    try{
        const res =await fetch(url)
        if(!res.ok){
            throw new Error(`Network response was not ok ${res.status}`)
        }
        const data = await res.json()
        displayProduct(data.products)
        // console.log(data)
        
    }
    catch(error){
        console.error('Error fetching data', error)
    }
}


const displayProduct = (products) => {
  const container = document.getElementById('container');
  
  for (const key in products) {
    if (products.hasOwnProperty(key)) {
      const product = products[key];
      let items = product.items;
      // console.log(Array.isArray(items))

      // display show only first 20 cards 
      console.log(items.length)
      items = items.slice(0, 20)
      console.log(items)

      const productDiv = document.createElement('div');
      productDiv.className = ' grid grid-cols-3 gap-x-8 gap-y-4';

      items.forEach(product =>{
        const itemDiv = document.createElement('div');
       

        itemDiv.innerHTML = `
        <div class="relative grid flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        <div class="relative h-56 mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <img src="${product.img}" alt="Product Image" />
        </div>
        <div class="p-6">
          <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            ${product.name}
          </h5>
          <p class="block font-sans text-xl font-bold antialiased leading-relaxed text-inherit">
           $${product.price}
          </p>
          <p class="block font-sans text-base  antialiased leading-relaxed text-inherit">
           ${product.subcategory}
          </p>
        </div>
        <div class="p-6 pt-0">
        
          <button 
            class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
           Add to Cart
          </button>
          <button class="select-none rounded-lg bg-green-500 float-right py-3 px-6 text-center align-middle font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
            onclick="toggleModal('${product.id}')">See Details</button>
        </div>
      </div>
        `;
        productDiv.appendChild(itemDiv);
      })

      container.appendChild(productDiv);
    }
  }
};

fetchProducts();


//product modal
function toggleModal(id) {
  document.getElementById('modal2').classList.toggle('hidden');
  
  const url = `data.json`; // Assuming data.json is in the same directory as your HTML file

  fetch(url)
   .then(res => {
      if(!res.ok){
        throw new Error('Network response was not ok')
      }
      return res.json();
   })
   .then(data =>{
      const product = data.products.data.items.find(product => product.id === id);
      displayModal(product)
      
   })
}

const displayModal = (product)=>{
    console.log(product)
    if(product){
        const productName = document.getElementById('product-name');
        productName.innerHTML = product.name;
        const modalImage = document.getElementById('modal-img');
        modalImage.src = product.img;
        modalImage.className = ' object-cover';

        const modalBody = document.getElementById('modal-content');
        modalBody.innerHTML = `
          <p>${product.category}</p>
        `
        
    }else{
      console.log('Product is undefined')
    }
    
}


// carousel banner
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });
  slides[index].style.display = 'block';
}

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function showPrevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

nextBtn.addEventListener('click', showNextSlide);
prevBtn.addEventListener('click', showPrevSlide);

// Initial display of the first slide
showSlide(currentIndex);
setInterval(showNextSlide, 5000)


