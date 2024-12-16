import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface LikeProps {
  onClick: () => void;
}
export const Like = ({ onClick }: LikeProps) => {
  const [status, setStatus] = useState(false);
  const toggle = () => {
    setStatus(!status);
    onClick();
  };
  return (
    <div>
      {status ? (
        <AiFillHeart onClick={toggle} color="#ff6b81" size={20} />
      ) : (
        <AiOutlineHeart onClick={toggle} color="#ff6b81" size={20} />
      )}
    </div>
  );
};
