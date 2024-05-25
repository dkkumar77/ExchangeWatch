<?php

function readAccessKey($filePath) {
    $lines = file($filePath); 
    foreach ($lines as $line) {
        if (strpos($line, 'ACCESS_KEY') === 0) { 
            list($key, $value) = explode('=', trim($line), 2);
            return $value; 
        }
    }
    return null;
}

function fetchData($date, $accessKey, $symbols) {
    $ch = curl_init('http://api.exchangeratesapi.io/v1/'.$date.'?access_key='.trim($accessKey).'&symbols='.$symbols);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $json = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'cURL error: ' . curl_error($ch);
        return null;
    } else {
        $data = json_decode($json, true);
        if (isset($data['success']) && $data['success']) {
            return $data;
        } else {
            if (isset($data['error'])) {
                $errorMessages = [];
                foreach ($data['error'] as $key => $value) {
                    $errorMessages[] = "{$key}: {$value}";
                }
                $errorDetails = implode(", ", $errorMessages);
                echo "Failed to fetch data for date $date: " . $errorDetails . "\n";
            } else {
                echo "Failed to fetch data for date $date: Unexpected API response\n";
            }
            return null;
        }
    }
    curl_close($ch);
}

$filePath = 'secrets.txt'; 
$accessKey = readAccessKey($filePath); 
$symbols = 'USD,AUD,CAD,GBP,INR,MXN,JPY';
$endDate = new DateTime();
$startDate = (clone $endDate)->modify('-5 years');

$dataFilePath = 'public/data.json';
$existingData = [];

if (file_exists($dataFilePath)) {
    $existingData = json_decode(file_get_contents($dataFilePath), true);
    if (!is_array($existingData)) {
        $existingData = [];
    }
}

$currentDate = clone $startDate;
while ($currentDate <= $endDate) {
    $dateStr = $currentDate->format('Y-m-d');
    $data = fetchData($dateStr, $accessKey, $symbols);
    if ($data !== null) {
        $existingData[] = $data;
        $jsonData = json_encode($existingData);
        file_put_contents($dataFilePath, $jsonData);
        echo "Data appended successfully for date $dateStr to data.json\n";
    }
    $currentDate->modify('+1 day');
}

?>
