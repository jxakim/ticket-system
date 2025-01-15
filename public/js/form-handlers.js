function openForm() {
    document.getElementById("sidebar").style.right = "0px";
}

function closeForm() {
    document.getElementById("sidebar").style.right = "-1000px";
}


document.addEventListener("DOMContentLoaded", () => {

    const deleteButton = document.getElementById("delete");
    const ticketid = document.getElementById('ticketid').value;

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
                    alert("Ticket deleted successfully!");
                    window.location.href = '/tickets'; // Redirect to tickets list
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                    alert('An error occurred while deleting the item.');
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

    // Set initial button color based on current status
    const statusColors = {
        Open: "rgb(68, 196, 68)",
        Pending: "rgb(204, 152, 74)",
        Closed: "rgb(190, 66, 66)",
    };
    const currentStatus = dropdownButton.getAttribute("data-current-status");
    dropdownButton.style.color = statusColors[currentStatus] || "#333";

    dropdownItems.forEach(item => {
        item.addEventListener("click", async () => {
            const newStatus = item.getAttribute("data-value");
            dropdownButton.textContent = item.textContent;
            dropdownButton.style.color = item.style.color;

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

