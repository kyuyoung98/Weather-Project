import CreateBoardForm from "../components/Board/CreateBoardForm";

import { BoardContextProvider } from "../store/board-context";

const CreateBoardPage = () => {
  return (
    <BoardContextProvider>
      <CreateBoardForm item={undefined}/>
    </BoardContextProvider>
  )
}

export default CreateBoardPage;