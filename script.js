document.addEventListener('DOMContentLoaded', function () {
    let totalItems = 0;
    let totalBill = 0;
    const maxItems = 8;

    const updateTotalItems = () => {
        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-items-bill').textContent = totalItems;

    }

    const updateTotalBill = () => {
        document.getElementById('total-bill').textContent = `Total Bill: Rs.${totalBill}`;
    }
    

    
    const addToCart = (name, price) => {
        if (totalItems < maxItems) {
            totalItems++;
            totalBill += price;
            updateTotalItems();
            updateTotalBill();
    
            // Check if the chocolate already exists in the order details table
            const orderDetails = document.getElementById('order-details');
            let existingRow = null;
            for (const row of orderDetails.rows) {
                if (row.cells[0].textContent === name) {
                    existingRow = row;
                    break;
                }
            }
    
            if (existingRow) {
                // If the chocolate already exists, update its quantity and price
                const quantityCell = existingRow.cells[1];
                const priceCell = existingRow.cells[2];
    
                let quantity = parseInt(quantityCell.textContent);
                quantity++;
                quantityCell.textContent = quantity;
    
                const totalPrice = quantity * price;
                priceCell.textContent = `Rs.${totalPrice}`;
            } else {
                // If the chocolate is not in the table, add a new row
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${name}</td>
                    <td>1</td>
                    <td>Rs.${price}</td>
                `;
                orderDetails.appendChild(newRow);
            }
        } else {
            alert('You can only add up to 8 items to the cart.');
        }
    }
    

    const buttons = document.querySelectorAll('.btn.btn-outline-dark');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            addToCart(name, price);
        });
    });
});
