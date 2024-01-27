import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";
import CategoryTag from "@/Components/CategoryTag.jsx";
import {FaArrowRight} from "react-icons/fa";

const CategoryModal = ({categories}) => {

    const [confirmShowCategories, setConfirmShowCategories] = useState(false);

    const showCategories = () => {
        setConfirmShowCategories(true);
    };
    const closeModal = () => {
        setConfirmShowCategories(false);
    };

    return (
        <>
            <button onClick={showCategories} className="text-sm">
                <p className="flex items-center">See Category<FaArrowRight/></p>
            </button>
            <Modal maxWidth={"xl"} show={confirmShowCategories} onClose={closeModal}>
                <div className="grid grid-cols-4 gap-4">
                    {categories.map(category => {
                        return (
                            <CategoryTag key={category.id} categoryProp={category}/>
                        )
                    })}
                </div>
            </Modal>
        </>
    );
};

export default CategoryModal;
