const SearchElement = document.getElementById('search');

document.addEventListener('DOMContentLoaded', () => {
  fetch('/tickets/get-tickets')
    .then(response => response.json())
    .then(data => {
      console.log('All tickets:', data.results);
      displayTickets(data.results);
    })
    .catch(err => console.error('Error:', err));
});

SearchElement.addEventListener('input', () => {

  const searchQuery = SearchElement.value;

  fetch(`/tickets/search?query=${encodeURIComponent(searchQuery)}`)
    .then(response => response.json())
    .then(data => {
      
      displayTickets(data.results);
    })
    .catch(err => console.error('Error:', err));
    
});

function displayTickets(tickets) {
  const ticketList = document.getElementById('ticket-list');
  const ticketCount = document.getElementById('tickets-title');

  ticketList.innerHTML = '';
  ticketCount.innerHTML = `Tickets (${tickets.length})`;

  if (tickets.length == 0) {

    const text = document.createElement('p');
    text.innerHTML = "No tickets available..";
    text.style.textAlign = "center";
    text.style.color = "#000000";
    text.style.fontWeight = "normal";
    text.style.paddingTop = "100px";

    ticketList.appendChild(text);

  } else {

    tickets.forEach(ticket => {

      const ticketElement = document.createElement('div');
      ticketElement.classList.add('ticket');
      ticketElement.innerHTML =
      `
        <p>${ticket._id}</p>
        <p>${ticket.title}</p>
        <p>${ticket.description}</p>
        <p>${new Date(ticket.date).toLocaleDateString()}</p>
      `;

      ticketElement.addEventListener('click', () => {
        window.location.href = `/tickets/open-ticket/${ticket._id}`;
      });

      ticketList.appendChild(ticketElement);

    });
  }
}
