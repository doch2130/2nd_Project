import React from 'react'
import {Button, Modal} from 'react-bootstrap';
// import {Button, Modal} from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

export default function SwitchAccountModal(props) {
  const isInvertColor = useSelector((state) => state.invertColor.invertColor);
  const defaultColor = {backgroundColor: 'white', color: 'black'};
  const invertColor = {backgroundColor: 'black', color: 'white'};

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={isInvertColor ? defaultColor : invertColor}>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={isInvertColor ? defaultColor : invertColor}>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer style={isInvertColor ? defaultColor : invertColor}>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
