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
  fetchedBooks: Array<Book>,
  bookToPreview: Book,
  matchedBooks: Array<Book>,
  previewOn: boolean,
  fetchError: string,
  loading: boolean,
};

export class App extends Component<{}, State> {
  searchBook: (any) => void;

  showBookPreview: (book: Book) => void;

  constructor() {
    super();

    this.state = {
      fetchedBooks: [],
      bookToPreview: {},
      matchedBooks: [],
      previewOn: false,
      fetchError: '',
      loading: true,
    };

    this.searchBook = this.searchBook.bind(this);
    this.showBookPreview = this.showBookPreview.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://nyx.vima.ekt.gr:3000/api/books', { method: 'POST' });
      const { books } = await res.json();

      this.setState({
        fetchedBooks: books,
        matchedBooks: books,
        loading: false,
      });
    } catch (err) {
      this.setState({
        fetchError: String(err),
        loading: false,
      });
    }
  }

  searchBook({ target: { value } }: any): void {
    const searchKey = value.toLowerCase();
    const { fetchedBooks } = this.state;
    const matchedBooks = fetchedBooks.filter(
      ({ book_title }) => (book_title.toLowerCase().includes(searchKey)),
    );

    this.setState({
      matchedBooks,
    });
  }

  showBookPreview(book: Book): void {
    this.setState({
      bookToPreview: book,
      previewOn: true,
    });
  }

  render() {
    const {
      bookToPreview,
      previewOn,
      matchedBooks,
      fetchError,
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
                  fetchError
                    ? (
                      <tr>
                        <td>
                          {!loading && `${fetchError}`}
                        </td>
                      </tr>
                    )
                    : matchedBooks.map((item) => (
                      <tr
                        key={`tr_${item.id}`}
                        className={item.id === bookToPreview.id
                          ? 'click clicked-row'
                          : 'click'}
                        onClick={() => this.showBookPreview(item)}
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
              previewOn
              && <Preview book={bookToPreview} />
            }
          </div>
        </div>
      </div>
    );
  }
}
