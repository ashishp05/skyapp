"use client";
import { useEffect, useState } from "react";
import styles from "./ProductFilter.module.css";

export default function ProductFilter({ onFilterChange, tags = ["All", "Laptop", "Desktop", "Computer", "Tablets", "Apple", "Accessories"] }) {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Whenever filter changes, trigger parent handler
  useEffect(() => {
    onFilterChange({
      search,
      startDate: startDate , // today if empty
      endDate: endDate ,
      tag: selectedTag,
    });
  }, [search, startDate, endDate, selectedTag]);

  console.log(search , startDate , endDate , selectedTag)
  return (
    <form className={styles.filterContainer} >
      {/* Search Field */}
      <input
        type="text"
        placeholder="Search by name or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {/* Date Range */}
      <div className={styles.dateRange}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.dateInput}
        />
        <span className={styles.toText}>to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>

      {/* Tag Dropdown */}
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className={styles.dropdown}
      >
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </form>
  );
}
