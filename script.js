// Production Chart
new Chart(document.getElementById("productionChart"), {
    type: "bar",
    data: {
        labels:["Jan","Feb","Mar","Apr","May","Jun"],
        datasets:[{
            label:"Production KG",
            data:[18000,19450,20100,22300,24850,23400]
        }]
    }
});

// Sales Revenue
new Chart(document.getElementById("salesChart"), {
    type:"line",
    data:{
        labels:["Jan","Feb","Mar","Apr","May","Jun"],
        datasets:[{
            label:"Revenue",
            data:[12,14,15,16,19,17]
        }]
    }
});

// Category
new Chart(document.getElementById("categoryChart"), {
    type:"doughnut",
    data:{
        labels:["Bakery","Snacks","Drinks","Packed Food"],
        datasets:[{
            data:[40,25,20,15]
        }]
    }
});

// Customer
new Chart(document.getElementById("customerChart"), {
    type:"line",
    data:{
        labels:["Jan","Feb","Mar","Apr","May"],
        datasets:[{
            data:[50,60,72,80,92]
        }]
    }
});

// Cost
new Chart(document.getElementById("costChart"), {
    type:"bar",
    data:{
        labels:["Jan","Feb","Mar","Apr","May"],
        datasets:[{
            data:[10,12,14,15,18]
        }]
    }
});

// Growth
new Chart(document.getElementById("growthChart"), {
    type:"line",
    data:{
        labels:["Jan","Feb","Mar","Apr","May"],
        datasets:[{
            data:[4,7,10,12,15]
        }]
    }
});
