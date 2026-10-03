var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("productImage");
var productDescriptionInput = document.getElementById("productDescription");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");

var imagePreview = document.getElementById("imagePreview");

var searchInput = document.getElementById("searchInput");
var sortSelect = document.getElementById("sortSelect");

var isNameValid;
var isPriceValid;
var isCategoryValid;
var isDescriptionValid;
var isImageValid;

var productList = [];
var currentProductId = null;
if (localStorage.getItem("productContainer") != null) {
    productList = JSON.parse(localStorage.getItem("productContainer"));
    displayProducts();
}

// console.log(productNameInput);
// console.log(productPriceInput);
// console.log(productCategoryInput);
// console.log(productDescriptionInput);
//  console.log(imagePreview);

// addProductBtn.addEventListener("click", function () {
//     console.log(productNameInput.value);
//     console.log(productPriceInput.value);
//     console.log(productCategoryInput.value);
//     console.log(productDescriptionInput.value);
// });


addProductBtn.addEventListener("click", function () {

    isNameValid = validateFormInputs(productNameInput);
    isPriceValid = validateFormInputs(productPriceInput);
    isCategoryValid = validateFormInputs(productCategoryInput);
    isDescriptionValid = validateFormInputs(productDescriptionInput);
    isImageValid = validateImage();
     if (
        isNameValid &&
        isPriceValid &&
        isCategoryValid &&
        isDescriptionValid &&
        isImageValid
    ){
    //   console.log("All fields are valid");
    var productName = productNameInput.value;
    var productPrice = Number(productPriceInput.value);
    var productCategory = productCategoryInput.value;
    var productDescription = productDescriptionInput.value;
    var productImage = `assets/images/${productImageInput.files[0].name}`;
    // var productImage = "assets/images/" + productImageInput.files[0].name;

    //  console.log(productName);
    // console.log(productPrice);
    // console.log(productCategory);
    // console.log(productDescription);
    // console.log(productImage);

    var product = {
    id: Date.now(),
    name: productName,
    price: productPrice,
    category: productCategory,
    description: productDescription,
    image: productImage
};
      productList.push(product);

      localStorage.setItem("productContainer", JSON.stringify(productList));

      displayProducts();

       // Clear input values
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
    productImageInput.value = "";

    // Remove validation classes
    productNameInput.classList.remove("is-valid", "is-invalid");
    productPriceInput.classList.remove("is-valid", "is-invalid");
    productCategoryInput.classList.remove("is-valid", "is-invalid");
    productDescriptionInput.classList.remove("is-valid", "is-invalid");
    productImageInput.classList.remove("is-valid", "is-invalid");

    imagePreview.src = "";
    imagePreview.style.display = "none";

    }

});


function displayProducts(searchList) {
      if (!searchList) {
        searchList = productList;
    }
    var cartona = "";
      if (searchList.length == 0) {
        cartona = `
          <div class="col-12">
            <div class="text-center py-5">
                <i class="fa-solid fa-box-open fs-1 text-primary mb-3"></i>

                <h3 class="text-white mb-2">
                    No Products Found
                </h3>

                <p class="text-white-50 mb-0">
                    Try searching with another product name.
                </p>
            </div>
        </div>
        `;
    }
    for (var i = 0; i < searchList.length; i++) {
        cartona += ` 
         <!-- Product Card -->
          <div class="col-md-6 col-lg-4">
            <div class="product-card h-100 rounded-4 overflow-hidden">
              <div class="product-image-wrapper">
                <img
                  src="${searchList[i].image}"
                  class="product-image"
                  alt="${searchList[i].name}"
                />
              </div>
              <div class="p-4">
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <span class="product-category fw-semibold text-capitalize">${searchList[i].category}</span>
                </div>
                <h5 class="product-title mb-2">${searchList[i].highlightName ? searchList[i].highlightName : searchList[i].name}</h5>
                <p class="product-description mb-3">
                  ${searchList[i].description}
                </p>
                <div
                  class="d-flex justify-content-between align-items-center mb-4"
                >
                  <span class="product-price"> ${searchList[i].price} EGP </span>
                </div>
                <div class="d-flex gap-2">
                  <button onclick="editProduct(${searchList[i].id})" class="btn btn-primary flex-grow-1 text-white">
                    <i class="fa-solid fa-pen-to-square mx-1"></i> Edit
                  </button>
                  <button onclick="deleteProduct(${searchList[i].id})" class="btn btn-delete flex-grow-1">
                    <i class="fa-solid fa-trash mx-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

        `
    }
    document.getElementById("productContainer").innerHTML = cartona;
}

function deleteProduct(id) {
      for (var i = 0; i< productList.length; i++) {
        if (productList[i].id == id) {
            productList.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("productContainer", JSON.stringify(productList));
    displayProducts();
}

function editProduct(id){
    for (var i = 0 ; i < productList.length; i++) {

         if (productList[i].id == id) {
            currentProductId = id;
            productNameInput.value = productList[i].name;
            productPriceInput.value = productList[i].price;
            productCategoryInput.value = productList[i].category;
            productDescriptionInput.value = productList[i].description;
            imagePreview.src = productList[i].image;
            imagePreview.style.display = "block";
            break;
         }
    }

  
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.remove("d-none");

}
updateProductBtn.addEventListener("click", function () {
    updateProduct();
});

function updateProduct() {

     isNameValid = validateFormInputs(productNameInput);
    isPriceValid = validateFormInputs(productPriceInput);
    isCategoryValid = validateFormInputs(productCategoryInput);
    isDescriptionValid = validateFormInputs(productDescriptionInput);

     if (productImageInput.files[0]) {
         isImageValid = validateImage();
     }else {
        isImageValid = true;
    }
     if (
        isNameValid &&
        isPriceValid &&
        isCategoryValid &&
        isDescriptionValid &&
        isImageValid
    ) {
        var product = {
            id: currentProductId,
            name: productNameInput.value,
            price: Number(productPriceInput.value),
            category: productCategoryInput.value,
            description: productDescriptionInput.value
            
        }
        for (var i = 0; i < productList.length; i++) {
             if (productList[i].id == currentProductId) {
                    productList[i].name = product.name;
                    productList[i].price = product.price;
                    productList[i].category = product.category;
                    productList[i].description = product.description;
                     if (productImageInput.files[0]) {
                                productList[i].image =
                                    `assets/images/${productImageInput.files[0].name}`;
                            }
                        break;
             }
        }
        localStorage.setItem("productContainer", JSON.stringify(productList));
        displayProducts();
        addProductBtn.classList.remove("d-none");
        updateProductBtn.classList.add("d-none");
        productNameInput.value = "";
        productPriceInput.value = "";
        productCategoryInput.value = "";
        productDescriptionInput.value = "";
        productImageInput.value = "";
    
        productNameInput.classList.remove("is-valid", "is-invalid");
        productPriceInput.classList.remove("is-valid", "is-invalid");
        productCategoryInput.classList.remove("is-valid", "is-invalid");
        productDescriptionInput.classList.remove("is-valid", "is-invalid");
        productImageInput.classList.remove("is-valid", "is-invalid");
    
        imagePreview.src = "";
        imagePreview.style.display = "none";
    }

}


function searchProducts(keyword) {
    var searchList = [];

    for (var i = 0; i < productList.length; i++) {
        if (
            productList[i].name
                .toLowerCase()
                .includes(keyword.toLowerCase())
        ) {

             productList[i].highlightName = productList[i].name.replace(
                new RegExp(keyword, "gi"),
                `<span class="text-warning">${keyword}</span>`
            );

            searchList.push(productList[i]);
        }
    }

    // displayProducts(searchList);
      return searchList;
}


searchInput.addEventListener("input", function () {
    var searchList = searchProducts(searchInput.value);
    displayProducts(searchList);

});

sortSelect.addEventListener("change", function () {
    var sortValue = sortSelect.value;
    //  var sortedList = productList.slice();
    var sortedList = searchProducts(searchInput.value);
     if (sortValue == "priceLH") {
        sortedList.sort(function (a, b) {
          return a.price - b.price;
        });  
     }else if (sortSelect.value == "priceHL") {
        sortedList.sort(function (a, b) {
          return b.price - a.price;
        });  
     }else if (sortSelect.value == "nameAZ") {
        sortedList.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

     }else if (sortSelect.value == "nameZA") {
        sortedList.sort(function (a, b) {
            return b.name.localeCompare(a.name);
        });
     }

     displayProducts(sortedList);
});


var inputs = [
    productNameInput,
    productPriceInput,
    productDescriptionInput
];

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        validateFormInputs(this);
    });
}
productCategoryInput.addEventListener("change", function () {
    validateFormInputs(this);
});

function validateFormInputs(ele) {

    var regex = {
           productName: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
           productPrice: /^(6000|[6-9][0-9]{3}|[1-5][0-9]{4}|60000)$/,
           productCategory: /^(electronics|clothing|food|books)$/,
           productDescription: /^[\s\S]{4,250}$/,

    };

    var isValid = regex[ele.id].test(ele.value);

    console.log(ele.id, isValid, ele.nextElementSibling);

    if (isValid) {
        // ele.classList.replace("is-invalid", "is-valid");
           ele.classList.add("is-valid");
        ele.classList.remove("is-invalid");
        
    } else {
        // ele.classList.replace("is-valid", "is-invalid");
           ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
    }

    return isValid;
}


// 1 KiB 1024 Bytes
function validateImage() {
  var image = productImageInput.files[0];
  var errorMessage = productImageInput.nextElementSibling;
if (!image) {
    errorMessage.textContent = "Please select an image.";
     setImageValidation(false);

    return false;
}
if (!image.type.startsWith("image/")) {
    errorMessage.textContent = "Please select a valid image file.";
     setImageValidation(false);

    return false;
}
if (image.size > 2 * 1024 * 1024) {
    errorMessage.textContent = "Image size must not exceed 2MB.";
     setImageValidation(false);

    return false;
}
    setImageValidation(true);
    return true;

}
productImageInput.addEventListener("change", function () {
    var isValid= validateImage();
     var image = productImageInput.files[0];
     if (isValid) {
        imagePreview.src = URL.createObjectURL(image);
        imagePreview.style.display = "block";
    }else {
        imagePreview.src = "";
        imagePreview.style.display = "none";
    }

});

function setImageValidation(isValid) {
    if (isValid) {
        productImageInput.classList.add("is-valid");
        productImageInput.classList.remove("is-invalid");
    } else {
        productImageInput.classList.add("is-invalid");
        productImageInput.classList.remove("is-valid");
    }
}


