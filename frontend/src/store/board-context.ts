import React, { useState, useEffect, useCallback, useRef } from "react";
import * as boardAction from './board-action';

type Props = { children?: React.ReactNode }
type BoardInfo = {
  boardId: number,
  memberNickname: string,
  boardTitle: string,
  boardBody: string,
  cratedAt: string,
  updatedAt?: string,
  isWritten?: boolean
};

interface PostBoard {
  id? : string,
  title: string,
  body: string
} 

interface Ctx {
  board?: BoardInfo | undefined;
  page: BoardInfo[];
  isSuccess: boolean;
  isGetUpdateSuccess: boolean;
  totalPages: number;
  getPageList: (pageId: string) => void;
  getBoard: (param:string, token?:string) => void;
  createBoard: (board:PostBoard, token:string) => void;
  getUpdateBoard: (token:string, param:string) => void;
  updateBoard: (token:string, board:PostBoard) => void;
  deleteBoard: (token:string, param:string) => void;
}



const BoardContext = React.createContext<Ctx>({
  board: undefined,
  page: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  totalPages: 0,
  getPageList: () => {},
  getBoard: ()=>{},
  createBoard:  ()=>{},
  getUpdateBoard: ()=>{},
  updateBoard: ()=>{},
  deleteBoard: ()=>{}
});

export const BoardContextProvider:React.FC<Props> = (props) => {

  const [board, setBoard] = useState<BoardInfo>();
  const [page, setPage] = useState<BoardInfo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState<boolean>(false);


  const getPageHandlerV2 = async (pageId: string) => {
    setIsSuccess(false);
    const data = await boardAction.getPageList(pageId);
    const page:BoardInfo[] = data?.data.content; 
    const pages:number = data?.data.totalPages;
    setPage(page);
    setTotalPages(pages);
    setIsSuccess(true);
  }

  const getBoardHandler = (param:string, token?:string) => {
    setIsSuccess(false);
    const data = (token ? 
      boardAction.getOneBoard(param, token)
      : boardAction.getOneBoard(param))
    data.then((result) => {
      if (result !== null) {
        const board:BoardInfo = result.data;
        setBoard(board);
        
        
      }
    })
    setIsSuccess(true);
  }

  const createBoardHandler = (board:PostBoard, token:string) => {
    setIsSuccess(false);
    const data = boardAction.makeBoard(token, board);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
        
      }
    })
    setIsSuccess(true);
  }

  const getUpdateBoardHancler = async (token:string, param:string) => {
    setIsGetUpdateSuccess(false);
    const updateData = await boardAction.getChangeBoard(token, param);
    const board:BoardInfo = updateData?.data;
    setBoard(board);
    setIsGetUpdateSuccess(true);
  }


  const updateBoardHandler = (token:string, board:PostBoard) => {
    setIsSuccess(false);
    console.log('update api start')
    const data = boardAction.changeBoard(token, board);
    data.then((result) => {
      if (result !== null) {
        
      }
    })
    setIsSuccess(true);
  }

  const deleteBoardHandler = (token:string, param:string) => {
    setIsSuccess(false);
    const data = boardAction.deleteBoard(token, param);
    data.then((result) => {
      if (result !== null) {
        
      }
    })
    setIsSuccess(true);

  }

  const contextValue:Ctx = {
    board,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getPageList: getPageHandlerV2,
    getBoard: getBoardHandler,
    createBoard: createBoardHandler,
    getUpdateBoard: getUpdateBoardHancler,
    updateBoard: updateBoardHandler,
    deleteBoard: deleteBoardHandler
  }

  return (
  <BoardContext.Provider value={contextValue}>
    {props.children}
  </BoardContext.Provider>)
}

export default BoardContext;