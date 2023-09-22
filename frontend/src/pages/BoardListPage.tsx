import { Fragment } from "react";
import { useParams } from "react-router-dom";
import BoardList from "../components/Board/BoardList";
import SearchForm from "../components/Board/SearchForm";
import { BoardContextProvider } from "../store/board-context";

const BoardListPage = () => {
  let { pageId } = useParams();
  return (
    <BoardContextProvider>
      <Fragment>
        <BoardList item={pageId}/>
        <SearchForm />
      </Fragment>
  </BoardContextProvider>
  );
}

export default BoardListPage;