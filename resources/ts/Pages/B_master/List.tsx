import React, { useEffect, useState } from "react";
import crudApi from "./CrudApi";
import { B_masterData } from "../../const"
import Add from "./Add";
import Edit from "./Edit";

interface Data {
    id: number;
    name: string;
    tel: string;
}

const List: React.FC = () => {
    const [listData, setListData] = useState<Data[]>([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (page = 1) => {
        if (pagination.currentPage > pagination.lastPage) {
            setPagination({
                currentPage: 1,
                lastPage: pagination.lastPage,
            });
            page = 1;
        }
        try {
            const res = await crudApi.list(page);
            setListData(res.data);
            setPagination({
                currentPage: res.current_page,
                lastPage: res.last_page,
            });
        } catch (error) {
            console.log("Error fetching data:", error);
        }
        // console.log(page);
        // console.log(pagination);
    }

    const onClickDelete = async (i: number, id: number) => {
        const yes = window.confirm("Are you sure to delete this item?");
        if (yes) {
            try {
                const res = await crudApi.delete(id);
                if (res.status === 200) {
                    alert("Deleted.");
                    fetchData();
                } else {
                    alert("Not Deleted");
                }
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    const [showEditModal, setShowEditModal] = useState(false);

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        fetchData();
        setShowEditModal(false);
    };

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        fetchData();
        setShowModal(false);
    };

    const handleSubmitData = async (data: B_masterData) => {
        try {
            let statusCode :number;
            if (data.id === 0) {
                const res = await crudApi.create(data);
                statusCode = res.status;
            } else {
                const res = await crudApi.update(data);
                statusCode = res.status;
            }
            if (statusCode === 200 || statusCode === 201) {
                alert("Success.");
            } else {
                alert("Not success");
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <section>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Tel</th>
                        <th scope="col">Operate</th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((item: Data, i: number) => (
                        <tr key={i}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.tel}</td>
                            <td>
                                {/* <Link
                                    to={"/crud/edit/" + item.id}
                                    className="btn btn-light"
                                >
                                    Edit
                                </Link> */}
                                <button type="button" className="btn btn-success" onClick={handleOpenEditModal}>
                                    Edit
                                </button>
                                <Edit
                                    isOpen={showEditModal}
                                    onRequestClose={handleCloseEditModal}
                                    onSubmitData={handleSubmitData}
                                    item={item}
                                />
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onClickDelete(i, item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={() => fetchData(1)}>&lt;</a></li>
                    <li className="page-item active"><a className="page-link" onClick={() => fetchData(pagination.currentPage)}>{pagination.currentPage}</a></li>
                    <li className="page-item"><a className="page-link" onClick={() => fetchData(pagination.currentPage+1)}>{pagination.currentPage+1}</a></li>
                    <li className="page-item"><a className="page-link" onClick={() => fetchData(pagination.currentPage+2)}>{pagination.currentPage+2}</a></li>
                    <li className="page-item"><a className="page-link" onClick={() => fetchData(pagination.currentPage+3)}>&gt;</a></li>
                </ul>
            </nav>
            <button type="button" className="btn btn-warning" onClick={handleOpenModal}>
            Add
            </button>
            <Add
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                onSubmitData={handleSubmitData}
            />
        </section>
    );
}

export default List;
