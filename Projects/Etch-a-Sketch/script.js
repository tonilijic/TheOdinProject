
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256); // Red component
    const g = Math.floor(Math.random() * 256); // Green component
    const b = Math.floor(Math.random() * 256); // Blue component
    return `rgb(${r}, ${g}, ${b})`;
}


function grid() {
    let numb;
    do {
        numb = prompt("Enter the number of elements for your grid");
    } while (isNaN(numb) || numb <= 0 || !Number.isInteger(parseFloat(numb)));

    numb = parseInt(numb); // Convert to an integer
    let container = document.querySelector('.container');
    container.innerHTML = ''; // Clear previous grid


   if (numb > 100 ){
    alert("Set number to be less than 100");
    numb = prompt("Enter the number of elements for your grid");
    }

    for (let i = 0; i < numb * numb; i++) {
        let item = document.createElement('div');
        item.className = "item";
        container.appendChild(item);

        requestAnimationFrame(() => {
            item.classList.add('show');
        });

        // Add event listeners for hover effect
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = getRandomRGB(); // Change color on hover
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = getRandomRGB(); // Revert color when not hovering
        });
    
       
    }
}



const button = document.querySelector("button");
button.addEventListener('click', grid);