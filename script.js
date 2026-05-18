// Weekly Production Chart
new Chart(document.getElementById("productionChart"), {
    type: "bar",
    data: {
        labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        datasets:[{
            label:"Food Produced",
            data:[100,150,180,120,200,220,250]
        }]
    }
});

// Production Target Circle
new Chart(document.getElementById("targetChart"), {
    type:"doughnut",
    data:{
        labels:["Completed","Remaining"],
        datasets:[{
            data:[75,25]
        }]
    }
});

// Monthly Growth
new Chart(document.getElementById("growthChart"), {
    type:"bar",
    data:{
        labels:["Jan","Feb","Mar","Apr","May","Jun"],
        datasets:[{
            label:"Growth %",
            data:[10,15,20,25,30,35]
        }]
    }
});

// Food Category Sales
new Chart(document.getElementById("foodChart"), {
    type:"pie",
    data:{
        labels:["Snacks","Meals","Beverages","Desserts"],
        datasets:[{
            data:[30,40,15,15]
        }]
    }
});

// Revenue trend
new Chart(document.getElementById("revenueChart"), {
    type:"line",
    data:{
        labels:["Jan","Feb","Mar","Apr","May"],
        datasets:[{
            data:[100,120,130,150,220]
        }]
    }
});

// Customer chart
new Chart(document.getElementById("customerChart"), {
    type:"line",
    data:{
        labels:["Jan","Feb","Mar","Apr","May"],
        datasets:[{
            data:[40,50,60,70,78]
        }]
    }
});

// Cost chart
new Chart(document.getElementById("costChart"), {
    type:"bar",
    data:{
        labels:["Jan","Feb","Mar","Apr","May"],
        datasets:[{
            data:[250,220,190,150,120]
        }]
    }
});
