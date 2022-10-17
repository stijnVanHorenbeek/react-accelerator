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

const initialBooks = [
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

const getAsyncBooks = (): Promise<{ data: { books: TechBooks } }> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { books: initialBooks } }), 2000)
  );

type BooksState = TechBooks;

type TechBooksSetAction = {
  type: "SET_BOOKS";
  payload: TechBooks;
};

type TechBooksRemoveAction = {
  type: "REMOVE_BOOK";
  payload: TechBook;
};

type TechBooksAction = TechBooksSetAction | TechBooksRemoveAction;

const booksReducer = (state: BooksState, action: TechBooksAction) => {
  switch (action.type) {
    case "SET_BOOKS":
      return action.payload;
    case "REMOVE_BOOK":
      return state.filter((book: TechBook) => action.payload.id != book.id);
    default:
      throw new Error();
  }
};
const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const [books, dispatchBooks] = React.useReducer(booksReducer, []);

  const [isloading, setIsloading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsloading(true);
    getAsyncBooks()
      .then((result) => {
        dispatchBooks({
          type: "SET_BOOKS",
          payload: result.data.books,
        });
        setIsloading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveBook = (item: TechBook) => {
    const newBooks = books.filter((book: TechBook) => item.id != book.id);
    dispatchBooks({
      type: "SET_BOOKS",
      payload: newBooks,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedBooks = books.filter((book: TechBook) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />

      {isError && <p>Something went wrong...</p>}

      {isloading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedBooks} onRemoveItem={handleRemoveBook} />
      )}
    </div>
  );
};

type ListProps = {
  list: TechBooks;
  onRemoveItem: (item: TechBook) => void;
};
const List: React.FC<ListProps> = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        id={id}
        type={type}
        value={value}
        ref={inputRef}
        onChange={onInputChange}
      />
    </>
  );
};

type ItemProps = {
  item: TechBook;
  onRemoveItem: (item: TechBook) => void;
};

const Item: React.FC<ItemProps> = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

export default App;
