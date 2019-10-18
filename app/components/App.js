// @flow

import React, { Component } from 'react';
import { Preview } from './Preview';

export type Book = {
  id: string,
  book_author: string,
  book_pages: number,
  book_publication_city: string,
  book_publication_country: string,
  book_publication_year: number,
  book_title: string,
};

type State = {
  allBooks: Array<Book>,
  selectedBook: Book,
  selectedBookId: string,
  matchedBooks: Array<Book>,
  bookClicked: boolean,
  fetchError: string,
  loading: boolean,
};

export class App extends Component<{}, State> {
  searchBook: (any) => void;

  selectBook: (book: Book) => void;

  constructor() {
    super();

    this.state = {
      allBooks: [],
      selectedBook: {},
      selectedBookId: '',
      matchedBooks: [],
      bookClicked: false,
      fetchError: '',
      loading: true,
    };

    this.searchBook = this.searchBook.bind(this);
    this.selectBook = this.selectBook.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://nyx.vima.ekt.gr:3000/api/books', { method: 'POST' });
      const { books } = await res.json();

      this.setState({
        allBooks: books,
        matchedBooks: books,
        loading: false,
      });
    } catch (err) {
      this.setState({
        fetchError: err,
        loading: false,
      });
    }
  }

  searchBook({ target: { value } }: any): void {
    const searchKey = value.toLowerCase();
    const { allBooks } = this.state;
    const matchedBooks = allBooks.filter(
      ({ book_title }) => (book_title.toLowerCase().includes(searchKey)),
    );

    this.setState({
      matchedBooks,
    });
  }

  selectBook(book: Book): void {
    const { id } = book;

    this.setState({
      selectedBook: book,
      selectedBookId: id,
      bookClicked: true,
    });
  }

  render() {
    const {
      selectedBook,
      selectedBookId,
      bookClicked,
      matchedBooks,
      loading,
    } = this.state;

    return (
      <div className="app">
        <div className="search-bar">
          <span>Find book by title &nbsp; : &nbsp; &nbsp;</span>
          <input
            type="text"
            className={(loading || matchedBooks.length) ? 'input-ok' : 'input-error'}
            onChange={this.searchBook}
          />
        </div>
        <div className="items">
          <div className="items-list">
            <table>
              <tbody>
                {
                  matchedBooks
                    .map((item) => (
                      <tr
                        key={`tr_${item.id}`}
                        className={item.id === selectedBookId ? 'click clicked-row' : 'click'}
                        onClick={() => this.selectBook(item)}
                      >
                        <td key={`td_${item.id}`}>
                          {item.book_title}
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>

          <div className="item-details">
            {
              bookClicked
              && <Preview book={selectedBook} />
            }
          </div>
        </div>
      </div>
    );
  }
}
