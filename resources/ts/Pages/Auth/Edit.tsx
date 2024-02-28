import React, { useEffect,useState } from "react";
import Modal from 'react-bootstrap/Modal';
import USER_ROLE, { UserData } from "../../const"

type EditProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmitData: (data: UserData) => void;
    item: UserData;
};

const Edit: React.FC<EditProps> = ({ isOpen, onRequestClose, onSubmitData, item }) => {
    const [formData, setFormData] = useState<UserData>({
        id: 0,
        name: '',
        email: '',
        password_raw: '',
        role: 0,
    });
    useEffect(() => {
        // ページがマウントされたときにpropsのデータでフォームの初期値を設定
        setFormData((formData) => ({
            ...formData,
            id: item.id,
            name: item.name,
            email: item.email,
            password_raw: item.password_raw,
            role: item.role,
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
    const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            email: e.target.value,
        });
    };
    const handlePasswordRawChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            password_raw: e.target.value,
        });
    };
    const handleRoleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            role: parseInt(e.target.value),
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
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleEmailChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Password_raw </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="********"
                        value={formData.password_raw}
                        onChange={handlePasswordRawChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Role</label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <label>
                        <input
                        type="radio"
                        value={USER_ROLE.admin}
                        checked={formData.role === USER_ROLE.admin}
                        onChange={handleRoleChange}
                        />
                        Admin
                    </label>
                </div>
                <div className="col-md-3 mb-3">
                    <label>
                        <input
                        type="radio"
                        value={USER_ROLE.user}
                        checked={formData.role === USER_ROLE.user}
                        onChange={handleRoleChange}
                        />
                        User
                    </label>
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