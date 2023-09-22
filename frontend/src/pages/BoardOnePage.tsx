import { Fragment } from "react";
import { useParams } from "react-router-dom";
import BoardOne from "../components/Board/BoardOne";
import Comment from "../components/Board/CommentList";
import { BoardContextProvider } from "../store/board-context";
import { CommentContextProvider } from "../store/comment-context";

const BoardOnePage = () => {
  let { boardId } = useParams();

  return (
    <Fragment>
      <BoardContextProvider>
          <BoardOne item={boardId}/>
      </BoardContextProvider>
      <CommentContextProvider>
        <Comment item={boardId}/>
      </CommentContextProvider>
    </Fragment>
  )
};

export default BoardOnePage;