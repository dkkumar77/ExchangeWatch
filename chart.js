// Sample JSON data containing exchange rates in new format
const exchangeRatesData = {
    "0": {
        "success": true,
        "timestamp": 1704153599,
        "historical": true,
        "base": "EUR",
        "date": "2024-01-01",
        "rates": {
            "USD": 1.103769,
            "AUD": 1.620807,
            "CAD": 1.461887,
            "GBP": 0.867209,
            "INR": 91.836735,
            "MXN": 18.727264,
            "JPY": 155.775486
        }
    },
    "1": {
        "success": true,
        "timestamp": 1704239999,
        "historical": true,
        "base": "EUR",
        "date": "2024-01-02",
        "rates": {
            "USD": 1.09414,
            "AUD": 1.61721,
            "CAD": 1.457684,
            "GBP": 0.866822,
            "INR": 91.095075,
            "MXN": 18.638012,
            "JPY": 155.539094
        }
    },
    "2": {
        "success": true,
        "timestamp": 1704326399,
        "historical": true,
        "base": "EUR",
        "date": "2024-01-03",
        "rates": {
            "USD": 1.092657,
            "AUD": 1.622356,
            "CAD": 1.458517,
            "GBP": 0.862162,
            "INR": 91.038416,
            "MXN": 18.591998,
            "JPY": 156.250561
        }
    },
    "3": {
        "success": true,
        "timestamp": 1704412799,
        "historical": true,
        "base": "EUR",
        "date": "2024-01-04",
        "rates": {
            "USD": 1.094685,
            "AUD": 1.632399,
            "CAD": 1.462012,
            "GBP": 0.863088,
            "INR": 91.12249,
            "MXN": 18.635476,
            "JPY": 158.479157
        }
    },
    "4": {
        "success": true,
        "timestamp": 1704499199,
        "historical": true,
        "base": "EUR",
        "date": "2024-01-05",
        "rates": {
            "USD": 1.09547,
            "AUD": 1.633839,
            "CAD": 1.464917,
            "GBP": 0.860787,
            "INR": 91.133606,
            "MXN": 18.491643,
            "JPY": 158.443308
        }
    }
};



function updateChart() {
    const srcCurrency = document.getElementById('srcCurrency').value;
    const destCurrency = document.getElementById('destCurrency').value;
    
    const exchangeRateData = Object.values(exchangeRatesData).map(day => {
        const date = day.date;
        const rate = day.rates[destCurrency] / day.rates[srcCurrency];
        return { date, value: rate };
    });

    const labels = exchangeRateData.map(data => data.date);
    const data = exchangeRateData.map(data => data.value);

    // Update chart data
    exchangeRateChart.data.labels = labels;
    exchangeRateChart.data.datasets[0].data = data;
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
                    unit: 'day',
                    tooltipFormat: 'll'
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

// Init chart
updateChart();
