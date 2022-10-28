import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { rankInitialState, rank_buffs, elements } from '../STATE'
import { updateRank, deleteRank } from '../../actions/ranks'

export const UpdateRank = ({auth, history, updateRank, deleteRank}) => {
    const [worlds, setUniverse] = useState({
        world: [],
        loading: true
    });

    const [rankData, setRankData] = useState({
        loading: true
    })

    const [data, setData] = useState(rankInitialState);
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [ability, setAbility] = useState({
        POWER: 20,
        TYPE: "",
        ELEMENT: ""
    });
    // Build ability
    // var pass_power = ability.POWER
    // var pass_type = ability.TYPE
    // var abililty_Object = {}
    // abililty_Object[pass_type] = pass_power

    const {
        RANK_CODE,
        TITLE,
        WORLD,
        BUFF,
        REQUIRED_MORALITY,
    } = data;
    
    useEffect(() => {
        if(!auth.loading){
            axios.get('/isekai/worlds')
                .then((res) => {
                    setUniverse({world: res.data, loading: false})
                })

            axios.get('/isekai/ranks')
                .then((res) => {
                    setRankData({data: res.data, loading: false})
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
                AVAILABLE: radio
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
    }

    const buffHandler = (e) => {
        if (e.target.type === "number"){
            setAbility({
                ...ability,
                [e.target.name]: e.target.valueAsNumber
            })
        } 
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
                }
            })
        }
    }

    if(!rankData.loading) {
        var rankSelector = rankData.data.map(rank => {
            return {
                value: rank.TITLE, label: `${rank.TITLE}`
            }
        })
    
        var rankHandler = (e) => {
            let value = e[0]
            rankData.data.map(rank => {
                if (e.value === rank.TITLE) {
                    // Passive Breakdown
                    // var type = Object.values(rank.BUFF[0])[0]
                    // var power = Object.values(rank.BUFF[0])[0]

                    setAbility({
                        ...ability,
                        POWER: rank.BUFF.POWER,
                        TYPE: rank.BUFF.TYPE,
                        ELEMENT: rank.BUFF.ELEMENT
                    })

                    var abilities_Object = {
                        POWER: ability.POWER,
                        TYPE: ability.TYPE,
                        ELEMENT: ability.ELEMENT
                    }

                    setData({
                        ...data,
                        RANK_CODE: rank.RANK_CODE,
                        TITLE: rank.TITLE,
                        WORLD: rank.WORLD,
                        BUFF: [abilities_Object],
                        REQUIRED_MORALITY: rank.REQUIRED_MORALITY
                    })
                }
            })
        }
    }

    var buffSelector = rank_buffs.map(buff => {
        return {
            value: buff, label: `${buff}`
        }
    })

    var elementSelector = elements.map(element => {
        return {
            value: element, label: `${element}`
        }
    })

    var elementBuffHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setData({
                    ...data,
                    ELEMENT: element,
                })
            }
        })
    }


    var rankBuffHandler = (e) => {
        let value = e[0]
        rank_buffs.map(buff => {
            if (e.value === buff) {
                setAbility({
                    ...ability,
                    TYPE: buff,
                })
            }
        })

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

            var abililty_Object = {
                "POWER": ability.POWER,
                "TYPE": ability.TYPE,
                "ELEMENT": ability.ELEMENT
            }
            var rank_update_data = data;
            rank_update_data.BUFF = [abililty_Object]
            const res = await updateRank(rank_update_data)

            setData(rankInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const res = await deleteRank(data);
        setModalShow(false);
    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };

    console.log(data)
    return auth.loading || worlds.loading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        Update Rank
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label><h3>Select Rank</h3></Form.Label>
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

                                    <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={ability.POWER}
                                                name="POWER"
                                                onChange={buffHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Type - {ability.TYPE}</Form.Label>
                                            <Select
                                                onChange={rankBuffHandler}
                                                options={
                                                    buffSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element - {ELEMENT}</Form.Label>
                                            <Select
                                                onChange={elementBuffHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Required Morality</Form.Label>
                                            <Form.Control
                                                value={REQUIRED_MORALITY}
                                                name="REQUIRED_MORALITY"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                    </Form.Row>
                                    <Button type="submit">Update Rank</Button>
                                    <br/>
                                    <br />
                                    <Link to="/newrank"><Button as={Col} md="2" variant="outline-warning">New Rank</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}

                                    <Button onClick={handleShow} as={Col} md="2" variant="danger">Delete</Button>

                                    <Modal show={modalShow} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want delete this Rank?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={onDeleteHandler}>
                                            Delete Rank
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

export default connect(mapStateToProps, {updateRank, deleteRank})(UpdateRank)
