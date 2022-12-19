import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { zoneInitialState, elements } from '../STATE'
import { saveZone } from '../../actions/zones'
var random = require('random-string-generator');

export const NewZone = ({auth, history, saveZone}) => {
    const [worlds, setWorld] = useState({
        world: [],
        loading: true
    });

    const [ranks, setRank] = useState({
        rank: [],
        loading: true
    });

    const [data, setData] = useState(zoneInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        ZONE_CODE,
        TITLE,
        WORLD,
        ZONE_ELEMENTAL_BUFF,
        REQ_RANK,
        AVAILABLE,
    } = data;
    
    useEffect(() => {
        if(!auth.loading){
            axios.get('/isekai/worlds')
                .then((res) => {
                    setWorld({world: res.data, loading: false})
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
            ranks.rank.map(rank => {
                if (e.value === rank) {
                    setData({
                        ...data,
                        REQ_RANK: rank,
                    })
                }
            })
    
        }

    }
    

    var elementSelector = elements.map(element => {
        return {
            value: element, label: `${element}`
        }
    })


    var elementHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setData({
                    ...data,
                    ZONE_ELEMENTAL_BUFF: element,
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

            // console.log(zone_update_data)
            var zoneupdated = data
            zoneupdated.ZONE_CODE = random(6, 'numeric')
            const res = await saveZone(zoneupdated)

            setData(zoneInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

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
                        New Zone
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
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
                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                            <Form.Label>Elemental Buff?</Form.Label>
                                            <Select
                                                onChange={elementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Zone Name</Form.Label>
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
                                    <Button type="submit">Create Zone</Button>
                                    <br />
                                    <br />
                                    <Link to="/updatezones"><Button variant="warning">Update Zone</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}
                                    
                                    

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
    zones: state.zones
})

export default connect(mapStateToProps, {saveZone})(NewZone)
