import path from 'path';
import express, { Request, Response } from 'express';
import Game from "../controller/Game";
import FileLoader from "../controller/FileLoader";
import cors from 'cors';

const app = express();
initServer();

async function initServer() {
    try {
        const loader = new FileLoader();
        const { questionBank, seekers } = await loader.getGameContent("data");
        const game = new Game("test oracle name", questionBank, seekers, false);

        const app = express();
        const PORT = 3001;
  
        app.use(express.static(path.join(__dirname, '../../../public/build')));

        app.use(cors({
            origin: "http://localhost:3000", // Frontend URL
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));
        
        
        app.get('/api/question', (req, res) => {
            try {
                console.log("getting question from game");
                const question = game.getQuestionText();
                console.log(question);
                res.json(question);
            } catch (err) {
                res.status(500).send('Error fetching question text');
            }
        });
        
        app.post('/submit-answer', (req, res) => {
            const { answer } = req.query;
            try {  
                if (answer) {
                    const response = game.answerQuestion(answer.toString());
                    console.log(response);
                    console.log(`Received answer: ${answer}`);
                    res.status(200).json(response);
                } else {
                    res.status(400).json({ message: `Answer received was undefined` });
                }
            } catch (err) {
                res.status(400).json({ error: 'Answer is required' });
            }
        });
  
        app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    } catch (error) {
      console.error("Failed to initialize server:", error);
      process.exit(1);
    }
  }





