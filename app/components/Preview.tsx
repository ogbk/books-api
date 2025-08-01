import React from 'react';
import type { Book } from '../utils/types';

export const Preview = ({ book }: {book: Book}) => {
  const {
    id,
    book_author,
    book_title,
  } = book;
  return (
    <div>
      <span>{`Book ID  ---  ${id}`}</span>
      <br />
      <br />
      <span>{`Author  ---  ${book_author}`}</span>
      <br />
      <br />
      <span>{`Title       ---  ${book_title}`}</span>
    </div>
  );
};
