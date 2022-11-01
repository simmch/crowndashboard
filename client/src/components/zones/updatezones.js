import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { zoneInitialState } from '../STATE'
import { updateZone, deleteZone } from '../../actions/zones'

export const UpdateZone = ({auth, history, updateZone, deleteZone}) => {
    const [worlds, setWorld] = useState({
        world: [],
        loading: true
    });

    const [zoneData, setZoneData] = useState({
        loading: true
    })

    const [ranks, setRank] = useState({
        rank: [],
        loading: true
    });

    const [data, setData] = useState(zoneInitialState);
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        ZONE_CODE,
        TITLE,
        WORLD,
        REQ_RANK,
        AVAILABLE,
    } = data;
    
    useEffect(() => {
        if(!auth.loading){
            axios.get('/isekai/worlds')
                .then((res) => {
                    setWorld({world: res.data, loading: false})
                })

            axios.get('/isekai/zones')
                .then((res) => {
                    setZoneData({data: res.data, loading: false})
                })
        }
      }, [auth])

    const onChangeHandler = (e) => {
        setShow(false)
        if (e.target.type === "number"){
            setData({
                ...data,
                [e.target.name]: e.target.valueAsNumber
            })
        } else if ((e.target.checked === true || e.target.checked === false) && e.target.name == "formHorizontalRadios") {
            const radio = e.currentTarget.id === 'false' ? false : true
            setData({
                ...data,
                HAS_COLLECTION: radio
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
    }

    const availableHandler = (e) => {
        setData({
            ...data,
            AVAILABLE: Boolean(e.target.value)
        })
    }


    if(!worlds.loading) {
        var worldSelector = worlds.world.map(world => {
            return {
                value: world.TITLE, label: `${world.TITLE}`
            }
        })
    
        var worldHandler = (e) => {
            let value = e[0]
            worlds.world.map(world => {
                if (e.value === world.TITLE) {
                    setData({
                        ...data,
                        WORLD: world.TITLE,
                    })
                    axios.get(`/isekai/ranks/world/${world.TITLE}`)
                        .then((res) => {
                            setRank({rank: res.data, loading: false})
                })
                }
            })
        }
    }

    if(!ranks.loading) {
        var rankSelector = ranks.rank.map(rank => {
            return {
                value: rank.RANK_CODE, label: `${rank.TITLE}`
            }
        })

        var rankHandler = (e) => {
            let value = e[0]
            ranks.map(rank => {
                if (e.value === rank) {
                    setData({
                        ...data,
                        RANK: rank,
                    })
                }
            })
    
        }

    }

    if(!zoneData.loading) {
        var zoneSelector = zoneData.data.map(zone => {
            return {
                value: zone.TITLE, label: `${zone.TITLE}`
            }
        })
    
        var zoneHandler = (e) => {
            let value = e[0]
            zoneData.data.map(zone => {
                if (e.value === zone.TITLE) {

                    setData({
                        ...data,
                        ZONE_CODE: zone.ZONE_CODE,
                        TITLE: zone.TITLE,
                        WORLD: zone.WORLD,
                        AVAILABLE: zone.AVAILABLE,
                    })
                }
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

            var zone_update_data = data;

            const res = await updateZone(zone_update_data)

            setData(zoneInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const res = await deleteZone(data);
        setModalShow(false);
    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };
    return auth.loading || worlds.loading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-zone">
                        Update Zone
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label><h3>Select Zone</h3></Form.Label>
                                            <Select
                                                onChange={zoneHandler}
                                                options={
                                                    zoneSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Select World</Form.Label>
                                            <Select
                                                onChange={worldHandler}
                                                options={
                                                    worldSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Select Required Rank</Form.Label>
                                            <Select
                                                onChange={rankHandler}
                                                options={
                                                    rankSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label> Available </Form.Label>
                                            
                                            <Form.Control
                                                as="select"
                                                id="inlineFormCustomSelectPref"
                                                onChange={availableHandler}
                                            >
                                                <option value={true} name="true">Yes</option>
                                                <option value={""} name="false">No</option>
                                            </Form.Control>
                                            
                                        </Form.Group>
                                    </Form.Row>


                                    <Button type="submit">Update Zone</Button>
                                    <br/>
                                    <br />
                                    <Link to="/newzone"><Button as={Col} md="2" variant="outline-warning">New Zone</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}

                                    <Button onClick={handleShow} as={Col} md="2" variant="danger">Delete</Button>

                                    <Modal show={modalShow} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Zone>Are you sure you want delete this Zone?</Modal.Zone>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={onDeleteHandler}>
                                            Delete Zone
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    
                                    

                                </Form>

                            </div>

                            {/* <Alerts /> */}
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

export default connect(mapStateToProps, {updateZone, deleteZone})(UpdateZone)
