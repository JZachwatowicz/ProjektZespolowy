import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import ArticleService from '../services/article.service'
import { useStateContext } from '../services/ContextProvider';
import UserService from '../services/user.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
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
    UserService.get_all_users()
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

    return (
      <>
        <tr key={e.id}>
          <td>
            <input type="text" value={updateTitle} onChange={onChangeUpdateTitle} />
          </td>
          <td>
            <textarea value={updateContent} onChange={onChangeUpdateContent} />
          </td>
          <td>{e.createdAt}</td>
          <td>{e.createdAt !== e.updatedAt ? e.updatedAt : null}</td>

          <td>{users.find(user => user.id === e.user_id) ? users.find(user => user.id === e.user_id).username : null}</td>

          <td><button onClick={() => handleUpdateArticle(e.id)}>Save</button></td>
          <td><button onClick={() => handleDeleteArticle(e.id)}>X</button></td>


        </tr>
      </>
    )
  }

  return (

    <div>
      Aktualności
      {showAdminBoard || showEmployeeBoard ?
        <Form onSubmit={handleAddArticle} ref={form} className="flex-2 text-center">


          <>
            Tytuł<Input
              value={title}
              onChange={onChangeTitle}
              type="text"
              validations={[required, vtitle]} />

            Opis<Textarea
              value={content}
              onChange={onChangeContent}
              validations={[required, vcontent]} /><button className='btn btn-primary' type="submit">
              Add Article
            </button></>


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
        : null}

      <table className='w-full text-center'>
        <tbody>
          <tr><th>title</th><th>content</th><th>createdAt</th><th>updatedAt</th><th>author</th></tr>

          {articles.map(e =>
            editState === e.id ? updateForm({ e }) :
              <tr key={e.id}><td>{e.title}</td><td>{e.content}</td><td>{e.createdAt}</td><td>{e.createdAt !== e.updatedAt ? e.updatedAt : null}</td><td>{users.find(user => user.id === e.user_id) ? users.find(user => user.id === e.user_id).username : null}</td>
                {showAdminBoard || showEmployeeBoard ? <><td><button onClick={() => handleEditArticle(e)}>Edit</button></td><td>
                  <button onClick={() => handleDeleteArticle(e.id)}>X</button></td></> : null}

              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default News
