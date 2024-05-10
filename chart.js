const ctx = document.getElementById('exchangeRateChart').getContext('2d');
const exchangeRateChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["0:00", "1:00", "2:00", "...", "23:00"], // Placeholder for time points
        datasets: [{
            label: 'Exchange Rate',
            data: [20, 30, 45, 60, 75, 90, 100], // Placeholder data
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderColor: 'darkgray',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 10,  // Reduced padding at the top
                bottom: 10  // Reduced padding at the bottom
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100.00,
                    padding: 5  // Reduce label padding to minimize space usage
                }
            }],
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'hA'
                    }
                },
                ticks: {
                    padding: 5  // Reduce label padding to minimize space usage
                }
            }]
        }
    }
});

setInterval(() => {
    console.log("Update the chart here");
}, 3600000); // 3600000 milliseconds = 1 hour
