import List from "./components/List";
import Search from "./components/Search";
import { TechBook } from "./types/TechBook";


const books: Array<TechBook> = new Array<TechBook>();

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
  return (
    <div>
      <h1>Hacker Stories</h1>
      <Search />

      <hr />
      <List list={books} />
    </div>
  );
};
export default App;

