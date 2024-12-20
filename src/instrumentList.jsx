import React, { useState, useEffect } from "react";
import Spinner from "./Components/Spinner/spinner.jsx";
import axios from "axios";
import {
  CloseButton,
  Button,
  InputGroup,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import Scanner from "./Scanner.jsx";
import ReactModal from "react-modal";
import AddLoaner from "./Components/addLoaner/AddLoaner.jsx";
import Alert from "react-bootstrap/Alert";
import DropDown from "./selectInstrumentType";
import DropDownLocations from "./selectLocation";
import { LoginView } from "./Components/loginView/loginView";
import Navigate from "./Components/navBar/navbar.js";
import { PencilSquare } from "react-bootstrap-icons";
import QrCodePrintScreen from "./Components/qrCodePrintScreen/qrCodePrintScreen.jsx";
function InstrumentList() {
  const [instruments, setInstruments] = useState([]);
  const [user, setUser] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState({});
  const [query, setQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [updater, setUpdater] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    serial: "",
    barcode: "",
    location: "",
    dateLastServiced: "",
  });
  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
    show: false,
  });
  const [updateMessage, setUpdateMessage] = useState({
    message: "",
    show: false,
  });

useEffect(() => {
  const getLoaners = async () => {
    try {
      const res = await axios.get(
        `https://horntrax-api.herokuapp.com/loaners/useridfind/${user._id}`
      );
      const sortedInstruments = res.data.sort((a, b) =>
        a.type < b.type ? -1 : a.type > b.type ? 1 : 0
      );
      setInstruments(sortedInstruments);
    } catch (error) {
      console.error("Error fetching loaners:", error);
    }
  };

  getLoaners();
}, [updater, user._id]);
  const handleDeleteConfirmationClose = () => {
    setShowDeleteConfirmation(false);
  };

  const onRequestClose = () => {
    setShowModal(false);
    clear();
  };

  const forceUpdate = () => {
    setUpdater(updater + 1);
  };

  //Drop Down Menus Call these function to set state of SelecetedType and SelectedLocation
  const updateSelectedType = (e) => {
    setSelectedType(e);
  };

  const updateSelectedLocation = (e) => {
    setSelectedLocation(e);
  };

  const clear = (e) => {
    setQuery("");
  };

  const onLoggedOut = () => {
    setShowModal(false);
    setUser("");
  };



  //creates a list of  instruments prefiltered by selectedType state
  let preFilteredInstruments = [];
  selectedType.length > 0 || selectedLocation.length > 0
    ? (preFilteredInstruments = instruments.filter((instrument) => {
        return (
          instrument.type.toLowerCase().includes(selectedType.toLowerCase()) &&
          instrument.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase())
        );
      }))
    : (preFilteredInstruments = instruments);

  let filteredInstruments = [];
  query.length > 0
    ? (filteredInstruments = preFilteredInstruments.filter((instrument) => {
        return (
          instrument.type.toLowerCase().includes(query.toLowerCase()) ||
          instrument.brand.toLowerCase().includes(query.toLowerCase()) ||
          instrument.serial.toLowerCase().includes(query.toLowerCase()) ||
          instrument.location.toLowerCase().includes(query.toLowerCase()) ||
          instrument.barcode.toString().includes(query)
        );
      }))
    : (filteredInstruments = preFilteredInstruments);

  async function deleteLoaner(key) {
    try {
      await axios
        .get(`https://horntrax-api.herokuapp.com/loaners/delete/${key}`)

        .then((res) => setDeleteMessage({ message: res.data, show: true }))
        .then(() =>
          setTimeout(() => {
            setDeleteMessage({ message: "", show: false });
            setShowModal(false);
            forceUpdate();
          }, 2000)
        );
    } catch (error) {
      console.error(error);
    }
  }

  const handleConfirmDelete = (x) => {
    if (x) {
      handleDeleteConfirmationClose();
      deleteLoaner(x);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateLoanerInfo = async (e, ID) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `https://horntrax-api.herokuapp.com/loaners/update/${ID}`,
          formData
        )

        .then((res) =>
          setUpdateMessage({
            message: "instrument updated successfully",
            show: true,
          })
        )
        .then(() =>
          setTimeout(() => {
            setUpdateMessage({ message: "", show: false });
            setShowModal(false);
            forceUpdate();
          }, 2000)
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user.length === 0 ? (
        <LoginView setUser={setUser} forceUpdate={forceUpdate} />
      ) : (
        <div className="loanersViewContainer">
          <Navigate onLoggedOut={onLoggedOut} user={user} />

          <div className="top-container">
            <AddLoaner forceUpdate={forceUpdate} user={user} />
            <div className="searchBar">
              <div className="searchBarTotal ">
                <div className="searchBarAndButton ">
                  <input
                    className="inputSearchBox"
                    onChange={(event) => setQuery(event.target.value)}
                    value={query}
                    placeholder="search anything..."
                  ></input>
                  <div className="clearButton">
                    <Button onClick={() => clear()}>X</Button>
                  </div>
                </div>
                <div className="dropDownContainer">
                  <DropDownLocations
                    data={instruments}
                    action={updateSelectedLocation}
                    selector={{ value: "location" }}
                  />
                  <DropDown
                    className="dropDownContainer"
                    data={instruments}
                    action={updateSelectedType}
                    selector={{ value: "type" }}
                    styles={{ backgroundColorStyle: "neutral150" }}
                  />
                </div>
                <p className="instrumentCounter">
                  Total Instruments: {filteredInstruments.length}
                </p>
              </div>
              <Scanner setQuery={setQuery}></Scanner>
            </div>
          </div>
         { instruments.length === 0 ? (<Spinner />) : (
            <Table variant="light" striped bordered hover className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Serial</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstruments.map((item) => (
                  <tr key={item.barcode}>
                    <td className="table-style">{item.type}</td>
                    <td className="table-style">{item.location}</td>
                    <td className="table-style">{item.serial}</td>

                    <td>
                      <Button
                        className="btn-instrument btn-primary select"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedInstrument(item);
                          setFormData({
                            type: item.type,
                            brand: item.brand,
                            serial: item.serial,
                            barcode: item.barcode,
                            location: item.location,
                            dateLastServiced: item.dateLastServiced.slice(
                              0,
                              10
                            ),
                          });
                        }}
                      >
                        <PencilSquare width="20" height="20" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> )}
        
          <QrCodePrintScreen filteredInstruments={filteredInstruments} />
        </div>
      )}
   

      <div className="reactModal">
        <ReactModal
          isOpen={showModal}
          ariaHideApp={false}
          contentLabel="directory modal"
          shouldReturnFocusAfterClose={true}
          onRequestClose={() => onRequestClose()}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              backgroundColor: "white",
              zIndex: 2,
            },
            content: {
              backgroundColor: "#1de2dc",
            },
          }}
        >
          <CloseButton
            className="modalCloseButton"
            onClick={() => onRequestClose()}
            style={{
              position: "relative",
              height: "45px",
              width: "45px",
              color: "black",
              marginLeft: "92%",
              top: "10px",
              fontWeight: "bolder",
            }}
          ></CloseButton>
          <div>
            <div className="useInfo">
              <InputGroup className="modal-text">
                <Form.Label>Instrument Type: </Form.Label>
                <Form.Control
                  style={{ width: "100%", borderRadius: "5px" }}
                  type="text"
                  value={formData.type}
                  onChange={handleChange}
                  name="type"
                  placeholder={formData.type}
                  aria-label="Update Type of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>
                <br></br>
                <Form.Label>Brand: </Form.Label>
                <Form.Control
                  style={{ width: "100%", borderRadius: "5px" }}
                  type="text"
                  value={formData.brand}
                  onChange={handleChange}
                  name="brand"
                  placeholder={formData.brand}
                  aria-label="Update Brand of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>
                <br></br>
                <Form.Label>Serial#:</Form.Label>
                <Form.Control
                  style={{ width: "100%", borderRadius: "5px" }}
                  type="text"
                  value={formData.serial}
                  name="serial"
                  placeholder={formData.serial}
                  onChange={handleChange}
                  aria-label="Update serial of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>{" "}
                <Form.Label>Barcode: </Form.Label>
                <Form.Control
                  style={{ width: "100%", borderRadius: "5px" }}
                  type="number"
                  value={formData.barcode}
                  name="barcode"
                  placeholder={formData.barcode}
                  onChange={handleChange}
                  aria-label="Update barcode of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>{" "}
                <Form.Label>Location: </Form.Label>
                <Form.Control
                  style={{ width: "100%", borderRadius: "5px" }}
                  type="text"
                  value={formData.location}
                  name="location"
                  placeholder={formData.location}
                  onChange={handleChange}
                  aria-label="Update location of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>
                <Form.Label>Last serviced:</Form.Label>
                <Form.Control
                  style={{ width: "100%", borderRadius: "5px" }}
                  type="date"
                  name="dateLastServiced"
                  placeholder={formData.dateLastServiced}
                  value={formData.dateLastServiced}
                  onChange={handleChange}
                  aria-label="Update date of last service"
                  aria-describedby="basic-addon2"
                ></Form.Control>
              </InputGroup>

              <div className="updateFormButtonsContainer">
                <Button
                  className="btn-loaner-update"
                  onClick={(e) =>
                    handleUpdateLoanerInfo(e, selectedInstrument._id)
                  }
                >
                  Update Information
                </Button>
                <Button
                  className="deleteButton"
                  value={selectedInstrument._id}
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete Instrument
                </Button>
              </div>
              <div className="alerts">
                {updateMessage.show ? (
                  <Alert
                    variant="primary"
                    onClose={() =>
                      setUpdateMessage({ message: "", show: false })
                    }
                  >
                    <Alert.Heading>{updateMessage.message}</Alert.Heading>
                  </Alert>
                ) : null}
                {deleteMessage.show ? (
                  <Alert
                    variant="danger"
                    onClose={() =>
                      setDeleteMessage({ message: "", show: false })
                    }
                  >
                    <Alert.Heading>{deleteMessage.message}</Alert.Heading>
                  </Alert>
                ) : null}
              </div>
            </div>
          </div>
        </ReactModal>
        <Modal
          show={showDeleteConfirmation}
          onHide={handleDeleteConfirmationClose}
          value={selectedInstrument._id}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This will permanently delete the instrument and you will not be able
            to undo this change.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteConfirmationClose}>
              No
            </Button>
            <Button
              variant="danger"
              value={selectedInstrument._id}
              onClick={() => handleConfirmDelete(selectedInstrument._id)}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default InstrumentList;
