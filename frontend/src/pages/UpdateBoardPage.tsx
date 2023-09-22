import { useParams } from "react-router-dom";
import CreateBoardForm from "../components/Board/CreateBoardForm";
import { BoardContextProvider } from "../store/board-context";


const UpdateBoardPage = () => {

  let { boardId } = useParams();

  return ( 
    <BoardContextProvider>
      <CreateBoardForm item={boardId} />
    </BoardContextProvider>
  );
}

export default UpdateBoardPage;