//Script to filter admin products table
document.getElementById("category-filter").addEventListener("change", function() {
    const selectedCategory = this.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const category = row.querySelector(".category").textContent.toLowerCase();
        
        if (selectedCategory === "all" || category === selectedCategory) {
            row.style.display = ""; 
        } else {
            row.style.display = "none"; 
        }
    });
});