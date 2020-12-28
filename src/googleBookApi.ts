import express from "express";

const app = express();

const googleBookUrl =
  "https://www.googleapis.com/books/v1/volumes?q=" + 'harry+potter' + "&maxResults=40";
console.log(googleBookUrl);
// const googleBookUrl("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=40");

app.get(googleBookUrl).then((data: { data: { items: any[]; }; }) => {
  const books = data.data.items.map((item) => {
    const title = item.volumeInfo.title;
    const authors =
      item.volumeInfo.authors !== undefined
        ? item.volumeInfo.authors[0].toString()
        : "No Authors";
    const publisher =
      item.volumeInfo.publisher !== undefined
        ? item.volumeInfo.publisher
        : "No Publisher";
    const categories =
      item.volumeInfo.categories !== undefined
        ? item.volumeInfo.categories[0].toString()
        : "No Genre";
    const pageCount =
      item.volumeInfo.pageCount !== undefined
        ? item.volumeInfo.pageCount
        : " No Height";
    const industryIdentifiers =
      item.volumeInfo.industryIdentifiers !== undefined
        ? item.volumeInfo.industryIdentifiers.find(
            (i: { type: string; }) => i.type === "ISBN_10" || i.type === "OTHER"
          ).identifier
        : "No ISBN";
    return {
      isbn: industryIdentifiers,
      Title: title,
      Authors: authors,
      Genre: categories,
      Height: pageCount,
      Publisher: publisher,
    };
  });
  console.log(JSON.stringify(books));
  // console.log(JSON.stringify(data.data.items));
});
