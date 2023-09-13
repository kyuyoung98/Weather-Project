import React, { useEffect } from 'react';
import './Member.css';

const LoginForm = ({ activeIndex, handleManagerClick, handleExternalWorkerClick, email, password, setEmail, setPassword, handleLogin, emailErr, passwordErr, err }) => {
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia('(max-width: 1000px)').matches;
      if (isMobile) {
        handleExternalWorkerClick(); // 너비 1000px 이하일 때 사외공사자 버튼 클릭 이벤트 처리
      }
    };

    handleResize(); // 초기 로드 시 한 번 호출하여 초기 값 설정
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleExternalWorkerClick]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-form">
      <ul className='login-ul'>
        <li
          onClick={handleManagerClick}
          className={`radio-li ${activeIndex === 0 ? 'login-active' : ''}`}
        >
          <p className={`login-li-text ${activeIndex === 0 ? '' : 'login-disabled'}`}>
            a
          </p>
        </li>
        <li
          onClick={activeIndex !== 1 ? handleExternalWorkerClick : null}
          className={`radio-li ${activeIndex === 1 ? 'login-active' : ''}`}
        >
          <p className={`login-li-text ${activeIndex !== 1 ? 'login-disabled' : ''}`}>
            b
          </p>
        </li>
      </ul>
      <div className='login-input-form'>
        <div className='input-border'>
          <img className="icon-input" alt="Element" src={process.env.PUBLIC_URL + '/login_id.png'} />
          <input type="text" className="text-input" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} />
        </div>
        <div className='input-border'>
          <img className="icon-input1" alt="Element" src={process.env.PUBLIC_URL + '/login_pw.png'} />
          <input type="password" className="text-input" placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
        </div>
      </div>
      <div className='error-group'>
        {emailErr && <span className="log-error-message e-email">이메일을 입력해주세요.</span>}
        {passwordErr && <span className="log-error-message e-pw">비밀번호를 입력해주세요.</span>}
        {err && (<div className="log-error-message e-co" dangerouslySetInnerHTML={{ __html: err }} />)}
      </div>
      <button type="submit" className="submit" onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginForm;