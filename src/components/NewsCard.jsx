import { useState } from "react";
import { textileImages, getTimeAgo } from "../data/newsData";

function NewsCard({ article }) {
  const {
    id = "",
    title = "Untitled News",
    description = "",
    images = [],
    image = "",
    imageUrl = "",
    source = "Textile Industry News",
    url = "#",
    publishedAt,
    timeAgo = "",
  } = article || {};

  const [shareMessage, setShareMessage] = useState("");

  // Get images for the collage
  const providedImages = Array.isArray(images) ? images : [];

  const imageList = providedImages.length
    ? providedImages
    : imageUrl || image
      ? [imageUrl || image]
      : textileImages;

  const safeImages = imageList.length
    ? imageList
    : ["/images/traditional-weaving.jpg"];

  // Display 11 images
  const uniqueImages = Array.from(
    { length: 11 },
    (_, index) => safeImages[index % safeImages.length]
  );

  // Published time
  const displayTime = publishedAt
    ? getTimeAgo(publishedAt)
    : timeAgo;

  // Share article
  const shareArticle = async () => {
    const articleUrl =
      url && url !== "#"
        ? url
        : window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url: articleUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `${title}\n${description}\n${articleUrl}`
        );

        setShareMessage("Article details copied!");

        setTimeout(() => setShareMessage(""), 3000);
      } else {
        setShareMessage("Sharing is not supported.");
        setTimeout(() => setShareMessage(""), 3000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setShareMessage("Unable to share this article.");
        setTimeout(() => setShareMessage(""), 3000);
      }
    }
  };

  return (
    <article className="news-card" data-article-id={id}>
      <div className="news-card-image-grid">
        {uniqueImages.map((imageSrc, index) => (
          <div
            className="news-card-image"
            key={`${imageSrc}-${index}`}
          >
            <img
              src={imageSrc}
              alt={`${title} - textile image ${index + 1}`}
              loading="lazy"
              onError={(event) => {
                const img = event.currentTarget;

                if (img.dataset.fallbackAttempted) {
                  img.style.display = "none";
                  return;
                }

                img.dataset.fallbackAttempted = "true";

                if (textileImages.length > 0) {
                  img.src = textileImages[0];
                } else {
                  img.style.display = "none";
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="news-card-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <div className="news-card-footer">
          {url && url !== "#" ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-source"
            >
              {source}
            </a>
          ) : (
            <span className="news-source">{source}</span>
          )}

          <span className="news-time">
            {displayTime || "Date unavailable"}
          </span>

          <button
            type="button"
            className="share-button"
            onClick={shareArticle}
            aria-label={`Share ${title}`}
            title="Share article"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />

              <line x1="8.6" y1="10.7" x2="15.4" y2="6.3" />
              <line x1="8.6" y1="13.3" x2="15.4" y2="17.7" />
            </svg>
          </button>
        </div>

        {shareMessage && (
          <div className="share-message" role="status">
            {shareMessage}
          </div>
        )}
      </div>
    </article>
  );
}

export default NewsCard;