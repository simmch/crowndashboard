import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { scenarioInitialState } from '../STATE';
import { updateScenario, saveScenario, deleteScenario } from '../../actions/scenarios';
import scenarios from '../../reducers/scenarios';

export const UpdateScenario = ({auth, history, updateScenario, deleteScenario}) => {
    const [worlds, setWorld] = useState({
        world: [],
        loading: true
    });

    const [cards, setCard] = useState({
        card: [],
        loading: true
    });

    const [ranks, setRank] = useState({
        rank: [],
        loading: true
    });

    const [scenarioData, setScenario] = useState({
        scenarios: [],
        loading: true
    })

    const [zones, setZone] = useState({
        zone: [],
        loading: true
    })
    const [data, setData] = useState(scenarioInitialState);
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        SCENARIO_CODE,
        TITLE,
        IMAGE,
        REQUIRED_LEVEL,
        REQUIRED_RANK,
        REWARDED_RANK,
        ENEMY_LEVEL,
        ENEMIES,
        DROPS,
        ZONE,
        WORLD,
        AVAILABLE
    } = data;

    useEffect(() => {
        if(!auth.loading){
            axios.get('/isekai/worlds')
                .then((res) => {
                    setWorld({world: res.data, loading: false})
                })
            axios.get('/isekai/cards')
                .then((res) => {
                    setCard({card: res.data, loading: false})
                })
            axios.get('/isekai/ranks')
                .then((res) => {
                    setRank({rank: res.data, loading: false})
                })
            axios.get('/isekai/scenarios')
                .then((res) => {
                    setScenario({scenarios: res.data, loading: false})
                })
            // axios.get(`/isekai/zones/world`)
            //         .then((res) => {
            //             setZone({zone: res.data, loading: false})
            //     })
        }
    }, [auth])

    const onChangeHandler = (e) => {
        setShow(false)
        if (e.target.type === "number"){
            setData({
                ...data,
                [e.target.name]: e.target.valueAsNumber
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
    }

    if(!scenarioData.loading) {
        var scenarioSelector = scenarioData.scenarios.map(scenario => {
            return {
                value: scenario.TITLE, label: `${scenario.TITLE}`
            }
        })

        var scenarioHandler = (e) => {
            let value = e[0]
            scenarioData.scenarios.map(scenario => {
                if (e.value === scenario.TITLE) {
                    setData({
                        ...data,
                        SCENARIO_CODE: scenario.SCENARIO_CODE,
                        TITLE: scenario.TITLE,
                        ENEMY_LEVEL: scenario.ENEMY_LEVEL,
                        IMAGE: scenario.IMAGE,
                        REQUIRED_LEVEL: scenario.REQUIRED_LEVEL,
                        REWARDED_RANK: scenario.REWARDED_RANK,
                        ENEMIES: scenario.ENEMIES,
                        DROPS: scenario.DROPS,
                        ZONE: scenario.ZONE,
                        WORLD: scenario.WORLD,
                        AVAILABLE: scenario.AVAILABLE
                    })
                }
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

        
    if(!ranks.loading) {
        var rankSelector = ranks.rank.map(rank => {
            return {
                value: rank.RANK_CODE, label: `${rank.TITLE}`
            }
        })

        var rewardRankHandler = (e) => {
            let value = e[0]
            ranks.rank.map(rank => {
                if (e.value === rank) {
                    setData({
                        ...data,
                        REWARDED_RANK: rank,
                    })
                }
            })
    
        }
    
        var requiredRankHandler = (e) => {
            let value = e[0]
            ranks.map(rank => {
                if (e.value === rank) {
                    setData({
                        ...data,
                        REQUIRED_RANK: rank,
                    })
                }
            })
        }

    }

    if(!zones.loading) {
        var zoneSelector = zones.zone.map(zone => {
            return {
                value: zone.ZONE_CODE, label: `${zone.TITLE}`
            }
        })

        var zoneHandler = (e) => {
            let value = e[0]
            zones.zone.map(zone => {
                if (e.value === zone) {
                    setData({
                        ...data,
                        ZONE: zone,
                    })
                }
            })
    
        }

    }

    if(!cards.loading) {
        var cardSelector = cards.card.map(card => {
            return {
                value: card.NAME, label: `${card.NAME}`
            }
        })

        var enemyHandler = (e) => {
            if(e != null){
                let value = e
                const enemyList = [];
                for(const e of value){
                    if(!data.ENEMIES.includes(e)){
                        enemyList.push(e.value)
                    }
                }
                if(enemyList){
                    setData({
                        ...data,
                        ENEMIES: enemyList,
                    })
                }
                
            }
        }

        var dropHandler = (e) => {
            if(e != null){
                let value = e
                const dropList = [];
                for(const e of value){
                    if(!data.DROPS.includes(e)){
                        dropList.push(e.value)
                    }
                }
                if(dropList){
                    setData({
                        ...data,
                        DROPS: dropList,
                    })
                }
                
            }
        }

    }
    const availableHandler = (e) => {
        setData({
            ...data,
            AVAILABLE: Boolean(e.target.value)
        })
    }


    console.log(data)
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
            console.log(data)
            const res = await updateScenario(data)

            setData(scenarioInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const res = await deleteScenario(data);
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
                    <h3 className="page-title">
                        Update Scenario
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Scenario Title</Form.Label>
                                            <Select
                                                onChange={scenarioHandler}
                                                options={
                                                    scenarioSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Scenario World - {WORLD}</Form.Label>
                                            <Select
                                                onChange={worldHandler}
                                                options={
                                                    worldSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Required Level</Form.Label>
                                            <Form.Control
                                                value={REQUIRED_LEVEL}
                                                name="REQUIRED_LEVEL"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>                                        


                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Enemy Level</Form.Label>
                                            <Form.Control
                                                value={ENEMY_LEVEL}
                                                name="ENEMY_LEVEL"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Required Level To Play</Form.Label>
                                            <Form.Control
                                                value={REQUIRED_LEVEL}
                                                name="REQUIRED_LEVEL"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>                                          
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Scenario Image URL</Form.Label>
                                            <Form.Control
                                                value={IMAGE}
                                                onChange={onChangeHandler}
                                                name="IMAGE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Scenario Image / gif URL</Form.Label>
                                            <Form.Control
                                                value={IMAGE}
                                                onChange={onChangeHandler}
                                                name="IMAGE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Scenario Enemies</Form.Label>
                                            <Select
                                                onChange={enemyHandler}
                                                isMulti
                                                options={cardSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>List of Potential Card Drops</Form.Label>
                                            <Select
                                                onChange={dropHandler}
                                                isMulti
                                                options={cardSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Required Rank To Play</Form.Label>
                                            <Select
                                                onChange={requiredRankHandler}
                                                options={
                                                    rankSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Rewarded Rank</Form.Label>
                                            <Select
                                                onChange={rewardRankHandler}
                                                options={rankSelector}
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

 
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Zone</Form.Label>
                                            <Select
                                                onChange={zoneHandler}
                                                options={
                                                    zoneSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
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


                                    <Button type="submit">Update Scenario</Button>
                                    <br />
                                    <br />
                                    <Link to="/newscenario"><Button variant="outline-warning">New Scenario</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}

                                    <Button onClick={handleShow} as={Col} md="2" variant="danger">Delete</Button>

                                    <Modal show={modalShow} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want delete this Scenario?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={onDeleteHandler}>
                                            Delete Scenario
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    
                                    

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

export default connect(mapStateToProps, {saveScenario, updateScenario, deleteScenario})(UpdateScenario)
