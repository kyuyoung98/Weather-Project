import BootStrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import classes from './BoardList.module.css';
import BoardContext from '../../store/board-context';
import Paging from './Paging';

type Props = { item:string | undefined}

type BoardInfo = {
  boardId: number,
  memberName: string,
  boardTitle: string,
  boardBody?: string,
  cratedAt: string,
  updatedAt?: string,
  isWritten?: boolean
};


const BoardList:React.FC<Props> = (props) => {

  let navigate = useNavigate();
  const pageId = String(props.item);

  const columns = [{
    dataField: 'boardId',
    text: '#',
    headerStyle: () => {
      return { width: "8%" };
    }
  },{
    dataField: 'boardTitle',
    text: '제목',
    headerStyle: () => {
      return { width: "65%" };
    },
    events: {
      onClick: (e:any, column:any, columnIndex:any, row:any, rowIndex:any) => {
        const boardIdNum:string = row.boardId;
        navigate(`../board/${boardIdNum}`);
      }
    }
  },{
    dataField: 'memberName',
    text: '닉네임'
  },{
    dataField: 'createdAt',
    text: '작성일'
  },]


  const authCtx = useContext(AuthContext);
  const boardCtx = useContext(BoardContext);
  
  const [AList, setAList] = useState<BoardInfo[]>([]);
  const [maxNum, setMaxNum] = useState<number>(1);

  let isLogin = authCtx.isLoggedIn;

  const fetchListHandler = useCallback(() => {
    boardCtx.getPageList(pageId);
  }, []);


  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);


  useEffect(() => {
    if (boardCtx.isSuccess) {
      setAList(boardCtx.page);
      console.log(AList);
      setMaxNum(boardCtx.totalPages);
    }
  }, [boardCtx])

  return (
    <div className={classes.list}>
      <BootStrapTable keyField='id' data = { AList } columns={ columns } />
      <div>{isLogin &&
        <Link to="/create">
          <Button>글 작성</Button>
        </Link>
      }
      </div>
      <Paging currentPage={Number(pageId)} maxPage={maxNum}/>
    </div>
  );
}
export default BoardList;