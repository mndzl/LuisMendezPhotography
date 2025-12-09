import { useEffect, useRef, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState<any[]>([
    {
      name: "",
    },
  ]);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const closeModalRef = useRef<HTMLButtonElement>(null); // close modal ref

  const fetchCategories = async () => {
    const endpoint = "/api/getcategories/";
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      setCategories(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCategory = async (categoryID: number) => {
    const endpoint = `/api/deletecategory/${categoryID}/`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Could not delete category.");

      // Refresh categories list
      fetchCategories();
      alert("Category deleted.");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormError(false);
    const { name, value } = e.target;
    setNewCategory((values) => ({ ...values, [name]: value }));
  };

  const createCategory = async () => {
    console.log(newCategory);
    const endpoint = "/api/newcategory/";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) throw new Error("Could not create category.");

      // Refresh categories list
      fetchCategories();
      setNewCategory({
        name: "",
      });

      alert("Category created successfully!");
      closeModalRef.current?.click(); // close modal
    } catch (e) {
      console.log(e);
      setFormError(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories">
      <div className="categories-heading d-flex justify-content-between align-items-center mb-4">
        <h1>Categories</h1>
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#createCategoryModal"
        >
          <i className="fa-solid fa-plus me-1"></i>
          Create
        </button>

        {/* Add category modal */}
        <div
          className="modal fade"
          id="createCategoryModal"
          aria-labelledby="createCategoryModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="createCategoryModalLabel">
                  Create New Category
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeModalRef}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Name"
                    name="name"
                    onChange={handleChange}
                    value={newCategory.name}
                    placeholder="Weddings"
                    required
                  />
                </form>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between">
                <div className="errors d-flex align-items-center">
                  {formError && (
                    <p className="text-danger mb-0">Please check fields.</p>
                  )}
                </div>
                <div className="modal-controls">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-1"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createCategory}
                    data-bs-dismiss="modal"
                    disabled={!newCategory.name}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="categories-list list-group">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="list-group-item d-flex justify-content-between flex-row align-items-center"
            >
              <div
                className="modal fade"
                id={`deleteCategoryModal-${category.id}`}
                aria-labelledby="deleteCategoryModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id="deleteCategoryModalLabel"
                      >
                        Delete category
                      </h1>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete {category.name}?
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-1"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteCategory(category.id)}
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title m-0">{category.name}</h5>
              </div>
              <button
                className="btn delete-category"
                data-bs-toggle="modal"
                data-bs-target={`#deleteCategoryModal-${category.id}`}
              >
                <i
                  className="fa-solid fa-trash-can text-danger"
                  style={{ cursor: "pointer" }}
                ></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
