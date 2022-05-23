import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { universeInitialState } from '../STATE'
import { saveScenario } from '../../actions/scenarios'

export const NewScenario = ({auth, history, saveScenario}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });
    const [cards, setCard] = useState({
        card: [],
        loading: true
    });

    const [arms, setArm] = useState({
        arm: [],
        loading: true
    });


    const [data, setData] = useState(scenarioInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        TITLE,
        ENEMY_LEVEL,
        ENEMIES,
        EASY_DROPS,
        NORMAL_DROPS,
        HARD_DROPS,
        UNIVERSE,
    } = data;

    useEffect(() => {
        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverse({universe: res.data, loading: false})
                })
            axios.get('/crown/cards')
                .then((res) => {
                    setCard({card: res.data, loading: false})
                })
            axios.get('/crown/arms')
                .then((res) => {
                    setArm({arm: res.data, loading: false})
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
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
    }

    if(!universes.loading) {
        var universeSelector = universes.universe.map(universe => {
            return {
                value: universe.TITLE, label: `${universe.TITLE}`
            }
        })
    
        var universeHandler = (e) => {
            let value = e[0]
            universes.universe.map(universe => {
                if (e.value === universe.TITLE) {
                    setData({
                        ...data,
                        PREREQUISITE: universe.TITLE,
                    })
                }
            })
        }
    }
    
    if(!arms.loading) {
        var armSelector = arms.arm.map(arm => {
            return {
                value: arm.ARM, label: `${arm.ARM}`
            }
        })
    
        var easyArmHandler = (e) => {
            if(e != null){
                let value = e
                const easyArmList = [];
                for(const a of value){
                    if(!data.EASY_DROPS.includes(a)){
                        easyArmList.push(a.value)
                    }
                }
                if(easyArmList){
                    setData({
                        ...data,
                        EASY_DROPS: easyArmList,
                    })
                }
                
            }
        }

        var normalArmHandler = (e) => {
            if(e != null){
                let value = e
                const normalArmList = [];
                for(const a of value){
                    if(!data.NORMAL_DROPS.includes(a)){
                        normalArmList.push(a.value)
                    }
                }
                if(normalArmList){
                    setData({
                        ...data,
                        NORMAL_DROPS: normalArmList,
                    })
                }
                
            }
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

        var bannedCardsHandler = (e) => {
            if(e != null){
                let value = e
                const cardList = [];
                for(const c of value){
                    if(!data.BANNED_CARDS.includes(c)){
                        cardList.push(c.value)
                    }
                }
                if(cardList){
                    setData({
                        ...data,
                        BANNED_CARDS: cardList,
                    })
                }
                
            }
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

            const res = await saveScenario(data)

            setData(universeInitialState)
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
                    <h3 className="page-title">
                        New Crown Unlimited Arm
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Universe Name</Form.Label>
                                            <Form.Control
                                                value={TITLE}
                                                onChange={onChangeHandler}
                                                name="TITLE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Prerequisite - {PREREQUISITE}</Form.Label>
                                            <Select
                                                onChange={universeHandler}
                                                options={
                                                    universeSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>

                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Path</Form.Label>
                                            <Form.Control
                                                value={PATH}
                                                name="PATH"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Tier</Form.Label>
                                            <Form.Control
                                                value={TIER}
                                                name="TIER"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        
                                    </Form.Row>
                                    <Button type="submit">Create Universe</Button>
                                    <br />
                                    <br />
                                    <Link to="/updateuniverse"><Button variant="warning">Update Universe</Button></Link> 
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

export default connect(mapStateToProps, {saveScenario})(NewScenario)
