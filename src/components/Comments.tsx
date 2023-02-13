import { FC } from "react";
import Comment from "./Comment";

const Comments: FC<{ data: number[] }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-12">
      {data.map((commentId) => (
        <Comment id={commentId} key={commentId} />
      ))}
    </div>
  );
};
export default Comments;
