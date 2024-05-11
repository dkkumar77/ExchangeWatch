// JSON data containing exchange rates
const exchangeRatesData = {
    "rates": [
        {"time": "2024-05-08T12:00:00Z", "USD": 1.00, "AUD": 1.40, "EUR": 0.91, "INR": 74.57, "JPY": 109.25},
        {"time": "2024-05-08T13:00:00Z", "USD": 1.00, "AUD": 1.42, "EUR": 0.92, "INR": 75.00, "JPY": 110.00},
        {"time": "2024-05-08T14:00:00Z", "USD": 1.00, "AUD": 1.43, "EUR": 0.93, "INR": 75.50, "JPY": 110.75},
        {"time": "2024-05-08T15:00:00Z", "USD": 1.00, "AUD": 1.44, "EUR": 0.94, "INR": 76.00, "JPY": 111.50},
        {"time": "2024-05-08T12:00:00Z", "USD": 1.00, "AUD": 1.40, "EUR": 0.91, "INR": 74.57, "JPY": 109.25},
        {"time": "2024-05-08T13:00:00Z", "USD": 1.00, "AUD": 1.42, "EUR": 0.92, "INR": 75.00, "JPY": 110.00},
        {"time": "2024-05-08T14:00:00Z", "USD": 1.00, "AUD": 1.43, "EUR": 0.93, "INR": 75.50, "JPY": 110.75},
        {"time": "2024-05-08T15:00:00Z", "USD": 1.00, "AUD": 1.44, "EUR": 0.94, "INR": 76.00, "JPY": 111.50}
    ]
};

function updateChart() {
    var srcCurrency = document.getElementById('srcCurrency').value;
    var destCurrency = document.getElementById('destCurrency').value;
    
    var exchangeRateData = exchangeRatesData.rates.map(rate => {
        return {
            time: rate.time,
            value: rate[destCurrency] / rate[srcCurrency],
            
        };
    });

    var labels = exchangeRateData.map(rate => rate.time);
    var data = exchangeRateData.map(rate => rate.value);

    exchangeRateChart.data.labels = labels;
    exchangeRateChart.data.datasets[0].data = data;
   
    exchangeRateChart.data.datasets[0].borderColor = 'pink';
    exchangeRateChart.update();
}

document.getElementById('srcCurrency').addEventListener('change', updateChart);
document.getElementById('destCurrency').addEventListener('change', updateChart);


const ctx = document.getElementById('exchangeRateChart').getContext('2d');
const exchangeRateChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Exchange Rate',
            data: [],
            borderColor: 'darkgray',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 10,
                bottom: 10
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    padding: 5
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
                    padding: 5
                }
            }]
        }
    }
});

document.getElementById('invCurrency').addEventListener('click', function() {
    let temp = document.getElementById('srcCurrency').value;
    document.getElementById('srcCurrency').value = document.getElementById('destCurrency').value;
    document.getElementById('destCurrency').value = temp;
    updateChart();
});

updateChart();
