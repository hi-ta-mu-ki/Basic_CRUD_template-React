import React, { useEffect,useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { A_masterData } from "../../const"

type EditProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmitData: (data: A_masterData) => void;
    item: A_masterData;
};

const Edit: React.FC<EditProps> = ({ isOpen, onRequestClose, onSubmitData, item }) => {
    const [formData, setFormData] = useState<A_masterData>({
        id: 0,
        name: '',
        price: 0,
    });
    useEffect(() => {
        // ページがマウントされたときにpropsのデータでフォームの初期値を設定
        setFormData((formData) => ({
            ...formData,
            id: item.id,
            name: item.name,
            price: item.price,
        }));
    }, [item]); // itemが変更されたときだけeffectを実行
    const handleSubmit = () => {
        onSubmitData(formData);
        onRequestClose();
    };
    const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            name: e.target.value,
        });
    };
    const handlePriceChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            price: parseInt(e.target.value),
        });
    };

    return (
        <Modal show={isOpen} onHide={onRequestClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={handleNameChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="you@example.com"
                        value={formData.price}
                        onChange={handlePriceChange}
                    />
                </div>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <button
                        onClick={handleSubmit}
                        className="btn btn-primary btn-block"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </div>
            <div className="col-md-6 mb-3">
                    <button
                        onClick={onRequestClose}
                        className="btn btn-secondary btn-block"
                        type="submit"
                    >
                        Cancel
                    </button>
                </div>
        </Modal.Footer>
        </Modal>
    );
}

export default Edit;