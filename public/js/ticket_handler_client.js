document.addEventListener('DOMContentLoaded', () => {
  fetch('/tickets/get-tickets')
    .then(response => response.json())
    .then(data => {
      displayTickets(data.results);
    })
    .catch(err => console.error('Error:', err));
});

function createTicketElement(ticket) {
  const ticketElement = document.createElement('div');
  ticketElement.classList.add('ticket');
  if (!ticket.active) {
    ticketElement.classList.add('inactive');
    ticketElement.innerHTML = `
      <p>${ticket._id}</p>
      <p></p>
      <p>${ticket.title}</p>
      <p>${ticket.description}</p>
      <p>${new Date(ticket.date).toLocaleDateString()}</p>
  `;
  } else {
    ticketElement.innerHTML = `
      <p>${ticket._id}</p>
      <p>${ticket.status}</p>
      <p>${ticket.title}</p>
      <p>${ticket.description}</p>
      <p>${new Date(ticket.date).toLocaleDateString()}</p>
  `;
  }
  ticketElement.addEventListener('click', () => {
      window.location.href = `/tickets/open-ticket/${ticket._id}`;
  });
  return ticketElement;
}

function displayTickets(tickets) {
  const ticketList = document.getElementById('ticket-list');
  const ticketCount = document.getElementById('tickets-title');

  ticketList.innerHTML = '';
  ticketCount.innerHTML = `Tickets (${tickets.length})`;

  if (tickets.length === 0) {
      ticketList.innerHTML = `<p class="no-tickets">No tickets available...</p>`;
  } else {
      tickets.forEach(ticket => {
          ticketList.appendChild(createTicketElement(ticket));
      });
  }
}

/* Search handler */

const SearchElement = document.getElementById('search');

SearchElement.addEventListener('input', () => {

  const searchQuery = SearchElement.value;

  fetch(`/tickets/search?query=${encodeURIComponent(searchQuery)}`)
    .then(response => response.json())
    .then(data => {
      
      displayTickets(data.results);
    })
    .catch(err => console.error('Error:', err));
    
});