function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
}) {
  const filters = ["All", "Today", "This Week", "This Month"];

  return (
    <div className="search-filters">
      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`filter-button ${
              selectedDate === filter ? "active" : ""
            }`}
            onClick={() => setSelectedDate(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilters;