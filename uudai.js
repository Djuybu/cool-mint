const editButtons = document.querySelectorAll('.edit-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');
const editForm = document.getElementById('edit-form');
const tableBody = document.querySelector('#uudai-hien-co tbody');
const addNewOfferButton = document.getElementById('add-new-offer');

let isAddingOffer = false; // Theo dõi quá trình thêm


editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.id;
        const row = button.closest('tr');

        tableRows.forEach(tr => {
            if (tr !== row) {
                tr.style.display = 'none';
            }
        });

        editForm.innerHTML = `
            <h3>Chỉnh sửa sản phẩm ID: ${productId}</h3>
            <form id="product-edit-form">
                Tên sản phẩm: <input type="text" name="ten_san_pham" value="${row.cells[1].textContent}"><br>
                Giá: <input type="text" name="gia" value="${row.cells[3].textContent}"><br>
                Mô tả: <textarea name="mo_ta">${row.cells[4].textContent}</textarea><br>
                <button type="submit">Cập nhật</button>
                <button type="button" id="cancel-edit">Hủy</button>
            </form>
        `;

        editForm.style.display = 'block';

        document.getElementById('cancel-edit').addEventListener('click', () => {
            editForm.style.display = 'none';
            editForm.innerHTML = '';
            tableRows.forEach(tr => tr.style.display = '');
        });

        document.getElementById('product-edit-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);

            fetch('/your-update-api-endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => { /* Handle response */ })
            .catch(error => console.error('Error:', error));

            editForm.style.display = 'none';
            editForm.innerHTML = '';
            tableRows.forEach(tr => tr.style.display = '');
        });
    });
});


function addNewRow(offerData = {}) {
    const newRow = tableBody.insertRow();
    const cells = [];
    for (let i = 0; i < 6; i++) {
        cells.push(newRow.insertCell());
    }

    cells[0].textContent = offerData.id || '';
    cells[1].innerHTML = `<input type="text" name="ten_uudai" value="${offerData.ten_uudai || ''}">`;
    cells[2].innerHTML = `<input type="text" name="mo_ta" value="${offerData.mo_ta || ''}">`;
    cells[3].innerHTML = `<input type="date" name="ngay_bat_dau" value="${offerData.ngay_bat_dau || ''}">`;
    cells[4].innerHTML = `<input type="date" name="ngay_ket_thuc" value="${offerData.ngay_ket_thuc || ''}">`;
    

    const actionsCell = cells[5];  
    actionsCell.innerHTML = offerData.id ? 
        `<button class="edit-btn" data-id="${offerData.id}">+</button> <button class="delete-btn" data-id="${offerData.id}">Xóa</button>` 
        : `<button class="edit-btn">+</button> <button class="delete-btn">Hủy</button>`;


    // Gắn lại event listeners 
    if (offerData.id) {
        const newEditButton = actionsCell.querySelector('.edit-btn');
        newEditButton.addEventListener('click', () => {

        });

        const newDeleteButton = actionsCell.querySelector('.delete-btn');
        newDeleteButton.addEventListener('click', () => {
          if (confirm(`Are you sure you want to delete offer ID ${newDeleteButton.dataset.id}?`)) {

          }
        });
    }
}



addNewOfferButton.addEventListener('click', () => {
    if (!isAddingOffer) {
        addNewRow();
        isAddingOffer = true;

        const newRow = tableBody.rows[tableBody.rows.length - 1];
        const saveButton = newRow.querySelector('.save-btn');
        const cancelButton = newRow.querySelector('.cancel-btn');

        saveButton.addEventListener('click', () => {
            isAddingOffer = false;
        });

        cancelButton.addEventListener('click', () => {
            newRow.remove();
            isAddingOffer = false;
        });
    }
});

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete offer ID ${button.dataset.id}?`)) {
        }

    });
});