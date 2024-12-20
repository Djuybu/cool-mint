const mock_data = {
  products: [
    {
      id: "ck_1",
      name: "Bánh mì ngọt",
      price: 20000,
      imagePath: "images/banh mi.webp",
    },
    {
      id: "ck_2",
      name: "Bánh kem",
      price: 40000,
      imagePath: "images/bánh kem.jpg",
    },
    {
      id: "ck_ 3",
      name: "Bánh biscotti",
      price: 40000,
      imagePath: "images/biscotti.jpg",
    },
    {
      id: "ck_4",
      name: "Bánh rán",
      price: 40000,
      imagePath: "images/biscotti.jpg",
    },
  ],
  orders: [
    {
      id: 1,
      time: "2024-11-28T07:45:20",
      location: "Nhà 14, ngõ 22 Xuân Thuỷ",
      price: "350000",
      status: "Delivered",
    },
    {
      id: 2,
      time: "2024-11-28T10:15:30",
      location: "Số 5, đường Láng Hạ",
      price: "420000",
      status: "In Delivery",
    },
    {
      id: 3,
      time: "2024-11-29T09:00:00",
      location: "Căn hộ 1203, tòa nhà Times City",
      price: "500000",
      status: "Waiting for Payment",
    },
    {
      id: 4,
      time: "2024-11-30T18:20:10",
      location: "Số 2, ngõ 68 Nguyễn Văn Cừ",
      price: "600000",
      status: "Cancelled",
    },
  ],
  offers: [
    {
      name: "Mừng bạn mới ghé quán, giảm giá 40%",
      type: "percentage",
      code: "WELCOME_SWEET_40",
      value: 40,
      due: "2025-12-31",
    },
    {
      name: "Miễn phí vận chuyển, giảm 30k trên giá vận chuyển cho đơn từ 350k",
      type: "absolute",
      code: "FREESHIP_30",
      value: 30000,
      due: "2025-12-31",
    },
    {
      name: "Sweet deal: Giảm 20k cho đơn từ 350k",
      code: "SWEET_20",
      type: "absolute",
      value: 20000,
      due: "2025-12-31",
    },
    {
      name: "Đông ngọt cùng sweet: Giảm 40k cho đơn từ 400k",
      code: "WINTER_SWEET_40",
      type: "absolute",
      value: 40000,
      due: "2025-12-31",
    },
  ],
};

const addNewProduct = () => {
  overlay = createProductOverlay(undefined);
  const submitButton = overlay.querySelector("button#submit-btn");
  submitButton.innerText = "Thêm sản phẩm";
  const index = mock_data.products.length;
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newProductName = overlay.querySelector("input.name-input").value;
    const newProductPrice = overlay.querySelector("input.price-input").value;
    const newProductImagePath = overlay.querySelector("img.form_img").src;
    const product = {
      id: "ck_" + index,
      name: newProductName,
      price: newProductPrice,
      imagePath: newProductImagePath,
    };
    mock_data["products"].push(product);
    loadProductToTable(product, index);
    deleteOverlay();
  });
  document.body.appendChild(overlay);
};

const addNewOffer = () => {
  console.log("Hi");
  const overlay = createOfferOverlay(undefined);
  const submitButton = overlay.querySelector("button#submit-btn");
  submitButton.innerText = "Thêm sản phẩm";
  const index = mock_data.offers.length;
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newName = overlay.querySelector("input.name-input").value.trim();
    const newCode = overlay.querySelector("input.code-input").value.trim();
    const newType = overlay.querySelector("select.type-select").value;
    const newValue = parseFloat(
      overlay.querySelector("input.value-input").value.trim()
    );
    const newDue = overlay.querySelector("input.due-input").value.trim();
    const newOffer = {
      name: newName,
      code: newCode,
      type: newType,
      value: newValue,
      due: newDue,
    };
    mock_data.offers.push(newOffer);
    loadOfferToTable(newOffer, index);
    deleteOverlay();
  });
  document.body.appendChild(overlay);
};

const addNewOrder = () => {
  const overlay = createOrderOverlay(undefined);
  const submitButton = overlay.querySelector("button#submit-btn");
  submitButton.innerText = "Thêm đơn hàng";
  const index = mock_data.orders.length;
  
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newOrderTime = overlay.querySelector("input.time-input").value.trim();
      const newOrderLocation = overlay.querySelector("input.location-input").value.trim();
      const newOrderPrice = parseFloat(overlay.querySelector("input.price-input").value.trim());
      const newOrderStatus = overlay.querySelector("select.type-select").value;

      console.log(newOrderTime, newOrderLocation, newOrderPrice, newOrderStatus);
      

      if (!newOrderTime) throw new Error("Thời gian không được để trống.");
      if (!newOrderLocation) throw new Error("Địa chỉ không được để trống.");
      if (isNaN(newOrderPrice) || newOrderPrice <= 0) throw new Error("Giá phải là số lớn hơn 0.");
      if (!newOrderStatus) throw new Error("Trạng thái không được để trống.");

      const order = {
        id: "order_" + index,
        time: newOrderTime,
        location: newOrderLocation,
        price: newOrderPrice,
        status: newOrderStatus,
      };

      mock_data["orders"].push(order);
      loadOrderToTable(order, index);
      deleteOverlay();
  });

  document.body.appendChild(overlay);
};

const tableBody = document.querySelector("#products tbody");
const offerTableBody = document.querySelector("#offers tbody");
const newProductButton = document.getElementById("add-product");
newProductButton.addEventListener("click", addNewProduct);

const newOfferButton = document.getElementById("add-offer");
newOfferButton.addEventListener("click", addNewOffer);

const newOrderButton = document.getElementById("add-order");
newOrderButton.addEventListener("click", addNewOrder)

// Demo hoạt động lấy dữ liệu từ server của trang Web

// thêm listener để load dữ liệu từ cơ sở dữ liệu vào bảng
document.addEventListener("DOMContentLoaded", () => {
  // fetch dữ liệu ở đây
  // ...
  // khi fetch xong, load data lên giao diện admin
  const products = mock_data["products"];
  // duyệt qua các sản phẩm
  products.forEach((product, index) => {
    loadProductToTable(product, index);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const offers = mock_data["offers"];
  // duyệt qua các sản phẩm
  offers.forEach((offer, index) => {
    loadOfferToTable(offer, index);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const orders = mock_data["orders"];
  orders.forEach((order, index) => {
    loadOrderToTable(order, index);
  });
});

// hàm đẩy sản phẩm lên bản
const loadProductToTable = (product, index) => {
  const newRow = document.createElement("tr");
  newRow.className = "table_row";
  newRow.id = "product_" + index;

  // số thứ tự
  const idCell = document.createElement("td");
  idCell.innerText = index + 1;
  idCell.className = "product-id";

  // tên bánh
  const nameCell = document.createElement("td");
  nameCell.className = "product-name";
  nameCell.innerText = product["name"];

  // ảnh
  const imageCell = document.createElement("td");

  const image = document.createElement("img");
  image.src = product["imagePath"];
  image.style.width = 50;
  image.alt = product["name"];
  imageCell.appendChild(image);

  //giá bánh
  const priceCell = document.createElement("td");
  priceCell.innerText = format(product["price"]);

  //action panel
  const actionCell = document.createElement("td");

  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerText = "Sửa";

  editButton.addEventListener("click", () => editProduct(product, index));

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerText = "Xoá";
  deleteButton.addEventListener("click", () => deleteProduct(product["name"]));
  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);

  newRow.appendChild(idCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(imageCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(actionCell);

  tableBody.appendChild(newRow);
};

const loadOfferToTable = (offer, index) => {
  const newRow = document.createElement("tr");
  newRow.className = "table_row";
  newRow.id = "offer_" + index;

  // số thứ tự
  const idCell = document.createElement("td");
  idCell.innerText = index + 1;
  idCell.className = "product-id";

  // tên offer
  const nameCell = document.createElement("td");
  nameCell.className = "offer-name";
  nameCell.innerText = offer["name"];

  // code của offer (để user nhập vô)
  const codeCell = document.createElement("td");
  codeCell.className = "offer-code";
  codeCell.innerText = offer["code"];

  //giá trị offer
  const valueCell = document.createElement("td");
  valueCell.className = "offer-value";
  if (offer["type"] === "absolute") {
    valueCell.innerText = format(Number(offer["value"]));
  } else {
    valueCell.innerText = offer["value"] + "%";
  }

  //hạn của offer
  const dueCell = document.createElement("td");
  dueCell.className = "offer-due";
  dueCell.innerText = offer["due"];

  //action panel
  const actionCell = document.createElement("td");

  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerText = "Sửa";

  editButton.addEventListener("click", () => editOffer(offer, index));

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerText = "Xoá";
  deleteButton.addEventListener("click", () => deleteOffer(offer["code"]));

  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);

  newRow.appendChild(idCell);
  newRow.appendChild(nameCell);
  newRow.appendChild(codeCell);
  newRow.appendChild(valueCell);
  newRow.appendChild(dueCell);
  newRow.appendChild(actionCell);

  offerTableBody.appendChild(newRow);
};

const loadOrderToTable = (order, index) => {
  const tableBody = document.querySelector("#orders tbody");

  const newRow = document.createElement("tr");
  newRow.className = "table_row";
  newRow.id = "order_" + index;

  const idCell = document.createElement("td");
  idCell.innerText = index + 1;
  idCell.className = "order-id";

  // Thời gian đặt hàng
  const timeCell = document.createElement("td");
  timeCell.className = "order-time";
  timeCell.innerText = new Date(order["time"]).toLocaleString("vi-VN");

  // Địa chỉ giao hàng
  const locationCell = document.createElement("td");
  locationCell.className = "order-location";
  locationCell.innerText = order["location"];

  // Giá đơn hàng
  const priceCell = document.createElement("td");
  priceCell.className = "order-price";
  priceCell.innerText = format(Number(order["price"]));

  // Trạng thái đơn hàng
  const statusCell = document.createElement("td");
  statusCell.className = "order-status";
  statusCell.innerText = order["status"];

  // Action panel
  const actionCell = document.createElement("td");
  actionCell.className = "order-actions";

  const editButton = document.createElement("button");
  editButton.className = "edit-btn";
  editButton.innerText = "Sửa";
  editButton.addEventListener("click", () => editOrder(order, index));

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerText = "Xoá";
  deleteButton.addEventListener("click", () => deleteOrder(order["id"]));

  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);

  newRow.appendChild(idCell);
  newRow.appendChild(timeCell);
  newRow.appendChild(locationCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(statusCell);
  newRow.appendChild(actionCell);

  tableBody.appendChild(newRow);
};




const deleteOverlay = () => {
  overlay = document.querySelector("div.overlay");
  overlay.remove();
};

const editOffer = (offer, index) => {
  const overlay = createOfferOverlay(offer);
  const submitButton = overlay.querySelector("button#submit-btn");
  submitButton.innerText = "Cập nhật ưu đãi";
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      // Lấy giá trị từ các input
      const newName = overlay.querySelector("input.name-input").value.trim();
      const newCode = overlay.querySelector("input.code-input").value.trim();
      const newType = overlay.querySelector("select.type-select").value;
      const newValue = parseFloat(
        overlay.querySelector("input.value-input").value.trim()
      );
      const newDue = overlay.querySelector("input.due-input").value.trim();

      // Kiểm tra giá trị rỗng
      if (!newName) throw new Error("Tên ưu đãi không được để trống.");
      if (!newCode) throw new Error("Mã ưu đãi không được để trống.");
      if (!newDue) throw new Error("Hạn ưu đãi không được để trống.");

      // Kiểm tra giá trị của `newValue` dựa trên `newType`
      if (isNaN(newValue) || newValue <= 0)
        throw new Error("Giá trị ưu đãi phải là số lớn hơn 0.");
      if (newType === "percentage" && newValue > 100) {
        throw new Error(
          "Nếu loại ưu đãi là 'percentage', giá trị không được vượt quá 100."
        );
      }

      // Cập nhật hàng trong bảng
      const changeRow = document.getElementById("offer_" + index);
      const cells = Array.from(changeRow.querySelectorAll("td"));
      cells[1].innerText = newName;
      cells[2].innerText = newCode;
      if (newType === "absolute") {
        cells[3].innerText = format(Number(newValue));
      } else {
        cells[3].innerText = newValue + "%";
      }
      cells[4].innerText = newDue;
      deleteOverlay();
      console.log("Cập nhật thành công!");
    } catch (error) {
      // Hiển thị thông báo lỗi
      console.error("Lỗi:", error.message);
      alert(error.message);
    }
  });
  document.body.appendChild(overlay);
};

const createOfferOverlay = (offer) => {
  if (offer === undefined) {
    offer = {
      name: "",
      code: "",
      type: "",
      value: "",
      due: "",
    };
  }
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const editBox = document.createElement("div");
  editBox.className = "offer-edit-box";
  const editForm = document.createElement("form");
  editForm.className = "edit-form";

  const leftZone = document.createElement("div");
  leftZone.className = "left_zone";

  const rightZone = document.createElement("div");
  rightZone.className = "right_zone";

  const offerName = document.createElement("div");
  offerName.innerText = "Nhập tên ưu đãi";
  const offerNameInput = document.createElement("input");
  offerNameInput.value = offer["name"];
  offerNameInput.className = "name-input";

  const offerCode = document.createElement("div");
  offerCode.innerText = "Nhập tên ưu đãi";
  const offerCodeInput = document.createElement("input");
  offerCodeInput.value = offer["code"];
  offerCodeInput.className = "code-input";

  const type = document.createElement("div");

  type.innerText = "Chọn loại ưu đãi";

  const typeSelect = document.createElement("select");
  typeSelect.className = "type-select";

  // Tạo các tùy chọn (options)
  const absoluteOption = document.createElement("option");
  absoluteOption.value = "absolute";
  absoluteOption.innerText = "Absolute";

  const percentageOption = document.createElement("option");
  percentageOption.value = "percentage";
  percentageOption.innerText = "Percentage";

  // Thêm các tùy chọn vào select
  typeSelect.appendChild(absoluteOption);
  typeSelect.appendChild(percentageOption);

  // Gán giá trị mặc định từ `offer["type"]`
  typeSelect.value = offer["type"] || "absolute"; // Nếu không có giá trị thì mặc định là "absolute"

  const value = document.createElement("div");
  value.innerText = "Nhập giá trị ưu đãi";
  const valueInput = document.createElement("input");
  valueInput.value = offer["value"];
  valueInput.className = "value-input";

  const due = document.createElement("div");
  due.innerText = "Nhập hạn ưu đãi";
  const dueInput = document.createElement("input");
  dueInput.type = "date";
  dueInput.className = "due-input";

  if (offer["due"]) {
    const dueDate = new Date(offer["due"]);
    if (!isNaN(dueDate)) {
      dueInput.value = dueDate.toISOString().split("T")[0];
    } else {
      console.error("Ngày không hợp lệ:", offer["due"]);
      dueInput.value = "";
    }
  } else {
    dueInput.value = "";
  }

  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";

  const closeButton = document.createElement("i");
  closeButton.className = "fi fi-br-cross exit-btn";
  closeButton.addEventListener("click", () => {
    deleteOverlay();
  });

  leftZone.appendChild(offerName);
  leftZone.appendChild(offerNameInput);

  leftZone.appendChild(offerCode);
  leftZone.appendChild(offerCodeInput);

  leftZone.appendChild(type);
  leftZone.appendChild(typeSelect);

  leftZone.appendChild(value);
  leftZone.appendChild(valueInput);

  leftZone.appendChild(due);
  leftZone.appendChild(dueInput);

  editForm.appendChild(leftZone);
  editForm.appendChild(rightZone);

  editForm.appendChild(submitButton);
  editBox.appendChild(closeButton);
  editBox.appendChild(editForm);
  overlay.appendChild(editBox);
  return overlay;
};

const editProduct = (product, index) => {
  const overlay = createProductOverlay(product);
  const submitButton = overlay.querySelector("button#submit-btn");

  submitButton.innerText = "Cập nhật thông tin";
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newName = overlay.querySelector("input.name-input").value;
    const newPrice = Number(overlay.querySelector("input.price-input").value);
    const newImage = overlay.querySelector("img.form_img").src;

    const changeRow = document.getElementById("product_" + index);
    console.log(newName, newImage, newPrice);

    const cells = Array.from(changeRow.querySelectorAll("td"));
    console.log(cells);
    const image = cells[2].querySelector("img");
    cells[1].innerText = newName;
    image.src = newImage;
    cells[3].innerText = format(newPrice);
    deleteOverlay();
  });
  document.body.appendChild(overlay);
};

const createProductOverlay = (product) => {
  if (product === undefined) {
    product = {
      name: "",
      price: "",
      imagePath: "images/logo.png",
    };
  }
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const editBox = document.createElement("div");
  editBox.className = "edit-box";
  const editForm = document.createElement("form");
  editForm.className = "edit-form";

  const leftZone = document.createElement("div");
  leftZone.className = "left_zone";

  const rightZone = document.createElement("div");
  rightZone.className = "right_zone";

  const cakeName = document.createElement("div");
  cakeName.innerText = "Nhập tên bánh";
  const cakeNameInput = document.createElement("input");
  cakeNameInput.value = product["name"];
  cakeNameInput.className = "name-input";

  const price = document.createElement("div");
  price.innerText = "Nhập giá bánh";
  const priceInput = document.createElement("input");
  priceInput.id = "input";
  priceInput.value = product["price"];
  priceInput.className = "price-input";

  const image = document.createElement("img");
  image.className = "form_img";
  image.src = product["imagePath"];

  const imageInputButton = document.createElement("button");
  imageInputButton.innerText = "Cập nhật hình ảnh";
  imageInputButton.addEventListener("click", (e) => {
    e.preventDefault();
    imageInput.click();
  });
  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.className = "form_img_input";
  imageInput.placeholder = "Upload ảnh";
  imageInput.addEventListener("change", (e) => {
    const imageData = e.target.files[0];
    if (imageData) {
      const imageURL = URL.createObjectURL(imageData);
      console.log(imageURL);
      image.src = imageURL;
    }
  });

  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";

  const closeButton = document.createElement("i");
  closeButton.className = "fi fi-br-cross exit-btn";
  closeButton.addEventListener("click", () => {
    deleteOverlay();
  });

  leftZone.appendChild(cakeName);
  leftZone.appendChild(cakeNameInput);

  leftZone.appendChild(price);
  leftZone.appendChild(priceInput);

  rightZone.appendChild(image);
  rightZone.appendChild(imageInput);
  rightZone.appendChild(imageInputButton);

  editForm.appendChild(leftZone);
  editForm.appendChild(rightZone);

  editForm.appendChild(submitButton);
  editBox.appendChild(closeButton);
  editBox.appendChild(editForm);
  overlay.appendChild(editBox);
  return overlay;
};

const createOrderOverlay = (order) => {
  if (order === undefined) {
    order = {
      id: "",
      time: "",
      location: "",
      price: "",
      status: "",
    };
  }
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const editBox = document.createElement("div");
  editBox.className = "order-edit-box";
  const editForm = document.createElement("form");
  editForm.className = "order-edit-form";

  const leftZone = document.createElement("div");
  leftZone.className = "left_zone";

  // Tạo các trường thông tin trong left_zone

  const timeLabel = document.createElement("div");
  timeLabel.innerText = "Thời gian đặt hàng";
  const timeInput = document.createElement("input");
  timeInput.value = order["time"];
  timeInput.type = "datetime-local"; // Loại input đặc biệt cho thời gian
  timeInput.className = "time-input";

  const locationLabel = document.createElement("div");
  locationLabel.innerText = "Địa chỉ";
  const locationInput = document.createElement("input");
  locationInput.value = order["location"];
  locationInput.className = "location-input";

  const priceLabel = document.createElement("div");
  priceLabel.innerText = "Giá tiền";
  const priceInput = document.createElement("input");
  priceInput.value = order["price"];
  priceInput.className = "price-input";

  const statusLabel = document.createElement("div");
  statusLabel.innerText = "Trạng thái";
  const statusInput = document.createElement("select");
  statusInput.className = "type-select";
  ["Delivered", "In Progress", "Pending", "Cancelled"].forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.innerText = status;
    if (order["status"] === status) {
      option.selected = true;
    }
    statusInput.appendChild(option);
  });

  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";
  submitButton.innerText = "Lưu";

  const closeButton = document.createElement("i");
  closeButton.className = "fi fi-br-cross exit-btn";
  closeButton.addEventListener("click", () => {
    deleteOverlay();
  });

  // Append tất cả các phần tử vào leftZone

  leftZone.appendChild(timeLabel);
  leftZone.appendChild(timeInput);

  leftZone.appendChild(locationLabel);
  leftZone.appendChild(locationInput);

  leftZone.appendChild(priceLabel);
  leftZone.appendChild(priceInput);

  leftZone.appendChild(statusLabel);
  leftZone.appendChild(statusInput);

  // Add leftZone và submitButton vào form
  editForm.appendChild(leftZone);
  editForm.appendChild(submitButton);

  // Add closeButton và editForm vào editBox
  editBox.appendChild(closeButton);
  editBox.appendChild(editForm);

  // Add editBox vào overlay
  overlay.appendChild(editBox);

  return overlay;
}

const editOrder = (order, index) => {
  const overlay = createOrderOverlay(order);
  const submitButton = overlay.querySelector("button#submit-btn");
  submitButton.innerText = "Cập nhật đơn hàng";
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      const newTime = overlay.querySelector("input.time-input").value.trim();
      const newLocation = overlay.querySelector("input.location-input").value.trim();
      const newPrice = parseFloat(overlay.querySelector("input.price-input").value.trim());
      const newStatus = overlay.querySelector("select.status-select").value;

      if (!newTime) throw new Error("Thời gian không được để trống.");
      if (!newLocation) throw new Error("Địa chỉ không được để trống.");
      if (isNaN(newPrice) || newPrice <= 0) throw new Error("Giá phải là số lớn hơn 0.");
      if (!newStatus) throw new Error("Trạng thái không được để trống.");

      const changeRow = document.getElementById("order_" + index);
      const cells = Array.from(changeRow.querySelectorAll("td"));
      cells[1].innerText = new Date(newTime).toLocaleString("vi-VN");
      cells[2].innerText = newLocation;
      cells[3].innerText = format(Number(newPrice));
      cells[4].innerText = newStatus;

      deleteOverlay();
      console.log("Cập nhật đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi:", error.message);
      alert(error.message);
    }
  });
  document.body.appendChild(overlay);
};

const deleteProduct = (name) => {
  console.log(name);
  const productLines = document.querySelectorAll("tr.table_row");
  console.log(productLines);

  productLines.forEach((line, index) => {
    const productName = line.querySelector("td.product-name").innerText;
    const productIndex = line.querySelector("td.product-id");
    console.log(productIndex, productName);

    if (productName === name) {
      line.remove();
    }
    productIndex.innerText = index;
  });
};

const format = (price) => {
  return price.toLocaleString("vi-VN") + "đ";
};
