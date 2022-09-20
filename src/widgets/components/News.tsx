import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/News.css";
import paper from "../../assets/paper.png";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=e30df54280aa40faa58253b2911b6f65"
      )
      .then((response) => {
        console.log(response);
        const newArr: any = response.data.articles;
        newArr.forEach((element) => {
          element.open = false;
        });
        setNewsList(newArr);
      });
  }, []);

  const handleRowClick = (arr: any, index) => {
    arr[index].open = !arr[index].open;
    setNewsList(arr);
    setKey(key + 1);
    console.log(newsList);
  };

  return (
    <div className="container glass">
      <div className="newsBody">
        {newsList.map((news: any, index) => {
          return (
            <div key={index}>
              <div
                id={news.name}
                className="newsArticle"
                style={{ backgroundImage: `${paper}` }}
                onClick={() => handleRowClick(newsList, index)}
              >
                <img className="newsImage" src={news.urlToImage} alt="" />
                <div className="newsTitle">{news.title}</div>
              </div>
              <div
                className="newsDescription"
                style={
                  newsList[index].open
                    ? {
                        height: "170px",
                        paddingTop: "10px",
                      }
                    : { height: "0px" }
                }
              >
                {news.content}
                <div className="source">
                  <a href={news.url}>{news.source.name}</a>
                  <p>
                    {news.publishedAt.toString().split("T")[0].split("-")[2]}.
                    {news.publishedAt.toString().split("T")[0].split("-")[1]}.
                    {news.publishedAt.toString().split("T")[0].split("-")[0]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
