import { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BoardContext from '../../store/board-context';
import AuthContext from '../../store/auth-context';
import Board from './Board';
import classses from './BoardOne.module.css';

type Props = { item:string | undefined }

type BoardInfo = {
  boardId: number,
  memberName: string,
  boardTitle: string,
  boardBody?: string,
  cratedAt: string,
  updatedAt?: string,
  written?: boolean
};

const BoardOne:React.FC<Props> = (props) => {

  let navigate = useNavigate();

  const [board, setBoard] = useState<BoardInfo>();
  const [isLoading, setIsLoading ] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);
  const boardCtx = useContext(BoardContext);
  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);


  const deleteHandler = (id:string) => {
    boardCtx.deleteBoard(authCtx.token, id);
    alert("삭제되었습니다.");
    navigate("/page/1")
  }

  const getContext = useCallback(() => {
    setIsLoading(false);
    (isLogin ? boardCtx.getBoard(id, authCtx.token) : boardCtx.getBoard(id));
  }, [isLogin])
  
  useEffect(() => {
    getContext();
  }, [getContext])

  useEffect(() => {
    if (boardCtx.isSuccess) {
      setBoard(boardCtx.board);
      console.log(board);
      console.log(board?.cratedAt);
      setIsLoading(true);
    }
  }, [boardCtx, board]);

  let content = <p>Loading</p>

  if (isLoading && board) {
    content = <Board item={board} onDelete={deleteHandler} />
  }

  return ( 
    <div className={classses.board}>
      {content}
    </div>
    
  );
}

export default BoardOne;