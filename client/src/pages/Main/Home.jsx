import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

//3 najnowsze newsy
const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="flex gap-10 flex-wrap justify-center">

      <h3>{content}</h3>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, blanditiis! Voluptas doloremque reprehenderit eveniet non fuga, qui adipisci ducimus ullam eum culpa dolorem vel magni et assumenda minus unde inventore.
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, iure accusamus natus inventore nesciunt blanditiis magnam hic ipsum enim cupiditate, explicabo dolores. Laborum, nostrum ipsum atque est eaque accusamus eius?</p>
    </div>
  );
};

export default Home;