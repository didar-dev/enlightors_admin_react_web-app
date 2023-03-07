import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewArticle from "./components/NewArticle";
import { setArticles } from "../../redux/articles";
function Articles() {
  const [newarticle, setNewArticle] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  const getArticles = () => {
    return (dispatch) => {
      fetch("http://localhost:3000/article/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setArticles(data.articles));
        });
    };
  };

  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Articles</h1>{" "}
        <button
          onClick={() => setNewArticle(true)}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          Add Article
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className=" p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col w-full gap-2">
        {articles &&
          articles.articles
            .filter(
              (article) =>
                article.title.toLowerCase().includes(search.toLowerCase()) ||
                article.description.toLowerCase().includes(search.toLowerCase())
            )
            .map((article) => (
              <div
                key={article.id}
                className="flex flex-row w-full justify-between items-center p-2 bg-gray-100 rounded-md"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold text-gray-800">
                    {article.title}
                  </h1>
                  <p className="text-gray-800">{article.description}</p>
                </div>
              </div>
            ))}
      </div>
      <NewArticle
        isOpen={newarticle}
        setIsOpen={setNewArticle}
        getArticles={getArticles}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Articles;
