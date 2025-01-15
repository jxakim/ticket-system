

document.addEventListener("DOMContentLoaded", () => {
    const ticketid = document.getElementById('ticketid').value;
    const deleteButton = document.getElementById("delete");

    deleteButton.addEventListener("click", async () => {
        const userConfirmed = confirm("Are you sure you want to delete this item?");
        
        if (userConfirmed) {
            try {
                const response = await fetch(`/tickets/delete-ticket/${ticketid}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    console.log("Item deleted successfully!");
                    window.location.href = '/tickets';
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An unexpected error occurred.');
            }
        } else {
            console.log("Deletion canceled by the user.");
        }
    });


    const dropdownButton = document.getElementById("status-button");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    const statusColors = {
        Open: "rgb(68, 196, 68)",
        Pending: "rgb(204, 152, 74)",
        Closed: "rgb(190, 66, 66)",
    };

    const currentStatus = dropdownButton.getAttribute("data-current-status");
    dropdownButton.style.color = statusColors[currentStatus] || "#333";

    dropdownItems.forEach(item => {
        item.addEventListener("click", async () => {
            const newStatus = item.textContent;
            dropdownButton.textContent = item.textContent;
            dropdownButton.style.color = item.style.color;

            console.log(newStatus);

            try {
                const response = await fetch(`/tickets/update-status/${ticketid}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                if (response.ok) {
                    console.log(`Status updated to: ${newStatus}`);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                    alert('An error occurred while updating the status.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An unexpected error occurred.');
            }
        });
    });
});

