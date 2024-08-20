import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

// import CategoryAddModal
import CategoryAddModal from './CategoryModals/CategoryAddModal.jsx';

// import CategoryUpdateModal
import CategoryUpdateModal from './CategoryModals/CategoryUpdateModal.jsx';

// import CategoryDeleteModal
import CategoryDeleteModal from './CategoryModals/CategoryDeleteModal.jsx';

import API_BASE_URL from '../config.js';

const Categories = () => {

    // get Categories to display
    const [categories, setCategories] = useState([]);

    // set loading...
    const [loading, setLoading] = useState(true);

    // Handle individual variables
    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState("");

    // Add Modal
    const [showAddModal, setShowAddModal] = useState(false);
    const makeAddModalAppear = () => setShowAddModal(!showAddModal);

    // Update Modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const makeUpdateModalAppear = () => setShowUpdateModal(!showUpdateModal);

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const makeDeleteModalAppear = () => setShowDeleteModal(!showDeleteModal);

    const handleSelectedData = async (id, name) => {
        setCategoryId(id);
        setCategoryName(name);
    }

    // Fetch Categories
    const getCategories = async () => {
        const response = await fetch(
            API_BASE_URL+
            "/api/CategoryApi/GetCategories"
        );
        const result = await response.json();
        setCategories(result);
        setLoading(false);
    }

    // Add Category
    const saveCategory = async () => {
        const dataToSend = {
            "categoryName": categoryName,
        }

        const response = await fetch(
            API_BASE_URL+
            "/api/CategoryApi/SaveCategory",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }
        );

        if (response.ok) {
            await getCategories();
            makeAddModalAppear();
            setCategoryName('');
            toast.success('Category saved successfully');
        } else {
            toast.error('Failed to save category');
        }
    }

    // Update Category
    const updateCategory = async () => {
        const dataToSend = {
            "categoryName": categoryName,
        }

        const response = await fetch(
            API_BASE_URL+
            "/api/CategoryApi/UpdateCategory?Id=" + categoryId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }
        );

        if (response.ok) {
            await getCategories();
            makeUpdateModalAppear();
            setCategoryName('');
            toast.success('Category updated successfully');
        } else {
            toast.error('Failed to update category');
        }
    }

    // Delete Category
    const deleteCategory = async () => {
        const response = await fetch(
            API_BASE_URL+
            "/api/CategoryApi/DeleteCategory?Id=" + categoryId,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            await getCategories();
            makeDeleteModalAppear();
            setCategoryName('');
            toast.success('Category deleted successfully');
        } else {
            toast.error('Failed to delete category');
        }
    }

    // update browser in case of database updates
    useEffect(() => {
        getCategories();
    }, []);

    // if the browser is still loading data
    if (loading) return <center><h1>Loading</h1></center>

    return (
        <>
            {/* Add Category */}
            <CategoryAddModal
                showAddModal={showAddModal}
                makeAddModalAppear={makeAddModalAppear}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                saveCategory={saveCategory}
            />

            {/* Update Category */}
            <CategoryUpdateModal
                showUpdateModal={showUpdateModal}
                makeUpdateModalAppear={makeUpdateModalAppear}
                categoryId={categoryId}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                setCategoryId={setCategoryId}
                updateCategory={updateCategory}
            />

            {/* Delete Category */}
            <CategoryDeleteModal
                showDeleteModal={showDeleteModal}
                makeDeleteModalAppear={makeDeleteModalAppear}
                categoryId={categoryId}
                categoryName={categoryName}
                deleteCategory={deleteCategory}
            />
           
            {/* Display All Category Data */}
            <div className="crud-content-container">
                {/* Show Add Category Modal */}
                <div className="add-client-btn-container">
                    <button className="action-btn add-client-btn" onClick={makeAddModalAppear}>Add New Category</button>
                </div>

                <div className="table-container">
                    <div className="fixTableHead Narrow" style={{backgroundColor: '#eaebeb'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th className='action-btn-row-container'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((c) =>
                                    <tr key={c.categoryId}>
                                        <td>{c.categoryId}</td>
                                        <td>{c.categoryName}</td>
                                        <td className='action-btn-container-display'>
                                            <button className="action-btn row-btn update-client-btn" onClick={() => { handleSelectedData(c.categoryId, c.categoryName); makeUpdateModalAppear() }}>Update</button>
                                            <button className="action-btn row-btn delete-client-btn" onClick={() => { handleSelectedData(c.categoryId, c.categoryName); makeDeleteModalAppear() }}>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           
            <Toaster expand={true} richColors position='bottom-right' className='mr-8'></Toaster>
        </>
    );
}

export default Categories;
