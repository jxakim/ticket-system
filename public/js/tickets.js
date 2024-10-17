function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}




const searchInput = document.getElementById('search');
const ticketContainer = document.querySelector('.ticket-container');

console.log(searchInput);

searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value;

  console.log(searchQuery);
});