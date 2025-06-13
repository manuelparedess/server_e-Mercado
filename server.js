const app = require('./config/appConfig.js');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}`);
})