import React, { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "../../styles/NewPostStyle";
import { Store } from "../../modules/reducer/index";
import cancelLogin from "../../../image/cancelLogin.svg";
import { newPostSaga } from "../../modules/action/loginCheck";
import axios from "axios";

const NewPost = () => {
  const dispatch = useDispatch();
  const token: string = localStorage.getItem("token");
  const newPostCheck: boolean = useSelector(
    (store: Store) => store.loginCheck.newPost
  );
  const [autoTag, setAutoTag] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [tags, setTags] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const onXClick = () => {
    dispatch(newPostSaga());
  };
  const onCheckBoxChange = (e) => {
    setAutoTag(e.target.checked);
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];
    setImageFile([...imageFile, file]);
  };
  const onWriteClick = () => {
    const form: FormData = new FormData();
    imageFile.forEach((file) => form.append("imageFile", file));
    console.log(title);
    console.log(autoTag);
    console.log(content);
    console.log(tags);
    axios
      .post(
        `http://3.36.218.14:8080/posts?autoTag=${autoTag}&content=${content}&tags=${tags}&title=${title}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        dispatch(newPostSaga());
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios.put("http://3.36.218.14:8080/auth", {});
        }
      });
  };
  const onCancelClick = () => {
    dispatch(newPostSaga());
  };
  const onSubmitEnter = (e) => {
    if (e.key == "Enter") {
      if (title && autoTag && content && tags) {
        const form: FormData = new FormData();
        imageFile.forEach((file) => form.append("imageFile", file));
        axios
          .post(
            `http://3.36.218.14:8080/posts?autoTag=${autoTag}&content=${content}&tags=${tags}&title=${title}`,
            form,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            dispatch(newPostSaga());
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.status === 401) {
              axios.put("http://3.36.218.14:8080/auth", {});
            }
          });
      }
    }
  };
  return (
    <>
      {newPostCheck && (
        <S.Main onKeyPress={onSubmitEnter}>
          <S.MainDiv>
            <S.Content>
              <S.Image>
                <img src={cancelLogin} onClick={onXClick} />
              </S.Image>
              <S.Header>??? ????????? ??????</S.Header>
              <S.InputTitle
                placeholder="????????? ???????????????"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <S.InputContent
                placeholder="????????? ???????????????"
                onChange={(e) => setContent(e.target.value)}
              />
              <S.FlexDiv>
                <S.ImageContent>
                  <div>
                    <S.ImageTag
                      type="checkbox"
                      onChange={onCheckBoxChange}
                      id="checkBox"
                      value="check"
                    ></S.ImageTag>
                    <S.Text>????????? ?????? ?????? ??????</S.Text>
                    <S.ImageBtn
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    >
                      ????????? ??????
                    </S.ImageBtn>
                    <S.fileInput
                      type="file"
                      accept="image/*"
                      id="fileInput"
                      onChange={onInputChange}
                    ></S.fileInput>
                  </div>
                </S.ImageContent>
                <S.TagContent
                  placeholder="????????? ????????? ????????? ex) ??????, dmeista"
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                />
              </S.FlexDiv>
              <S.ButtonDiv>
                <S.CancelBtn onClick={onCancelClick}>??????</S.CancelBtn>
                <S.WriteDiv onClick={onWriteClick}>????????? ??????</S.WriteDiv>
              </S.ButtonDiv>
            </S.Content>
          </S.MainDiv>
        </S.Main>
      )}
    </>
  );
};

export default NewPost;
