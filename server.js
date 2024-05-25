const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const lastRunFile = path.join(__dirname, 'last_run_date.txt');
    const today = new Date().toISOString().split('T')[0];

    fs.readFile(lastRunFile, 'utf8', (err, data) => {
        if (err || data !== today) {
            console.log('Running update_rates.php...');
            exec('php update_rates.php', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    res.status(500).send('Error executing PHP script.');
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);

                fs.writeFile(lastRunFile, today, (err) => {
                    if (err) {
                        console.error(`Error writing last run date: ${err}`);
                        res.status(500).send('Error updating last run date.');
                        return;
                    }
                    console.log('Last run date updated.');

                    exec(`php-cgi -f ${path.join(__dirname, 'public', 'index.php')}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            res.status(500).send('Error executing index.php.');
                            return;
                        }
                        res.send(stdout);
                    });
                });
            });
        } else {
            console.log('PHP script already run today.');
            exec(`php-cgi -f ${path.join(__dirname, 'public', 'index.php')}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    res.status(500).send('Error executing index.php.');
                    return;
                }
                res.send(stdout);
            });
        }
    });
});

app.get('/index.php', (req, res) => {
    exec(`php-cgi -f ${path.join(__dirname, 'public', 'index.php')}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send('Error executing index.php.');
            return;
        }
        res.send(stdout);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
