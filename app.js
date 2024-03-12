const CART_ITEMS_CONTAINER = document.getElementById("cart__items__container");
const DISPLAY_CART_TOTAL = document.getElementById("display__cart__total");
const CHECK_OUT_BTN = document.getElementById("check__out__btn");

let cartItems = [
  {
    product_id: 1,
    product_name: "Samsung",
    product_image:
      "https://th.bing.com/th/id/R.00f0eb654b5f202b6156cd4f37437f78?rik=a3d6Tyo5aYH9TA&pid=ImgRaw&r=0",
    product_price: 2000,
    product_quantity: 1,
  },
  {
    product_id: 2,
    product_name: "Iphone 12",
    product_image:
      "https://th.bing.com/th/id/OIP.-22fs7W_R-MVukHjyGOq1AHaEx?rs=1&pid=ImgDetMain",
    product_price: 5000,
    product_quantity: 1,
  },
  {
    product_id: 3,
    product_name: "Tecno Pop 2",
    product_image:
      "https://th.bing.com/th/id/OIP.b8RtZPhsoqNnFbpT0eZTXAHaHa?rs=1&pid=ImgDetMain",
    product_price: 10000,
    product_quantity: 1,
  },
  {
    product_id: 4,
    product_name: "Infinix hot 5",
    product_image:
      "https://th.bing.com/th/id/OIP.Nuvc-slbqHCH0l169HCt_AHaHa?rs=1&pid=ImgDetMain",
    product_price: 50000,
    product_quantity: 1,
  },
  {
    product_id: 5,
    product_name: "Oppo A5",
    product_image:
      "https://th.bing.com/th/id/R.b4b12bd39f278242c3a1201fce360bb2?rik=idzKC3GG3bCEcQ&pid=ImgRaw&r=0",
    product_price: 25000,
    product_quantity: 1,
  },
];

// a function to display cart items

function display_cart_items() {
  let product_to_display = [];

  for (let i = 0; i < cartItems.length; i++) {
    const cart_product = ` <!-- single cart product -->
          <div class="flex justify-between items-center shadow-md p-5">
            <div class="flex items-center gap-4">
              <img
                src=${cartItems[i].product_image}
                alt="product image"
                class="w-40 rounded-md"
              /> 
              <div>
                <h2 class="font-bold text-3xl">${cartItems[i].product_name}</h2>
                <button
                  class="bg-red-500 text-white font-semibold p-2 rounded-md mt-2"

                   onclick="removeItemFromCart(${cartItems[i].product_id})"
                >
                  Delete
                </button>
              </div>
            </div>

            <div class="text-center">
              <p class="font-bold text-xl">${cartItems[i].product_price}</p>
              <button
                class="bg-green-500 text-white text-lg font-semibold p-2 rounded-md mt-2"
                onclick="increaseProductQuantity(${cartItems[i].product_id})"
              >
                +
              </button>
              <span class="font-bold text-lg">${cartItems[i].product_quantity}</span>
              <button
                class="bg-red-500 text-white text-lg font-semibold p-2 rounded-md mt-2"
                onclick="decreaseProductQuantity(${cartItems[i].product_id})"
              >
                -
              </button>
            </div>
          </div>
          <!-- single cart product ends here -->`;

    product_to_display.push(cart_product);
  }

  if (product_to_display.length === 0) {
    CART_ITEMS_CONTAINER.innerHTML = `<h1 class="text-center text-3xl font-semibold">Cart is empty please add product 🥲🥲</h1>`;
    // DISPLAY_CART_TOTAL.textContent = 0;
    return;
  }

  CART_ITEMS_CONTAINER.innerHTML = product_to_display.join(" ");
}
display_cart_items();
calculateCartTotal();

// function to increase product quantity
function increaseProductQuantity(productID) {
  for (let i = 0; i < cartItems.length; i++) {
    // check for the product that was click
    if (cartItems[i].product_id === productID) {
      cartItems[i].product_quantity++;
    }
  }

  calculateCartTotal();
  display_cart_items();
}

// function to decrease product quantity
function decreaseProductQuantity(productID) {
  for (let i = 0; i < cartItems.length; i++) {
    if (
      cartItems[i].product_id === productID &&
      cartItems[i].product_quantity != 1
    ) {
      cartItems[i].product_quantity--;
    }
  }
  calculateCartTotal();
  display_cart_items();
}

// function to remove product from cart
function removeItemFromCart(productID) {
  const productsLeftInCart = [];
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].product_id !== productID) {
      productsLeftInCart.push(cartItems[i]);
    }
  }
  cartItems = productsLeftInCart;
  display_cart_items();
  calculateCartTotal();
}

// function to calculate cart total
function calculateCartTotal() {
  let totalCost = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalCost =
      totalCost + cartItems[i].product_price * cartItems[i].product_quantity;
    DISPLAY_CART_TOTAL.textContent = totalCost;
  }
  return totalCost;
}

CHECK_OUT_BTN.addEventListener("click", handleCheckOut);
function handleCheckOut() {
  console.log(cartItems);
  console.log(calculateCartTotal());
}
