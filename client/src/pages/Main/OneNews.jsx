import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import ArticleService from '../../services/article.service'
import { useStateContext } from '../../services/ContextProvider';
import UserService from '../../services/user.service';
import Moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const OneNews = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState()
  const [users, setUsers] = useState([])
  useEffect(() => {
    UserService.showUsers()
      .then(response => {
        setUsers(response.data.map(e => { return { id: e.id, username: e.username } }))
      }).catch(error => {
        console.error(error)
      })
    ArticleService.get_one_article(id)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error(error)
      })
  }, [])


  return (
    <div>
      {article && users ?
        <div className="flex flex-wrap justify-center min-h-screen content-center">

          <div className="flex-1 gap-y-4 w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
            <h1 className="mb-4 flex justify-between items-center text-4xl font-extrabold tracking-tight leading-none">
            <button className='p-4 shadow-xl text-2xl m-2 rounded-lg border-1 hover:bg-gray-400 hover:text-white' onClick={() => navigate("/news")}>Wróć</button>
              {article.title}

            </h1>
            <div className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-main-dark-bg dark:border-gray-700">
              <div className='text-end text-xs'>{article.createdAt !== article.updatedAt ? "Edytowane: " + Moment(article.updatedAt).format('DD-MM-YYYY') : "Dodane: " + Moment(article.createdAt).format('DD-MM-YYYY')} {users.find(user => user.id === article.user_id) ? users.find(user => user.id === article.user_id).username : null}</div>

              <p className='mb-3 font-light'>{article.content}</p>
            </div>
          </div>
        </div>
        : "błąd"}
    </div>
  )
}

export default OneNews
