import { GET, POST, PUT, DELETE }  from "./fetch-action";

interface PostBoard {
  id? : string,
  title: string,
  body: string
}

const createTokenHeader = (token:string) => {
  return {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
}

export const getPageList = (param:string) => {
  const URL = '/board/page?page=' + param;
  const response = GET(URL, {});
  return response;
}

export const getOneBoard = (param:string, token?:string) => {
  const URL= '/board/one?id=' + param;
  if (!token) {
    const response = GET(URL, {});
    return response;
  } else {
    const response = GET(URL, createTokenHeader(token));
    return response;
  }
};

export const makeBoard = (token:string, board:PostBoard) => {
  const URL = '/board/';
  const response = POST(URL, board, createTokenHeader(token));
  return response;
};

export const getChangeBoard = (token:string, param:string) => {
  const URL = '/board/change?id=' + param;
  const response = GET(URL, createTokenHeader(token));
  return response;
};

export const changeBoard = (token:string, board:PostBoard) => {
  const URL = '/board/';
  const response = PUT(URL, board, createTokenHeader(token));
  return response;
};

export const deleteBoard = (token:string, param:string) => {
  const URL = '/board/one?id=' + param;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
}