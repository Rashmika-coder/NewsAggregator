function NewsTicker({ articles = [] }) {
  const tickerArticles = [...articles, ...articles];

  return (
    <div className="news-ticker">
      <div className="ticker-track">
        {tickerArticles.map((article, index) => (
          <div className="ticker-item" key={`${article.id ?? article.title}-${index}`}>
            <span className={`ticker-dot ticker-dot-${index % 3}`} />
            <span className="ticker-headline">{article.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsTicker;