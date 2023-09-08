const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  const { full_name, dob, email, roll_number, data } = req.body;
  
  const user_id = `${full_name}_${dob}`;

  const numbers = [];
  const alphabets = [];

  for(let item of data) {
    if(item.match(/^\d+$/)) {
      numbers.push(item);
    } else {
      alphabets.push(item);  
    }
  }

  alphabets.sort();
  const highest_alphabet = alphabets[alphabets.length - 1];

  res.json({
    is_success: true,
    user_id,
    email, 
    roll_number,
    numbers,
    alphabets,
    highest_alphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  })
});

const port = 3000;
app.listen(port, () => {
  console.log(`API server started on ${port}`);
});