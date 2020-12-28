import { Books, RankingCount } from "./model";
import { isValidISBN } from "./helper";

export const ranking = async (books: Books[]) => {
  let bookPublisherRanking = [] as RankingCount[];
  let publisherNameArray: any[] = [];
  let publisherNamefilterrray: any[] = [];

  let validatedISBN10;
  // let invalidISBNsCount: number = 0
  for (let i = 0; i < books.length; i++) {
    validatedISBN10 = await isValidISBN(books[i].isbn);
    if (!validatedISBN10) {
      publisherNameArray.push(books[i].Publisher);
      const seen = new Set();
      publisherNamefilterrray = publisherNameArray.filter((el) => {
        const duplicate = seen.has(el);
        seen.add(el);
        return !duplicate;
      });
    }
  }
  for (let i = 0; i < publisherNamefilterrray.length; i++) {
    bookPublisherRanking.push({
      publisherName: publisherNamefilterrray[i],
      invalidISBNs: publisherNameArray.length - publisherNamefilterrray.length,
    });
  }

  bookPublisherRanking.sort((a, b) =>
    a.publisherName < b.publisherName ? 1 : -1
  );

  console.log(`bookPublisherRanking sort`, bookPublisherRanking);
};
