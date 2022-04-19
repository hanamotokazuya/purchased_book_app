import React, {useState, useContext} from "react";
import AppContext from "../contexts/AppContext";
import styled from "styled-components";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {CATEGORIES} from "../constants";
import {useNavigate} from "react-router-dom";
import {CgClose} from "react-icons/cg";

axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
};


type Props = {
  close: () => void;
};
function CreateBook({close}: Props) {
  const {dispatch} = useContext(AppContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<Image>();
  const [errors, setErrors] = useState<string[]>([]);

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = e.target.files;
    if (files) {
      reader.onload = () => {
        setImage({
          data: reader.result,
          name: Math.random().toString(36).slice(-8),
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const handleClickSubmitBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {title, category, image};
    axios
      .post("/api/v1/books/create", {book: data})
      .then((res: AxiosResponse<Book | Array<string>>) => {
        const {data} = res;
        if (!Array.isArray(data)) {
          dispatch({
            type: "CREATE_BOOK_EVENT",
            book: data,
          });
          toast.success("新しく本が追加されました！");
          setTitle("");
          setCategory("");
          setImage({data: "", name: ""});
          close();
          navigate("/books");
        } else {
          setErrors(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Base>
      <BoxWrapper>
        <FormBox>
          <div className="icon">
            <CgClose style={{cursor: "pointer"}} onClick={() => close()} />
          </div>
          <form className="create-book-form">
            <input
              className="form-item"
              type="text"
              value={title}
              placeholder="本のタイトルを入力してください"
              onChange={(e) => setTitle(e.target.value)}
            />
            <select className="form-item" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option hidden>選択してください</option>
              {CATEGORIES.map((category, key) => (
                <option key={key}>{category}</option>
              ))}
            </select>
            <input className="form-item" type="file" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />
            <button className="submit" onClick={handleClickSubmitBook}>追加</button>
          </form>
        </FormBox>
        {!!errors.length && (
          <ErrorMessageBox>
            {errors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </ErrorMessageBox>
        )}
      </BoxWrapper>
    </Base>
  );
}

export default CreateBook;

const Base = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 1;
  background: rgba(0,0,0,0.6);
  z-index: 9999;
`;
const BoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FormBox = styled.div`
  width: 280px;
  height: 200px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    width: 250px;
    display: flex;
    justify-content: right;
    margin-bottom: 5px;
  }
  .create-book-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .form-item {
    width: 250px;
    height: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .submit {
    width: 250px;
    height: 30px;
    border-radius: 5px;
    background-color: white;
    color: #000000;
    cursor: pointer;
  }
`;
const ErrorMessageBox = styled.div`
  width: 280px;
  padding: 10px;
  margin-top: 10px;
  color: red;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;
