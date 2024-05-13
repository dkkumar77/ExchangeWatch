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
$filePath = 'secrets.txt'; 
$accessKey = readAccessKey($filePath); 
$symbols = 'USD,AUD,CAD,GBP,INR,MXN,JPY';

$ch = curl_init('http://api.exchangeratesapi.io/v1/'.$endpoint.'?access_key='.trim($accessKey).'&symbols='.$symbols);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
} else {
    $data = json_decode($json, true);
    if (isset($data['success']) && $data['success']) {
        if (file_exists('hist_data.json')) {
            $existingData = json_decode(file_get_contents('hist_data.json'), true);
            if (!is_array($existingData)) {
                $existingData = [];
            }
        } else {
            $existingData = [];
        }
        $existingData[] = $data;

        $jsonData = json_encode($existingData);
        file_put_contents('hist_data.json', $jsonData);
        echo "Data appended successfully to hist_data.json";
    } else {
        if (isset($data['error'])) {
            $errorMessages = [];
            foreach ($data['error'] as $key => $value) {
                $errorMessages[] = "{$key}: {$value}";
            }
            $errorDetails = implode(", ", $errorMessages);
            echo "Failed to fetch data: " . $errorDetails;
        } else {
            echo "Failed to fetch data: Unexpected API response";
        }
    }
}
curl_close($ch);
?>
