import { ItemProps } from "../ItemProps";

const Item: React.FC<ItemProps> = (props) => {
    return (
      <li key={props.item.id}>
        <span>
          <a href={props.item.url}>{props.item.title}</a>
        </span>
        <span>{props.item.author}</span>
        <span>{props.item.num_comments}</span>
        <span>{props.item.points}</span>
      </li>
    );
  };
  
  export default Item;