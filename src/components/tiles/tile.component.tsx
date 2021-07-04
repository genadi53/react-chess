import "./tile.css";

interface Props {
  isEven: Boolean;
  image?: string;
}

const Tile = ({ isEven, image }: Props) => {
  return (
    <div className={`tile ${isEven ? "black-tile" : "white-tile"}`}>
      {image && (
        <div
          className={"chess-piece"}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}
    </div>
  );
};

export default Tile;
