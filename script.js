// Bar Chart
new Chart(document.getElementById("salesChart"), {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
            label: "Monthly Sales",
            data: [50000, 70000, 65000, 90000, 80000]
        }]
    }
});

// Line Chart
new Chart(document.getElementById("profitChart"), {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
            label: "Profit Trend",
            data: [10000, 15000, 12000, 25000, 30000]
        }]
    }
});

// Pie Chart
new Chart(document.getElementById("categoryChart"), {
    type: "pie",
    data: {
        labels: ["Electronics", "Furniture", "Clothing"],
        datasets: [{
            data: [45, 30, 25]
        }]
    }
});
