import React from "react";
import NewsCard from "./NewsCard";

function NewsGrid({ articles = [] }) {
  if (!Array.isArray(articles) || articles.length === 0) {
    return (
      <div className="no-news">
        <h3>No news articles found</h3>
        <p>Try another date filter or change your search.</p>
      </div>
    );
  }

  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <NewsCard
          key={article.id ?? article.title ?? index}
          article={article}
        />
      ))}
    </div>
  );
}

export default NewsGrid;