const cartItemsEl = document.querySelector('.cart-items');
console.log(cartItemsEl)

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
