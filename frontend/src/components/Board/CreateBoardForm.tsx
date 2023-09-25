import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BoardContext from "../../store/board-context";
import AuthContext from "../../store/auth-context";

type Props = { item:string | undefined }

interface PostBoard {
  id?: string
  title: string,
  body: string
} 


const CreateBoardForm:React.FC<Props> = (props) => {

  let navigate = useNavigate();


  const [updateBoard, setUpdateBoard] = useState<PostBoard>({
    title: '',
    body: ''
  });

  const boardCtx = useContext(BoardContext);
  const authCtx = useContext(AuthContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let postBoard:PostBoard = {
      title: titleRef.current!.value,
      body: mainRef.current!.value
    }

    if (props.item) {
      console.log('update!');
      postBoard = { ...postBoard, id:props.item }
    }

    props.item 
    ? boardCtx.updateBoard(authCtx.token, postBoard) : boardCtx.createBoard(postBoard, authCtx.token);
  }

  const setUpdateBoardHandler = useCallback(() => {
    if (boardCtx.isGetUpdateSuccess) {
      setUpdateBoard({
        title: boardCtx.board!.boardTitle,
        body: boardCtx.board!.boardBody
      })
    }
  }, [boardCtx.isGetUpdateSuccess])

  useEffect(() => {
    if (props.item) {
      boardCtx.getUpdateBoard(authCtx.token, props.item);
    }
  }, [props.item])

  useEffect(() => {
    console.log('update effect')
    setUpdateBoardHandler();
  }, [setUpdateBoardHandler])

  useEffect(() => {
    if (boardCtx.isSuccess) {
      console.log("wrting success");
      navigate("/page/1", { replace: true })
    }
  }, [boardCtx.isSuccess])

  return (
    <div>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="제목을 입력하세요"
              required
              ref={titleRef}
              defaultValue={updateBoard.title}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>본문</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={20}
              required
              ref={mainRef}
              defaultValue={updateBoard.body} 
            /> 
          </Form.Group>
          <br />
          <Button variant="primary">
            취소
          </Button>
          <Button variant="primary" type="submit">
            작성
          </Button>
        </Form>
    </div>
  );
}

export default CreateBoardForm;