import React, { useState, useEffect } from "react";
import ArticleService from '../../services/article.service'
import Moment from 'moment';
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
//3 najnowsze newsy
const Home = () => {

  const navigate = useNavigate();
  const [articles, setArticles] = useState([])


  useEffect(() => {
    ArticleService.get_home_articles()
      .then(response => {
        setArticles(response.data);
      })
  }, []);

  return (
    <div className="flex flex-wrap justify-center min-h-screen content-center">

      <div className="flex-1 gap-y-4 w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">



        <div className="flex justify-center items-center m-5">
          <img src={logo} alt="Logo" className="h-52" />
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-center text-gray-900 md:text-4xl lg:text-5xl dark:text-white"> Aplikacja internetowa wspomagającapracę ośrodka dla niepełnosprawnych</h1>

        <p className="mb-6 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Powstała aby pomagać osobom niepełnosprawnym korzystać z ośrodka w dobie internetu.</p>


        <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none">Aktualności</h1>
        {articles.map(e =>
          <div key={e.id} className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-main-dark-bg dark:border-gray-700">
            <div className='text-end text-xs'>{e.createdAt !== e.updatedAt ? "Edytowane: " + Moment(e.updatedAt).format('DD-MM-YYYY') : "Dodane: " + Moment(e.createdAt).format('DD-MM-YYYY')}</div>
            <h6 className="text-lg font-bold dark:text-white">{e.title}</h6>
            <p className='mb-3 font-light line-clamp-2'>{e.content}</p>
            <div className='flex flex-row justify-end'>
              <button className="p-3 shadow-xl rounded-lg  bg-green-700 text-white hover:bg-gray-400 hover:text-black " onClick={() => navigate("/news/"+ e.id)}>Szczegóły</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;