import { useEffect, useState } from "react";
import { textileImages } from "../data/newsData";

function FeaturedCarousel({ articles = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    if (articles.length <= 1) {
      setCurrentIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % articles.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [articles.length]);

  useEffect(() => {
    if (currentIndex >= articles.length) {
      setCurrentIndex(0);
    }

    setFailedImages({});
  }, [currentIndex, articles.length]);

  if (!articles.length) return null;

  const article = articles[currentIndex];

  const availableImages = [
    ...new Set(
      [
        ...(Array.isArray(article.images) ? article.images : []),
        ...(Array.isArray(textileImages) ? textileImages : []),
      ].filter(
        (image) =>
          typeof image === "string" && image.trim() !== ""
      )
    ),
  ];

  // Select 11 images without repeating an image next to itself.
  const collageImages = Array.from({ length: 11 }, (_, index) => {
    if (!availableImages.length) return "";

    const previousImage =
      index > 0
        ? availableImages[
            (index - 1) % availableImages.length
          ]
        : "";

    let image =
      availableImages[index % availableImages.length];

    if (image === previousImage && availableImages.length > 1) {
      image =
        availableImages[(index + 1) % availableImages.length];
    }

    return image;
  });

  const showPrevious = () => {
    setCurrentIndex(
      (index) => (index - 1 + articles.length) % articles.length
    );
  };

  const showNext = () => {
    setCurrentIndex((index) => (index + 1) % articles.length);
  };

  const openArticle = () => {
    if (article.url && article.url !== "#") {
      window.open(
        article.url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleStoryKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openArticle();
    }
  };

  const handleImageError = (tileIndex) => {
    setFailedImages((previous) => ({
      ...previous,
      [tileIndex]: (previous[tileIndex] || 0) + 1,
    }));
  };

  const getDisplayImage = (index) => {
    const failureCount = failedImages[index] || 0;

    if (!availableImages.length) return "";

    const originalImage = collageImages[index];

    if (failureCount === 0) return originalImage;

    const alternatives = availableImages.filter(
      (image) =>
        image !== originalImage &&
        image !== collageImages[index - 1] &&
        image !== collageImages[index + 1]
    );

    return alternatives.length
      ? alternatives[(failureCount - 1) % alternatives.length]
      : "";
  };

  return (
    <section
      className="featured-carousel"
      aria-label="Featured textile news"
    >
      {/* Image collage */}
      <div className="featured-collage">
        {collageImages.map((image, index) => {
          const displayImage = getDisplayImage(index);

          return (
            <div
              key={`${currentIndex}-${index}-${failedImages[index] || 0}`}
              className={`featured-tile tile-${index + 1}`}
              style={{
                backgroundImage: displayImage
                  ? `url("${displayImage}")`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden="true"
            >
              {displayImage && (
                <img
                  src={displayImage}
                  alt=""
                  onError={() => handleImageError(index)}
                  style={{ display: "none" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Gradient overlay */}
      <div className="featured-gradient" />

      {/* Clickable featured story */}
      <div
        className="featured-story"
        role={article.url && article.url !== "#" ? "link" : undefined}
        tabIndex={article.url && article.url !== "#" ? 0 : undefined}
        onClick={openArticle}
        onKeyDown={handleStoryKeyDown}
        style={{
          cursor:
            article.url && article.url !== "#"
              ? "pointer"
              : "default",
        }}
      >
        <span className="featured-label">
          {article.category || "TEXTILE NEWS"}
        </span>

        <h2>{article.title || "Textile Industry News"}</h2>

        <p>{article.description || ""}</p>

        <div className="featured-meta">
          <span>
            {article.source || "Textile Industry News"}
          </span>
        </div>
      </div>

      {/* Arrows and dots stay clickable independently */}
      {articles.length > 1 && (
        <>
          <button
            type="button"
            className="featured-arrow featured-arrow-left"
            onClick={showPrevious}
            aria-label="Previous featured article"
          >
            ‹
          </button>

          <button
            type="button"
            className="featured-arrow featured-arrow-right"
            onClick={showNext}
            aria-label="Next featured article"
          >
            ›
          </button>

          <div className="featured-dots">
            {articles.map((item, index) => (
              <button
                key={item.id ?? index}
                type="button"
                className={index === currentIndex ? "active" : ""}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show featured article ${index + 1}`}
                aria-current={
                  index === currentIndex ? "true" : undefined
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default FeaturedCarousel;