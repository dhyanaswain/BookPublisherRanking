import express from "express";
import { ranking }  from "./BookPublisherRanking";
import { books } from "./helper";

const app = express();

app.get('/', async () => {
    await ranking(books)
});

app.listen(6001, async () => {
    console.log(`server is running on port ${6001}.....`);
    await ranking(books)
});
