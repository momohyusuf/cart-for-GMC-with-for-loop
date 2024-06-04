const CART_ITEMS_CONTAINER = document.getElementById("cart__items__container");
const DISPLAY_CART_TOTAL = document.getElementById("display__cart__total");
const CHECK_OUT_BTN = document.getElementById("check__out__btn");

// A class to create product instance
class Product {
  constructor(
    product_id,
    product_name,
    product_image,
    product_price,
    product_quantity
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_image = product_image;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
  }
}

// An instance of the shopping cart
class ShoppingCartItems {
  constructor(cartItems) {
    this.cartItems = cartItems;
  }

  // A method to increase product quantity
  increaseProductQuantity(productID) {
    for (let i = 0; i < this.cartItems.length; i++) {
      // check for the product that was click
      if (this.cartItems[i].product_id === productID) {
        this.cartItems[i].product_quantity++;
      }
    }
    this.calculateCartTotal();
    this.display_cart_items();
  }
  // ******increase product quantity method ends here

  // A method  to decrease product quantity
  decreaseProductQuantity(productID) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (
        this.cartItems[i].product_id === productID &&
        this.cartItems[i].product_quantity != 1
      ) {
        this.cartItems[i].product_quantity--;
      }
    }
    this.calculateCartTotal();
    this.display_cart_items();
  }
  // ******* decrease product quantity ends here

  // A method for removing item from cart
  removeItemFromCart(productID) {
    const productsLeftInCart = [];
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product_id !== productID) {
        productsLeftInCart.push(this.cartItems[i]);
      }
    }
    this.cartItems = productsLeftInCart;
    this.display_cart_items();
    this.calculateCartTotal();
  }
  //******* remove item from cart method ends here

  // A method to calculate the total amount of products
  calculateCartTotal() {
    let totalCost = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalCost =
        totalCost +
        this.cartItems[i].product_price * this.cartItems[i].product_quantity;
      DISPLAY_CART_TOTAL.textContent = totalCost;
    }
    return totalCost;
  }
  // calculate cart total items ends here

  // A method to display cart items
  display_cart_items() {
    let product_to_display = [];

    for (let i = 0; i < this.cartItems.length; i++) {
      const cart_product = ` <!-- single cart product -->
          <div class="flex justify-between items-center shadow-md p-5">
            <div class="flex items-center gap-4">
              <img
                src=${this.cartItems[i].product_image}
                alt="product image"
                class="w-40 rounded-md"
              /> 
              <div>
                <h2 class="font-bold text-3xl">${this.cartItems[i].product_name}</h2>
                <button
                  class="delete__item bg-red-500 text-white font-semibold p-2 rounded-md mt-2"
                  id=${this.cartItems[i].product_id}
                >
                  Delete
                </button>
              </div>
            </div>

            <div class="text-center">
              <p class="font-bold text-xl">${this.cartItems[i].product_price}</p>
              <button
                class="increase__product__quantity bg-green-500 text-white text-lg font-semibold p-2 rounded-md mt-2"
                 id=${this.cartItems[i].product_id}  
                >
                +
              </button>
              <span class="font-bold text-lg">${this.cartItems[i].product_quantity}</span>
              <button
                class="decrease__product__quantity bg-red-500 text-white text-lg font-semibold p-2 rounded-md mt-2"
                id=${this.cartItems[i].product_id} 
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
    // increase quantity button
    const increaseProductQuantityBTN = document.querySelectorAll(
      ".increase__product__quantity"
    );
    increaseProductQuantityBTN.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        this.increaseProductQuantity(productID);
      });
    });
    // increase quantity button ends here

    // decrease quantity button starts here
    const decreaseProductQuantityBTN = document.querySelectorAll(
      ".decrease__product__quantity"
    );
    decreaseProductQuantityBTN.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        this.decreaseProductQuantity(productID);
      });
    });
    // decrease quantity button ends here

    // delete item  button starts here
    const deleteItemBTN = document.querySelectorAll(".delete__item");
    deleteItemBTN.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        this.removeItemFromCart(productID);
      });
    });
    // decrease quantity button ends here
  }
  // ******display cart items method ends her
}

let cartItems = [
  new Product(
    1,
    "Samsung",
    "https://th.bing.com/th/id/R.00f0eb654b5f202b6156cd4f37437f78?rik=a3d6Tyo5aYH9TA&pid=ImgRaw&r=0",
    20000,
    1
  ),

  new Product(
    2,
    "Iphone 12",
    "https://th.bing.com/th/id/R.00f0eb654b5f202b6156cd4f37437f78?rik=a3d6Tyo5aYH9TA&pid=ImgRaw&r=0",
    5999,
    1
  ),

  new Product(
    3,
    "Infinix hot 5",
    "https://th.bing.com/th/id/OIP.Nuvc-slbqHCH0l169HCt_AHaHa?rs=1&pid=ImgDetMain",
    50000,
    1
  ),

  new Product(
    4,
    "Tecno Camon 15",
    "https://th.bing.com/th/id/OIP.1Y8zv6J6o4Q2qQr9J1QG4wHaHa?pid=ImgDet&rs=1",
    30000,
    1
  ),
];

// create an instance of the shopping cart
const CustomerShoppingCart = new ShoppingCartItems(cartItems);
CustomerShoppingCart.display_cart_items();
CustomerShoppingCart.calculateCartTotal();

CHECK_OUT_BTN.addEventListener("click", handleCheckOut);
function handleCheckOut() {
  console.log(CustomerShoppingCart.cartItems);
  console.log(CustomerShoppingCart.calculateCartTotal());
}
