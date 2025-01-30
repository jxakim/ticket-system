document.addEventListener("DOMContentLoaded", () => {
    const ticketid = document.getElementById('ticketid').value;

    /* SAVE BUTTON */
    const saveButton = document.getElementById('save');

    saveButton.addEventListener('click', async () => {
        const configTitle = document.getElementById('title').value;
        const configDesc = document.getElementById('description').value;
        const configStatus = document.getElementById("status-button").innerText;
        const configActive = document.getElementById('active').checked;

        try {
            const response = await fetch(`/tickets/update-config/${ticketid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: configTitle,
                    description: configDesc,
                    status: configStatus,
                    active: configActive,
                }),
            });
        
            if (response.ok) {
                const responseData = await response.json();
                console.log('Config updated:', responseData);
                location.reload();
            } else {
                const errorData = await response.json();
                console.error('Server Error:', errorData);
            }
        } catch (error) {
            console.error('Unexpected Error:', error.message);
        }

        location.reload();
        
    });
    

    /* DELETE BUTTON */

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

    /* CANCEL BUTTON */

    const cancelButton = document.getElementById("cancel");

    cancelButton.addEventListener("click", async () => {
        window.location.href = '/tickets';
    });



    /* STATUS DROPDOWN */

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
            dropdownButton.textContent = item.textContent;
            dropdownButton.style.color = item.style.color;
        });
    });

    
});

