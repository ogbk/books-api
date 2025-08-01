import React, { useEffect, useState } from 'react';
import { Preview } from './Preview.tsx';
import type { Book } from '../utils/types';

const App = () => {
  const [books, setBooks] = useState<Array<Book>>([]);
  const [matchedBooks, setMatchedBooks] = useState<Array<Book>>([]);
  const [bookToPreview, setBookToPreview] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchOk, setFetchOk] = useState(false);

  useEffect(
    () => {
      fetch('http://nyx.vima.ekt.gr:3000/api/books', { method: 'POST' })
        .then(ris => ris.json())
        .then(({books}) =>{
          setBooks(books);
          setMatchedBooks(books);
          setFetchOk(true);
        })
        .catch(() => {setFetchOk(false)})
        .finally(() => {setIsLoading(false)})
    },[]
  );

  const searchBook = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>): void => {
    const searchKey = value.toLowerCase();
    const filteredBooks = books.filter(
      ({ book_title }) => (book_title.toLowerCase().includes(searchKey)),
    );
    setMatchedBooks(filteredBooks);
  }

  return (
    <div className="app">
      <div className="search-bar">
        <span>Find book by title &nbsp; : &nbsp; &nbsp;</span>
        <input
          type="text"
          className={(isLoading || matchedBooks.length) ? 'input-ok' : 'input-error'}
          onChange={searchBook}
        />
      </div>
      <div className="items">
        <div className="items-list">
          <table>
            <tbody>
              {isLoading && (
                <tr>
                  <td className="line-loading">
                    <div className="loading" />
                  </td>
                </tr>
              )}

              {!isLoading && !fetchOk
                && (
                  <tr>
                    <td className="line-error">
                      Unable to fetch data. Please check internet connection.
                    </td>
                  </tr>
                )}

              {!isLoading && fetchOk && matchedBooks.map((item) => (
                <tr
                  key={`tr_${item.id}`}
                  className={item.id === bookToPreview?.id
                    ? 'click clicked-row'
                    : 'click'}
                  onClick={() => {setBookToPreview(item)}}
                >
                  <td key={`td_${item.id}`}>
                    {item.book_title}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        <div className="item-details">
          {
            !!bookToPreview && <Preview book={bookToPreview} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
