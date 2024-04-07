import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.js";

const app = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.use(routes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
