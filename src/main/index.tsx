import { useState } from "react";
import TodayTodo from "../TodayTodo/TodayTodo";
import './index.css';
import Trello from "../Trello/Trello";

export default function MainPage() {
  const [isTrello, setIsTrello] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setEndX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (startX - endX > 50) {
      setIsTrello(true)
    } else if (endX - startX > 50) {
      setIsTrello(false)
    }
  };
  return (
    <div
      className="container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isTrello ? <Trello /> : <TodayTodo />}
    </div>
  )
}