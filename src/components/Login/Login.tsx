import React from "react";
import * as S from "../../styles/LoginStyle";
import loginLogo from "../../../image/loginLogo.svg";
import cancelLogin from "../../../image/cancelLogin.svg";
import { Store } from "../../modules/reducer";
import { useSelector, useDispatch } from "react-redux";
import {
  modalStateSaga,
  loginStateSaga,
  loginState,
} from "../../modules/action/loginCheck";

const Login = () => {
  const dispatch = useDispatch();
  const loginCheck = useSelector((store: Store) => store.loginCheck.modalCheck);
  const onXClick = () => {
    console.log("x");
    dispatch(modalStateSaga());
  };
  const onLogin = () => {
    dispatch(loginStateSaga());
    dispatch(modalStateSaga());
  };
  return (
    <>
      {loginCheck && (
        <>
          <S.Main>
            <S.MainDiv>
              <S.Content>
                <div>
                  <S.Image>
                    <img src={cancelLogin} onClick={onXClick} />
                  </S.Image>
                </div>
                <S.LoginHeader>
                  <div>Login</div>
                  <div>
                    <div>
                      <img src={loginLogo}></img>
                    </div>
                    <div>계속하려면 로그인하세요</div>
                  </div>
                </S.LoginHeader>
                <S.InputDiv>
                  <S.Input placeholder="Email을 입력하세요"></S.Input>
                  <S.Input
                    placeholder="Password를 입력하세요"
                    type="password"
                  ></S.Input>
                </S.InputDiv>
                <S.TextDiv>
                  <div>
                    <S.Circle />
                    <div>자동로그인</div>
                  </div>
                  <div>
                    <div>아직 계정이 없으신가요?&nbsp;</div>
                    <div>회원가입</div>
                  </div>
                </S.TextDiv>
                <S.LoginButton onClick={onLogin}>로그인</S.LoginButton>
                <S.BottomText>Dmeista</S.BottomText>
              </S.Content>
            </S.MainDiv>
          </S.Main>
        </>
      )}
    </>
  );
};

export default Login;
