// @flow

import React, { Component } from 'react';
// import { Preview } from './Preview';

// import listItems from '../../utils/garment_items.json';

export type Article = {
  product_categories_mapped: Array<number>,
  product_id: string,
  url: string,
  gender: string,
  brand: string,
  product_description: string,
  image_urls: Array<string>,
  product_imgs_src: Array<string>,
  source: string,
  product_categories: Array<string>,
  images: Array<{
    url: string,
    path: string,
    checksum: string,
  }>,
  price: string,
  product_title: string,
};

type State = {
  searchKey: string,
  listItems: Array<Article>,
  selectedItem: Article,
  selectedItemId: string,
  matchedItems: Array<Article>,
  itemClicked: boolean;
};

export class App extends Component<{}, State> {
  searchItem: (any) => void;
  selectItem:(item: Article) => void;

  constructor() {
    super();

    this.state = {
      searchKey: '',
      listItems: [],
      selectedItem: {},
      selectedItemId: '',
      matchedItems: [],
      itemClicked: false,
    };

    // this.searchItem = this.searchItem.bind(this);
    // this.selectItem = this.selectItem.bind(this);
  }

  componentDidMount() {
    fetch('http://nyx.vima.ekt.gr:3000/api/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(`Request failed: ${err}`));
  }

  /*
  searchItem(evt: any): void {
    const searchKey = evt.target.value.toLowerCase();
    const { listItems: items } = this.state;
    const matchedItems = items.filter(
      ({ product_title }) => (product_title.toLowerCase().includes(searchKey)),
    );

    this.setState({
      searchKey,
      matchedItems,
    });
  }

  selectItem(item: Article): void {
    const { product_id } = item;

    this.setState({
      selectedItem: item,
      selectedItemId: product_id,
      itemClicked: true,
    });
  }
  */
  render() {
    // const { selectedItem, selectedItemId, itemClicked, matchedItems } = this.state;

    return (<div>EMPTY</div>
      /*
      <div className="app">
        <div className="search-bar">
          <span>Filter item by product title &nbsp; : &nbsp; &nbsp;</span>
          <input
            type="text"
            className={matchedItems.length ? 'input-ok' : 'input-error'}
            onChange={this.searchItem}
          />
        </div>

        <div className="items">
          <div className="items-list">
            <table>
              <tbody>
                {
                  matchedItems
                    .map(item => (
                      <tr
                        key={`tr_${item.product_id}`}
                        className={item.product_id === selectedItemId ? 'click clicked-row' : 'click'}
                        onClick={() => this.selectItem(item)}
                      >
                        <td key={`td_${item.product_id}`}> {item.product_title} </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>

          <div className="item-details">
            {
              itemClicked &&
              <Preview item={selectedItem} />
            }
          </div>
        </div>
      </div>
      */
    );
  }
}
