import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageUser.scss";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiService";
import _ from 'lodash';

const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUsers , dataUpdate } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() =>{
        console.log("run useeffects", dataUpdate);
        if(! _.isEmpty(dataUpdate)){
            //update state
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setImage("");
            setRole(dataUpdate.role);
            if(dataUpdate.image){
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    },[props.dataUpdate]);

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setImage("");
        setRole("USER");
        setPreviewImage("");
        props.resetUpdateData();
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setPreviewImage("");
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.warning("Invalid email");
            return;
        }

        let data = await putUpdateUser( dataUpdate.id,username, role, image);
        if (data && data.EC === 0) {
            toast.success("Add Success");
            handleClose();
            fetchListUsers(); // Gọi hàm fetchListUsers để cập nhật danh sách người dùng
        } else {
            toast.error("Error: " + data.EM);
        }
    };

    console.log('check dataupdates: ' , props.dataUpdate)
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Update new User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                disabled = {true}
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <AiOutlinePlusCircle /> Upload File Image
                            </label>
                            <input type="file" hidden id="labelUpload" onChange={handleUploadImage} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage} alt="Preview" /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCreateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateUser;