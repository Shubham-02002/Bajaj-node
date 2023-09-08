const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/bfhl', async (req, res) => {
    const data = req.body;
    const userID = `${data.full_name}_${data.dob}`;
    const email = data.email;
    const rollNumber = data.roll_number;
    const numbers = [];
    const alphabets = [];
    for (const item of data.data) {
        if (item.isDigit()) {
            numbers.push(item);
        } else {
            alphabets.push(item);
        }
    }
    const highestAlphabet = max(alphabets, (a, b) => a.toUpperCase() > b.toUpperCase());
    const response = {
        'is_success': true,
        'user_id': userID,
        'email': email,
        'roll_number': rollNumber,
        'numbers': numbers,
        'alphabets': alphabets,
        'highest_alphabet': highestAlphabet
    };
    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.json({
        'operation_code': 1
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});