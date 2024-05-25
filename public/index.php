<?php
function hasRunToday($file) {
    $today = date('Y-m-d');
    if (file_exists($file)) {
        $lastRunDate = file_get_contents($file);
        if ($lastRunDate === $today) {
            return true;
        }
    }
    return false;
}

function updateLastRunDate($file) {
    $today = date('Y-m-d');
    file_put_contents($file, $today);
}

$lastRunFile = '../last_run_date.txt';
if (!hasRunToday($lastRunFile)) {
    include 'update_rates.php';
    updateLastRunDate($lastRunFile);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exchange Rates Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<style>
    .home {
        position: relative;
        top: -5px;
    }
</style>
<body>
<header>
    <nav>
        <ul>
            <li>
                <a href="http://localhost:3000/">
                <img src="/img/home.png" alt="Home" height="25px" class="home">

                </a>
            </li>
            <li>
                <a href="http://localhost:3000/">
                    <p> About the Project</p>
                </a>
            </li>
            <li>
                <a href="http://localhost:3000/">
                    <p> Contact</p>
                </a>
            </li>
            <li>
                <a href="http://localhost:3000/">
                    <p> Other </p>
                </a>
            </li>
        </ul>
      
    </nav>
</header>


    <div class ="space"></div> 


    <div class = "title"> 
    <h1>Exchange 〽 Watch</h1>
</div>
 

    
    <main>
        <div id="graph-container">
            <div id="currency-converter">
                <select id="srcCurrency">
                    <option value="USD">USD</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="MXN">MXN</option>
                    <option value="JPY">JPY</option>
                </select>
                <button class="button-17" role="button" id="invCurrency">⟷</button><br>
                <select id="destCurrency">
                    <option value="AUD" selected>AUD</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="MXN">MXN</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>
            <select id="dateFilter" class="date-filter">
                    <option value="all">All Time</option>
                    <option value="1month">1 Month</option>
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="5years">5 Years</option>
            </select>
            <canvas id="exchangeRateChart"></canvas>
        </div>
    

    </main>

    </div>
    <div class = "spaceforcontent"> 
    <div id="topcontent"> 
        <p>Explore the latest in currency exchange rates and trends across various global currencies.</p>
            <br>
            <p>This web application provides users with the ability to view real-time exchange rates updated daily. Currently, we offer data on a selection of major currencies, but we plan to expand our service to include every known currency used worldwide.</p>
            <br>
            <p>Our project leverages an API token from EXCHANGERATES to ensure accurate and up-to-date information for all your currency conversion needs. The backend is powered by Node.js, enabling efficient handling of asynchronous data requests and real-time updates. We also utilize PHP for server-side processing, ensuring robust performance and seamless integration with our database.</p>
            <br>
            <p><strong>Key features include:</strong></p>
            <ul>
                <li><b>‣Real-time Exchange Rates:</b> Access daily updated exchange rates for a variety of currencies.</li>
                <br>
                <li><b>‣Scalability:</b> Our architecture is designed to scale, allowing us to add new currencies and features seamlessly.</li>
                <br>
                <li><b>‣User-Friendly Interface:</b> Navigate through a clean and intuitive interface designed for ease of use.</li>
                <br>
                <li><b>‣Secure Data Handling:</b> We prioritize your data security with best practices in API integration and server management.</li>
                <br>
                <li><b>‣Future Enhancements: </b>Plans to support every known currency and introduce advanced features like historical data analysis and predictive trends.</li>
            </ul>
            <br>
            <p>Stay tuned for more features and an even broader range of currencies in the near future as we continuously improve our platform. Thank you for choosing our Exchange Rates Dashboard for your currency conversion needs.</p>
        </div>

        

        </div>


</div>

    <footer>
        © 2024 Deepak Kumar & Shahbaj Singh
        <br><br>
        <p></p>
    </footer>
    <script src="chart.js"></script>
</body>
</html>
