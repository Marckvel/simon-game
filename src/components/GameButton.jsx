import { forwardRef } from "react";

const GameButton = forwardRef(({ border, background, onClick }, ref) => (
  <button
    background={background}
    className={`game-button ${border} ${background}`}
    onClick={onClick}
    ref={ref}
  />
));

export default GameButton;
