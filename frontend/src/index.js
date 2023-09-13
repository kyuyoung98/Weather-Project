import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import axios from 'axios';
import { API_URL } from './pages/config';

// axios 인터셉터 설정 리프레시 토큰을 위해서 사용.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 여기에 토큰 갱신 및 다른 작업을 수행하는 로직을 추가할 수 있습니다.
      console.log('토큰을 갱신합니다.');

      // 예시: 토큰 갱신 후 재시도하는 로직
      return axios
        .post(`${API_URL}8080/auth/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken'),
        })
        .then((response) => {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          console.log('토큰 갱신 완료');
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios.request(error.config);
        })
        .catch((refreshError) => {
          console.error('토큰 갱신 오류:', refreshError);
          // 토큰 갱신에 실패한 경우 로그인 페이지로 리디렉션 또는 적절한 에러 처리를 수행할 수 있습니다.
          // 예시: 로그인 페이지로 리디렉션
          window.location.href = '/';
          return Promise.reject(refreshError);
        });
    }

    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);