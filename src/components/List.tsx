
import { ListProps } from "../types/ListProps";
import Item from "./Item";

const List: React.FC<ListProps> = (props) => {
    return (
      <ul>
        {props.list.map((book) => (
          <Item key={book.id} item={book}></Item>
        ))}
      </ul>
    );
  };

  export default List;