import { useMemo, useState } from "react";
import newsData from "./data/newsData";
import NewsTicker from "./components/NewsTicker";
import SearchFilters from "./components/SearchFilters";
import FeaturedCarousel from "./components/FeaturedCarousel";
import NewsGrid from "./components/NewsGrid";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("All");

  const filteredNews = useMemo(() => {
    const now = new Date();

    // Start of the current week: Monday at 00:00
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);

    const day = startOfWeek.getDay();
    const daysSinceMonday = (day + 6) % 7;

    startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);

    // Start of the current month
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const search = searchTerm.trim().toLowerCase();

    return newsData
      .filter((article) => {
        // Search by title, description, or category
        const matchesSearch =
          (article.title || "").toLowerCase().includes(search) ||
          (article.description || "").toLowerCase().includes(search) ||
          (article.category || "").toLowerCase().includes(search);

        // All date filters use the article's publishedAt timestamp
        const publishedDate = article.publishedAt
          ? new Date(article.publishedAt)
          : null;

        const hasValidDate =
          publishedDate && !Number.isNaN(publishedDate.getTime());

        let matchesDate = true;

        if (selectedDate !== "All") {
          if (!hasValidDate || publishedDate > now) {
            matchesDate = false;
          } else if (selectedDate === "Today") {
            matchesDate =
              publishedDate.toDateString() === now.toDateString();
          } else if (selectedDate === "This Week") {
            matchesDate =
              publishedDate >= startOfWeek && publishedDate <= now;
          } else if (selectedDate === "This Month") {
            matchesDate =
              publishedDate >= startOfMonth && publishedDate <= now;
          }
        }

        return matchesSearch && matchesDate;
      })
      // Newest articles first
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0).getTime();
        const dateB = new Date(b.publishedAt || 0).getTime();

        return dateB - dateA;
      });
  }, [searchTerm, selectedDate]);

  return (
    <div className="app">
      <NewsTicker articles={newsData} />

      <main className="container">
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <FeaturedCarousel articles={newsData} />

        <section className="news-section">
          <NewsGrid articles={filteredNews} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;