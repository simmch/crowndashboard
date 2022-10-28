import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { worldInitialState } from '../STATE'
import { saveWorld } from '../../actions/worlds'

export const NewWorld = ({auth, history, saveWorld}) => {
    const [data, setData] = useState(worldInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        TITLE,
        IMAGE_PATH,
        AVAILABLE,
    } = data;

    const onChangeHandler = (e) => {
        setShow(false)
        if (e.target.type === "number"){
            setData({
                ...data,
                [e.target.name]: e.target.valueAsNumber
            })
         
        } else if ((e.target.checked === true || e.target.checked === false) && e.target.name === "formHorizontalRadios") {
            const radio = e.currentTarget.id === 'false' ? false : true
            setData({
                ...data,
                AVAILABLE: radio
            })

        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
    }

    var submission_response = "Success!";
    var submission_alert_dom = <Alert show={show} variant="success"> {submission_response} </Alert>
    const onSubmitHandler = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setShow(false)
            setValidated(true);
        } else {
            setValidated(false)
            e.preventDefault();

            const res = await saveWorld(data)

            setData(worldInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };

    return auth.loading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-zone">
                        Create New World
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>World Name</Form.Label>
                                            <Form.Control
                                                value={TITLE}
                                                onChange={onChangeHandler}
                                                name="TITLE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Path</Form.Label>
                                            <Form.Control
                                                value={IMAGE_PATH}
                                                name="IMAGE_PATH"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <Form.Label>Is World Available?</Form.Label>
                                        
                                        <Form.Control
                                            as="select"
                                            id="inlineFormCustomSelectPref"
                                            onChange={onChangeHandler}
                                        >
                                            <option value={true} name="true">Yes</option>
                                            <option value={""} name="false">No</option>
                                        </Form.Control>
                                        
                                        </Form.Group>

                            
                                    </Form.Row>


                                    <Button type="submit">Create World</Button>
                                    <br />
                                    <br />
                                    <Link to="/updateworld"><Button variant="warning">Update World</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}
                                    

                                </Form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    cards: state.cards
})

export default connect(mapStateToProps, {saveWorld})(NewWorld)
