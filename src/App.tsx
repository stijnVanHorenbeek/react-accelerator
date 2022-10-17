import * as react from "react";
const title = "React";

function App() {
  return (
    <div>
      <h1>hacker stories</h1>
      <label htmlFor="search">Search</label>
      <input className="text-input" id="search" type="text" />
      <hr />
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span><a href={book.url}>{book.title}</a></span>
            <span>{book.author}</span>
            <span>{book.num_comments}</span>
            <span>{book.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

class TechBook {
  constructor(
    public title: string,
    public url: string,
    public author: string,
    public num_comments: number,
    public points: number,
    public id: number
  ) {}
}

const books: Array<TechBook> = new Array<TechBook>();
books.push(
  new TechBook("React", "https://reactjs.org", "Jordan Walke", 3, 4, 0)
);
books.push(
  new TechBook(
    "Redux",
    "https://redux.js.org",
    "Dan Abramov, Andrew Clark",
    2,
    5,
    1
  )
);
