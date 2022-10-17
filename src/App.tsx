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

const List: React.FC<ListProps> = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} />
    ))}
  </ul>
);

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({ id, value, type ="text", onInputChange, children }) => (
  <React.Fragment>
    <label htmlFor={id}>Search: </label>
    <input
      className="text-input"
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </React.Fragment>
);

const useStorageState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialState
  );
  React.useEffect(() => localStorage.setItem(key, value), [value, key]);

  return [value, setValue];
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
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hacker Stories</h1>

      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch}>
        <strong>Search:</strong>
        </InputWithLabel>

      <hr />

      <List list={searchedBooks} />
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

export default App;
