import React, { useEffect,useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { B_masterData } from "../../const"

type EditProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmitData: (data: B_masterData) => void;
    item: B_masterData;
};

const Edit: React.FC<EditProps> = ({ isOpen, onRequestClose, onSubmitData, item }) => {
    const [formData, setFormData] = useState<B_masterData>({
        id: 0,
        name: '',
        tel: '',
    });
    useEffect(() => {
        // ページがマウントされたときにpropsのデータでフォームの初期値を設定
        setFormData((formData) => ({
            ...formData,
            id: item.id,
            name: item.name,
            tel: item.tel,
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
    const handleTelChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            tel: e.target.value,
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
                    <label>Tel</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="you@example.com"
                        value={formData.tel}
                        onChange={handleTelChange}
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