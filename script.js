/* 🍚next
cart page
wish list page
star function
*/

// const
const boxContainer = document.querySelector('.products .box-container');
const cartItemsEl = document.querySelector('.cart-items');
console.log(cartItemsEl)
const subtotalEl = document.querySelector('.subtotal')


/* 🍀js12. menu-bar& navbar click , hide & active */

/*🍄
 1. font awesome change 
 2. active toggle
*/

const menu = document.querySelector('#menu-bar');
const navbar = document.querySelector('.navbar');

menu.onclick =()=>{
    menu.classList.toggle('fa-times'); /* font awesome change */
    navbar.classList.toggle('active');
}


// 🍀js22. slide-show

/* 
<🦄% operator>

1) 낮은 숫자를, 더 높은 숫자로 % 했을 때,  낮은 숫자 그대로를 return함

1%3 = 1
2%3 = 2
3%3 = 0

1%5 = 1
2%5 = 2
3%5 = 3
4%5 = 4

2) 낮은 숫자를, 더 높은 숫자로 % 했을 때, .... 나눈 후의 나머지 숫자 return

4%3 = 1
5%3 = 2
6%3 = 0
7%3 = 1
*/

/* 🦄  slide-show 공식
index = (index + 1) % slides.length;
index = (index - 1 + slides.length) % slides.length;

🍄
20. click, 현재 slide remove , 다음 slide active

30. slides.length = 3 (slide 3개 있어서..)
 
40. 다음페이지로 이동 : 
index = (index + 1) % slides.length;  
👉
1 % 3 = 1
2 % 3 = 2
3 % 3 = 0

50. 이전페이지로 이동 : 
index = (index - 1 + slides.length) % slides.length;
👉
0-1+3 = 2  % 3 = 2  (첫페이지 0)
2-1+3 = 4  % 3 = 1  (마지막페이지 2)
1-1+3 = 3  % 3 = 0
*/

const slides = document.querySelectorAll('.slide-container');
let index = 0;

console.log(slides);
console.log(slides.length); //3

function next() {
    slides[index].classList.remove('active');
     //🍉js22-40
    index = (index+1) % slides.length; // 1 2 0 
    console.log(index)
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
     //🍉js22-50
    index = (index -1 + slides.length) % slides.length; //2 1 0 
    console.log(index)
    slides[index].classList.add('active');    
}


// 🍀js39, featured images 선택 (옆의 다른 사진들, 메인화면에 보이게하기)

/*🦄 class이름으로 src찾아내기
document.querySelector('.~').src

~.getAttribute('src');
*/

/* 🍄
10 forEach : class "featured-image-1"가져옴

20 getAttribute('src') : 🦄

30 클릭한곳의 src...👉 class"big-imgae-1"의 src에 삽입 
*/

let featuredImage1 = document.querySelectorAll('.featured-image-1')
let featuredImage2 = document.querySelectorAll('.featured-image-2')
let featuredImage3 = document.querySelectorAll('.featured-image-3')

featuredImage1.forEach(
    image_1=>{
        image_1.addEventListener('click',()=>{
            let getSrc = image_1.getAttribute('src');

            document.querySelector('.big-image-1').src = getSrc;
        });
    }
);
featuredImage2.forEach(
    image_2=>{
        image_2.addEventListener('click',()=>{
            let getSrc = image_2.getAttribute('src');

            document.querySelector('.big-image-2').src = getSrc;
        });
    }
);
featuredImage3.forEach(
    image_3=>{
        image_3.addEventListener('click',()=>{
            let getSrc = image_3.getAttribute('src');

            document.querySelector('.big-image-3').src = getSrc;
        });
    }
);



//🍀 js100. rendering latest products

/* 
  productsData  : products.js 에서 가져온 variable
    innerHTML += 사용
  
  🦄onClick 사용  - 🍖js13, addToCart
    JS로 rendering한 element에 variable할 수 없을 때..
    rendering할때, onClick 넣으면 간단함!!    
*/




console.log(productsData)

renderProducts();
function renderProducts() {
    productsData.forEach((p_product)=>{        
        boxContainer.innerHTML += `    
            <div class="box">
                <div class="icons">
                    <button href="#" class="fas fa-heart"></button>             
                    <button href="#" class="fas fa-shopping-cart"  onclick="addToCart(${p_product.id})"></button>
                </div>
                <img src="${p_product.imgSrc}" alt="">
                <div class="content">
                    <h3>${p_product.name}</h3>
                    <div class="price">$${p_product.price} <span>$60</span></div>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                    <div class="price">inventory: ${p_product.instock}</div>
                    <a class="btn" onclick="addToCart(${p_product.id})">add to cart</a>
                </div>
            </div>
        `  
    });  
}

// 🍀js13. addToCart

// let cart =[];
let cart = JSON.parse(localStorage.getItem("CART")) || [];

/* 
🦄object....ID 찾아서 전체 목록 불러오기

object.find((~)=>{~})
*/

/* 
🦄array 문법... objectArray에 사용 가능함

Ok : objectArray.find((~)=> ~ === ~ )

x : objectArray.find((~)=> { ~ === ~ } )
*/

/* 🍄js13
10. 빈 array ...variable 만듬 ->  let cart 

20. click한 아이템id !== products.js파일의 id 다르면, cart화면에 추가
array.find() : array에서 조건에 맞는것을 찾음

find..찾아낸 object ->  const item
...spread operator
products.js의 오브젝트 목록에 numberOfUnits:1 추가 (첫번째 아이템...)

30. click한 아이템id === products.js파일의 id 같으면, cart화면에 추가 x... 수량 up & down
->🍖js28. changeNumberOfUnits함수 실행

array.some() : array에 조건에 맞는게 있으면 true..return함
->🍖js09. onClick

40. -> updateCart -> renderCartItems : cart에 아이템 render
*/

const notificationText = document.querySelector('.notification-text');

function addToCart(p_id) {    
        // 🍉js13-30
        if (cart.some((pp_item) => pp_item.id === p_id)) {      
      
            alert(`This item is already on the cart`);

            changeNumberOfUnits('plus',p_id)                    
        } 
        // 🍉js13-20
        else {
            const item = productsData.find((pp_product) => pp_product.id === p_id);
    
            // cart.push(item);
            cart.push(
                {
                    ...item,
                    numberOfUnits: 1,
                }
            );
        }
        console.log(cart)
        updateCart(); 
        notification_ballon();
}


// 🍀js13-40.update Cart
// 🍀js45. localStorage. save cart to local  storage
/* 🍄js45. 

    10. localStorage.setItem : update할때마다 local에 저장 

    20. JSON.stringify(): array -> json으로 저장

    30. localStorage.getItem : local에서 pull

    40. json.parse.. : array로 만듬

    50 updadeCart호출... -> renderCartItems에 적용

    60.  || []; 추가 : 첫 화면의 empty array에서도 실행되게...
*/


updateCart();
function updateCart() {
    renderCartItems();
    renderSubtotal();

    // js 45-10, js45-20
    // localStorage.setItem('CART',cart);
    localStorage.setItem('CART',JSON.stringify(cart));    
}


// 🍀js13-40. renderCartItems :  cart에 아이템 render

/* 🍄
    onclick "changeNumberOfUnits" - 🍖js28
    onclick "removeItemFromCart" - 🍖js41
*/


function renderCartItems() {
     /* 클릭할때마다 초기화 (초기화안하면, + - 할때,  이전목록도 같이 render됨)*/
   cartItemsEl.innerHTML=""; 

    cart.forEach((pp_item)=>{
        cartItemsEl.innerHTML += `
            <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${pp_item.id})">
                <img src="${pp_item.imgSrc}" alt="${pp_item.name}">
                <h4>${pp_item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${pp_item.price}
                <img src="./images/icons8-delete-128.png" alt="" class="delete"  onclick="removeItemFromCart(${pp_item.id})">
            </div>
            <div class="units">
                <div class="mybtn plus" onclick="changeNumberOfUnits('plus', ${pp_item.id})"><i class="fa-solid fa-plus"></i></div>           
                <div class="number">${pp_item.numberOfUnits}</div>
                <div class="mybtn minus" onclick="changeNumberOfUnits('minus', ${pp_item.id})"><i class="fa-solid fa-minus"></i></div>
            </div>
        </div>
        `
    });
}


// 🍀js28. + - 버튼 클릭한때, change Number Of Units, 
/* 🦄
return { ~ } 형식 가능함

action, id...2개의 parameter 가져와서 사용하는 알고리즘
*/

/* 🍄
10. cart 안의 item.id === onclick으로 넘어온 id가 같다면...함수실행

 10-10. minus + 1보다 큰때에만 적용

 10-20. plus + instock보다 작을때에만 적용

20. cart 안의 item.id !== onclick으로 넘어온 id가 다르면... return : 바뀌지않은 이전 numberOfUnit 넣음. = 그대로 유지 (새 item... cart 칸에 추가)
*/

function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
  
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus" && numberOfUnits < item.instock) {
          numberOfUnits++;          
        }         
        else if (action === "plus" && numberOfUnits === item.instock) {
            alert('out of stock');            
          }  
      }
  
      return {
        ...item,
  
        numberOfUnits: numberOfUnits, /* 🍖js3510. */
      //   numberOfUnits,
      };
    });
  
    updateCart();
  }

  
  
//🦄 🍀js35. calculate, renderSubtotal 

/*
🦄 🍄 calculate - add, remove 모두 한번에 간단하게!!!

10. price (products.js의 오브젝트)

20. number of units 를 동적으로 products.js의 오브젝트 목록에 넣음

30 price * number of units 하면 자동으로 계산이 됨 
*/

/* 🦄
.toFixed(2)
*/

function renderSubtotal() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((pp_item)=>{
        totalPrice += pp_item.price * pp_item.numberOfUnits;
        totalItems += pp_item.numberOfUnits;
    });

    // subtotalEl.innerHTML =  `Subtotal (0 items): $0`;
    subtotalEl.innerHTML =  `Subtotal (${totalItems} items): $ ${totalPrice.toFixed(2)}`;
}


// 🍀js41. remove item from cart
/* 🍄
  05. remove item을 제외한 새로운 object-array 만듬

  10. render html에서... onclick="removeItemFromCart(${pp_item.id})" 가져옴

  20. filter... cart안의 아이템들 id - onclick에서 가져온 id 비교

  20-2. 서로 다른것만 filter해서 cart array 다시 만듬 
  
  20-4.(서로 같으면 새로운 cart array에서 filter로 걸러져서 제외됨)
*/

// 🦄array.filter( ~~ => ~~~)

function removeItemFromCart(p_id) {
    cart = cart.filter (pp_item => pp_item.id !== p_id);

    updateCart();    
}


//🍀  localStorage.clear(); /  location.reload();    
// 🍖js13-10,

const deleteAllBtn = document.querySelector('.delete-all-btn');
const checkoutBtn = document.querySelector('.checkoutBtn');

deleteAllBtn.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();    
});

checkoutBtn.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();    
   
    alert(`Thank you`);

});


// js110 notification_ballon

const container = document.querySelector('.notification_ballon .container');

const notification_ballon = ()=>{
    container.setAttribute('style', 'display: flex;');    
    
    setTimeout(function(){
        container.setAttribute('style', 'display: none;');              
    }, 2000);
};