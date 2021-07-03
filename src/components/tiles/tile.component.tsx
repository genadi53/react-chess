import "./tile.css";

interface Props {
  isEven: Boolean;
  image?: string;
}

const Tile = ({ isEven, image }: Props) => {
  return (
    <div className={`tile ${isEven ? "black-tile" : "white-tile"}`}>
      <img
        //alt="rook"
        className={"chess-piece-image"}
        src={image}
      ></img>
    </div>
  );
};

export default Tile;
