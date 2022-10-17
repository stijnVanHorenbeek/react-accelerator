import * as react from "react";
import React from "react";

type TechBook = {
  id: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type TechBooks = TechBook[];

type ListProps = {
  list: TechBooks;
};
type ItemProps = {
  item: TechBook;
};

type SearchProps = {
  search: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const List: React.FC<ListProps> = (props) => (
  <ul>
    {props.list.map((book) => (
      <Item key={book.id} item={book} />
    ))}
  </ul>
);

const Search: React.FC<SearchProps> = (props) => {

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        className="text-input"
        id="search"
        type="text"
        value={props.search}
        onChange={props.onSearch}
      />
      <p>
        Searching for <strong>{props.search}</strong>
      </p>
    </div>
  );
};

const App = () => {
  const books = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      id: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      id: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("react");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }
  return (
    <div>
      <h1>Hacker Stories</h1>

      <Search onSearch={handleSearch} search={searchTerm} />

      <hr />

      <List list={books} />
    </div>
  );
};

const Item: React.FC<ItemProps> = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App;
