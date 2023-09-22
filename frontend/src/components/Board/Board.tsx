import { useNavigate } from "react-router-dom";

type Props = { item:BoardInfo, onDelete: (id:string) => void }

type BoardInfo = {
  boardId: number,
  memberName: string,
  boardTitle: string,
  boardBody?: string,
  cratedAt: string,
  updatedAt?: string,
  written?: boolean
};

const Board:React.FC<Props> = (props) => {

  let navigate = useNavigate();

  const id = props.item!.boardId.toString();

  const backHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/page/1");
  }
  
  const updateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("../update/" + id);
  }

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")){
      props.onDelete(id);
    }
  }

  return (
    <div>
      <header>
          <h4>{props.item!.boardTitle}</h4>
          <div>
            <span>이름: {props.item!.memberName}</span><br />
            <span>날짜 : {props.item!.updatedAt}</span>
          </div>
        </header>
        <div>
          <div>{props.item!.boardBody}</div>
        </div>
        <button onClick={backHandler}>뒤로</button>
        {props.item!.written && 
          <div>
            <button onClick={updateHandler}>수정</button><br />
            <button onClick={deleteHandler}>삭제</button>
          </div>
        }
    </div>
  );
}

export default Board;