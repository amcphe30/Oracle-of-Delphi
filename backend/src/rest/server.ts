import path from 'path';
import express, { Request, Response } from 'express';
import Game from "../controller/Game";
import cors from 'cors';

const app = express();
const PORT = 3001;
const game = new Game("test oracle name", true);

app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.get('/api/question', (req, res) => {
    try {
        console.log("getting question from game");
        const question = game.getQuestionText();
        res.json(question);
    } catch (err) {
        res.status(500).send('Error fetching question text');
    }
});

app.post('/submit-answer', (req, res) => {
    const { answer } = req.query;
    try {  
        console.log(`Received answer: ${answer}`);
        res.status(200).json({ message: `Answer received: ${answer}` });
    } catch (err) {
        res.status(400).json({ error: 'Answer is required' });
    }
});



app.use(express.static(path.join(__dirname, '../../../public/build')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
