async function fetchExchangeRates() {
    try {
        const response = await fetch('hist_data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function filterDataByDateRange(data, dateRange) {
    const now = new Date();
    let startDate;

    switch (dateRange) {
        case '1month':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
        case '3months':
            startDate = new Date(now.setMonth(now.getMonth() - 3));
            break;
        case '6months':
            startDate = new Date(now.setMonth(now.getMonth() - 6));
            break;
        case '1year':
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
        case '5years':
            startDate = new Date(now.setFullYear(now.getFullYear() - 5));
            break;
        default:
            startDate = new Date(0); // all time
            break;
    }

    return data.filter(entry => new Date(entry.date) >= startDate);
}

async function updateChart() {
    const srcCurrency = document.getElementById('srcCurrency').value;
    const destCurrency = document.getElementById('destCurrency').value;
    const dateFilter = document.getElementById('dateFilter').value;

    const exchangeRatesData = await fetchExchangeRates();
    if (!exchangeRatesData) {
        console.error('Failed to fetch exchange rates data.');
        return;
    }

    const exchangeRateData = Object.values(exchangeRatesData).filter(day => day.rates).map(day => {
        const date = day.date;
        const rate = day.rates[destCurrency] / day.rates[srcCurrency];
        return { date, value: rate };
    });

    const filteredData = filterDataByDateRange(exchangeRateData, dateFilter);

    console.log('Processed exchange rate data:', filteredData);

    const labels = filteredData.map(data => data.date);
    const data = filteredData.map(data => data.value);

    // Update chart data
    exchangeRateChart.data.labels = labels;
    exchangeRateChart.data.datasets[0].data = data;
    exchangeRateChart.update();
    console.log('Chart updated');
}

document.getElementById('srcCurrency').addEventListener('change', updateChart);
document.getElementById('destCurrency').addEventListener('change', updateChart);
document.getElementById('dateFilter').addEventListener('change', updateChart);

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
