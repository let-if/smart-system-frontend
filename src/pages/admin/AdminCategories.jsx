
import { useState, useEffect } from "react";
import "./AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");

  // Load categories from localStorage on mount
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(savedCategories);
  }, []);

  // Add new category
  const handleAddCategory = () => {
    if (!categoryName.trim()) return alert("Category name required");

    const newCategory = {
      id: Date.now(),
      name: categoryName.trim(),
      description: categoryDesc.trim(),
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    // Clear form
    setCategoryName("");
    setCategoryDesc("");
  };

  // Remove category
  const handleRemoveCategory = (id) => {
    const updatedCategories = categories.filter((c) => c.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <div className="admin-categories-container">
      <h2>Manage Categories</h2>

      <div className="add-category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={categoryDesc}
          onChange={(e) => setCategoryDesc(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      <div className="categories-list">
        {categories.length === 0 && <p>No categories yet</p>}
        {categories.map((c) => (
          <div key={c.id} className="category-item">
            <div>
              <strong>{c.name}</strong>
              {c.description && <span> - {c.description}</span>}
            </div>
            <button className="remove-btn" onClick={() => handleRemoveCategory(c.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;