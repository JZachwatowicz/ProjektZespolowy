import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import ArticleService from '../../services/article.service'
import { useStateContext } from '../../services/ContextProvider';
import UserService from '../../services/user.service';
import Moment from 'moment';

//Podział na strony

const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-500 font-medium">
        To pole jest wymagane!
      </div>
    );
  }
};

const vtitle = (value) => {
  if (value.length > 100) {
    return (
      <div className="invalid-feedback d-block">
        Title of the article has to be under 100 characters.
      </div>
    );
  }
};

const vcontent = (value) => {
  if (value.length > 400) {
    return (
      <div className="invalid-feedback d-block">
        Description of the article has to be under 400 characters.
      </div>
    );
  }
};

const News = () => {

  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();
  const form = useRef();
  const checkBtn = useRef();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [articles, setArticles] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState("")

  const [editState, setEditState] = useState(-1)
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onChangeUpdateTitle = (e) => {
    setUpdateTitle(e.target.value);
  };

  const onChangeUpdateContent = (e) => {
    setUpdateContent(e.target.value);
  };

  const fetchData = () => {
    ArticleService.get_all_articles()
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      })
  }

  useEffect(() => {
    UserService.showUsers()
      .then(response => {
        setUsers(response.data.map(e => { return { id: e.id, username: e.username } }))
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      })

    fetchData()
  }, []);



  const handleAddArticle = (e) => {
    e.preventDefault()

    setMessage("");

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      ArticleService.post_article({ user_id: currentUser.id, title: title, content: content })
        .then(() => fetchData())
        .catch(error => {
          console.error(error)
          setMessage(error.message);
        })
    }
  }

  const handleDeleteArticle = (id) => {
    setMessage("");

    ArticleService.delete_article(id)
      .catch(error => {
        setMessage(error.message);
        console.error(error);
      });
    setArticles(articles.filter(e => e.id !== id)
    );
  }

  const handleUpdateArticle = (id) => {
    setMessage("");

    if (updateTitle.length < 100 && updateContent.length < 400 && updateTitle && updateContent) {
      ArticleService.update_article(id, { title: updateTitle, content: updateContent })
        .then(() => fetchData())
        .catch(error => {
          setMessage(error.message);
          console.error('There was an error!', error);
        });
    }

    setEditState(-1)
  }

  const handleEditArticle = (e) => {
    setEditState(e.id)
    setUpdateTitle(e.title)
    setUpdateContent(e.content)
  }

  const updateForm = ({ e }) => {
    const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (

      <div key={e.id} className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-main-dark-bg dark:border-gray-700">
        <div className='text-end text-xs'>{e.createdAt !== e.updatedAt ? "Edytowane: " + Moment(e.updatedAt).format('DD-MM-YYYY') : "Dodane: " + Moment(e.createdAt).format('DD-MM-YYYY')} {users.find(user => user.id === e.user_id) ? users.find(user => user.id === e.user_id).username : null}</div>
        <h6 className="text-lg font-bold dark:text-white">            <input type="text" value={updateTitle} className={formStyle} onChange={onChangeUpdateTitle} />
        </h6>

        <p className='mb-3 font-light'>
          <textarea value={updateContent} className={formStyle} onChange={onChangeUpdateContent} />
        </p>
        <div className='flex flex-row justify-end'>
          <button className="p-3 shadow-xl m-1 rounded-lg  bg-green-700 text-white hover:bg-gray-400 hover:text-black " onClick={() => handleUpdateArticle(e.id)}>Zapisz</button>
          <button className="p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800" onClick={() => handleDeleteArticle(e.id)}>                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
          </button>
        </div>
      </div>
    )
  }
  const formStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (

    <div className="flex flex-wrap justify-center min-h-screen content-center">

      <div className="flex-1 gap-y-4 w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none">Aktualności</h1>

        {showAdminBoard || showEmployeeBoard ?
          <div className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-main-dark-bg dark:border-gray-700">

            <Form onSubmit={handleAddArticle} ref={form} className="space-y-6">


              <>
                <div>
                  <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tytuł</label>
                  <Input
                    name="title"
                    value={title}
                    className={formStyle}
                    onChange={onChangeTitle}
                    type="text"
                    validations={[required, vtitle]} />
                </div>
                <div>
                  <label for="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis</label>
                  <Textarea
                    name="content"
                    value={content}
                    className={formStyle}
                    onChange={onChangeContent}
                    validations={[required, vcontent]} />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dodaj</button>

              </>


              {message ? (
                <div className="form-group">
                  <div
                    className={
                      message ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              ) : null}
              <CheckButton ref={checkBtn} />
            </Form>
          </div>
          : null}



        {articles.map(e =>
          editState === e.id ? updateForm({ e }) :
            <div key={e.id} className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-main-dark-bg dark:border-gray-700">
              <div className='text-end text-xs'>{e.createdAt !== e.updatedAt ? "Edytowane: " + Moment(e.updatedAt).format('DD-MM-YYYY') : "Dodane: " + Moment(e.createdAt).format('DD-MM-YYYY')} {users.find(user => user.id === e.user_id) ? users.find(user => user.id === e.user_id).username : null}</div>
              <h6 className="text-lg font-bold dark:text-white">{e.title}</h6>

              <p className='mb-3 font-light'>{e.content}</p>



              {showAdminBoard || showEmployeeBoard ?
                <div className='flex flex-row justify-end'>
                  <button className="p-3 shadow-xl m-1 rounded-lg  bg-gray-600 text-white hover:bg-gray-400 hover:text-black " onClick={() => handleEditArticle(e)}>Edytuj</button>
                  <button className="p-3 shadow-xl m-1 rounded-lg  text-white bg-red-600 border border-red-700 hover:bg-red-800 " onClick={() => handleDeleteArticle(e.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg></button>
                </div>
                : null}

            </div>
        )}

      </div>
    </div>
  )
}

export default News
