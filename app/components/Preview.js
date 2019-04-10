// @flow

import React from 'react';
import type { Article } from './App';

const defaultImgSrc = '../public/img/image-not-found.jpg';

export const Preview = ({ item }: {item: Article}) => {
  const { product_id, product_title, brand, price, images } = item;
  return (
    <div>
      <span>{`Product ID  ---  ${product_id}`}</span><br />
      <span>{`Title  ---  ${product_title}`}</span><br />
      <span>{`Brand       ---  ${brand}`}</span><br />
      <span>{`Price       ---  ${price}`}</span><br />
      <img
        src={images[0].url}
        alt={product_id}
        onError={(e) => { e.target.src = defaultImgSrc; }}
      />
    </div>
  );
};
