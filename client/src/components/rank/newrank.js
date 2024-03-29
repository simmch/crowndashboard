import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { rankInitialState, rank_buffs, elements, rankTypes, questTypes } from '../STATE'
import { saveRank } from '../../actions/ranks'
var random = require('random-string-generator');

export const NewRank = ({auth, history, saveRank}) => {
    const [worlds, setWorld] = useState({
        world: [],
        loading: true
    });

    const [scenarios, setScenario] = useState({
        scenario: [],
        loading: true
    })
    const [data, setData] = useState(rankInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [ability, setAbility] = useState({
        POWER: 20,
        TYPE: "",
        ELEMENT: ""
    });
    const [quest, setQuest] = useState({
        TYPE: "",
        QUANTITY: 0,
        SCENARIO: "",
        ELEMENT: ""
    });

    // Rank Ability Types
    // Protection
    // Latent Power
    // Amplifier
    // Talisman? 

    // Build ability
    // var pass_power = ability.POWER
    // var pass_type = ability.TYPE
    // var pass_element = ability.ELEMENT
    // var abililty_Object = {
    //     "POWER": pass_power,
    //     "TYPE": pass_type,
    //     "ELEMENT": pass_element
    // }

    const {
        RANK_CODE,
        TITLE,
        WORLD,
        BUFF,
        REQUIRED_MORALITY,
        LEVEL_UNLOCKED,
        QUEST_UNLOCKED
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
                    axios.get(`/isekai/scenarios/world/${world.TITLE}`)
                    .then((res) => {
                        setScenario({scenario: res.data, loading: false})
                    })
                }
            })
        }
    }

    if(!scenarios.loading && scenarios.scenario.length > 0){
        var questScenarioSelector = scenarios.map(s => {
            return {
                value: s.SCENARIO_CODE, label: `${s.TITLE}`
            }
        })

        var questScenarioHandler = (e) => {
            let value = e[0]
            scenarios.map(s => {
                if (e.value === s) {
                    setQuest({
                        ...quest,
                        SCENARIO: s,
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
                setAbility({
                    ...ability,
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

    var questTypeSelector = questTypes.map(q => {
        return {
            value: q, label: `${q}`
        }
    })

    const questHandler = (e) => {
        if (e.target.type === "number"){
            setQuest({
                ...quest,
                [e.target.name]: e.target.valueAsNumber
            })
        } else {
            setQuest({
                ...quest,
                [e.target.name]: e.target.value
            })
        }
    }


    var questElementHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setQuest({
                    ...quest,
                    ELEMENT: element,
                })
            }
        })
    }


    var questTypeHandler = (e) => {
        let value = e[0]
        questTypes.map(qt => {
            if (e.value === qt) {
                setQuest({
                    ...quest,
                    TYPE: qt,
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
            // console.log(quest)
            // setData({
            //     ...data,
            //     QUEST_UNLOCKED: [quest],
            // })

            var rank_update_data = data;
            rank_update_data.BUFF = abililty_Object
            rank_update_data.RANK_CODE = random(6, 'numeric')
            rank_update_data.QUEST_UNLOCKED = quest
            console.log(rank_update_data)
            console.log(data)
            const res = await saveRank(rank_update_data)

            setData(rankInitialState)
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
                    <h3 className="page-title">
                        New Rank
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
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
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Rank Title</Form.Label>
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

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Type of buff</Form.Label>
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
                                            <Form.Label>Buff Power</Form.Label>
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
                                        <Form.Label>If elemental buff, which element buffed?</Form.Label>
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

                                    </Form.Row>

                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Quest Type</Form.Label>
                                            <Select
                                                onChange={questTypeHandler}
                                                options={
                                                    questTypeSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>If element usage quest, which element?</Form.Label>
                                            <Select
                                                onChange={questElementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Quest Quantity?</Form.Label>
                                            <Form.Control
                                                value={quest.QUANTITY}
                                                name="QUANTITY"
                                                onChange={questHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                    </Form.Row>

                                    <br></br> 
                                    <ul>
                                    <li>ATTACK = Increases Attack by %</li>
                                    <li>DEFENSE = Increased Defense by %</li>
                                    <li>STAMINA = Increases Stamina & Max Stamina by Number</li>
                                    <li>HEAL = Heals for % of missing health</li>
                                    <li>HEALTH = Increase Health and Max Health</li>
                                    <li>LIFE STEAL = Steals % of opponent missing health</li>
                                    <li>ATTACK STEAL = Steals % of opponent attack </li>
                                    <li>DEFENSE STEAL = Steals % of opponent defense</li>
                                    <li>RAGE = Lowers defense by % and increase attack by that same amount once</li>
                                    <li>BRACE = Lowers attack by % and increases defense by that same amount once</li>
                                    <li>BERSERK = Lowers health by % and increase attack by that amount once</li>
                                    <li>CRYSTALIZE = Lowers defense by % and increase defense by that amount once</li>
                                    <li>SOULCHAIN = Attack & Defense sync together to 500 / 500</li>
                                    <li>FEAR = Decrease opponetn attack and defense by % once</li>
                                    <li>CREATION = Increases max health by % once</li>
                                    <li>DESTRUCTION = Lowers opponent max health by % once</li>
                                    <li>SPELL SHIELD = Adds Absorb affinity for specific element</li>
                                    <li>SHIELD = Blocks damage</li>
                                    <li>BARRIER = Blocks attacks until you attack</li>
                                    <li>PARRY = Opponent takes 40% of the damage, you take 60%</li>
                                    <li>ELEMENTAL BOOST = Increases Specific Elemental Damage</li>
                                    </ul>
                                    

                                    

                                    <Button type="submit">Create Rank</Button>
                                    <br />
                                    <br />
                                    <Link to="/updateranks"><Button variant="warning">Update Rank</Button></Link> 
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
    cards: state.cards
})

export default connect(mapStateToProps, {saveRank})(NewRank)
