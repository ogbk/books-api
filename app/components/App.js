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
  searchKey: string,
  listBooks: Array<Book>,
  selectedBook: Book,
  selectedBookId: string,
  matchedBooks: Array<Book>,
  bookClicked: boolean,
  fetchError: string,
};

export class App extends Component<{}, State> {
  searchBook: (any) => void;
  selectBook: (book: Book) => void;

  constructor() {
    super();

    this.state = {
      searchKey: '',
      listBooks: [],
      selectedBook: {},
      selectedBookId: '',
      matchedBooks: [],
      bookClicked: false,
      fetchError: '',
    };

    this.searchBook = this.searchBook.bind(this);
    this.selectBook = this.selectBook.bind(this);
  }

  componentWillMount() {
    fetch('http://nyx.vima.ekt.gr:3000/api/books', {
      method: 'POST',
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          listBooks: res.books,
          matchedBooks: res.books,
        });
      })
      .catch((err) => {
        this.setState({ fetchError: err });
      });
  }

  searchBook(evt: any): void {
    const searchKey = evt.target.value.toLowerCase();
    const { listBooks: books } = this.state;
    const matchedBooks = books.filter(
      ({ book_title }) => (book_title.toLowerCase().includes(searchKey)),
    );

    this.setState({
      searchKey,
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
    const { selectedBook, selectedBookId, bookClicked, matchedBooks } = this.state;

    return (
      <div className="app">
        <div className="search-bar">
          <span>Find book by title &nbsp; : &nbsp; &nbsp;</span>
          <input
            type="text"
            className={matchedBooks.length ? 'input-ok' : 'input-error'}
            onChange={this.searchBook}
          />
        </div>
        <div className="items">
          <div className="items-list">
            <table>
              <tbody>
                {
                  matchedBooks
                    .map(item => (
                      <tr
                        key={`tr_${item.id}`}
                        className={item.id === selectedBookId ? 'click clicked-row' : 'click'}
                        onClick={() => this.selectBook(item)}
                      >
                        <td key={`td_${item.id}`}> {item.book_title} </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>

          <div className="item-details">
            {
              bookClicked &&
              <Preview book={selectedBook} />
            }
          </div>
        </div>
      </div>
    );
  }
}
