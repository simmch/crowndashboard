import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { cardInitialState, elements, questTypes, classes, movesInitialState } from '../STATE'
import { saveCard } from '../../actions/cards'
var random = require('random-string-generator');

export const NewCard = ({auth, cards, history, saveCard}) => {
    const [worlds, setWorld] = useState({
        world: [],
        loading: true
    });

    const [desc, setDesc] = useState({
        DESC: [],
        TEXT: ""
    })

    const [ranks, setRank] = useState({
        rank: [],
        loading: true
    });

    const [zones, setZone] = useState({
        zone: [],
        loading: true
    })

    const [cardData, setCardData] = useState({
        loading: true
    });
    const [defaults, setDefaults] = useState({
        apValues: 0,
        atkDef: 0
    })
    const [data, setData] = useState(cardInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [quest, setQuest] = useState({
        TYPE: "",
        QUANTITY: 20,
        ELEMENT: ""
    });
    // // Build Quest
    // var pass_ability = quest.ABILITY.toString()
    // var pass_power = quest.POWER
    // var pass_type = quest.PASSIVE_TYPE
    // var pass_key = pass_ability
    // var quest_Object = {}
    // quest_Object[pass_key] = pass_power
    // quest_Object["TYPE"] = pass_type

    var potentialPowerValues = 0
    const [moves, setMoves] = useState({
        MOVE1_ABILITY: "",
        MOVE1_POWER: 0,
        MOVE1_ELEMENT: "",
        MOVE1_UP: 0,
        MOVE1_STAMINA: 0,

        MOVE2_ABILITY: "",
        MOVE2_POWER: 0,
        MOVE2_ELEMENT: "",
        MOVE2_UP: 0,
        MOVE2_STAMINA: 0,

        MOVE3_ABILITY: "",
        MOVE3_POWER: 0,
        MOVE3_ELEMENT: "",
        MOVE3_UP: 0,
        MOVE3_STAMINA: 0,

        MOVE4_ABILITY: "",
        MOVE4_POWER: 0,
        MOVE4_ELEMENT: "",
        MOVE4_UP: 0,
        MOVE4_STAMINA: 0,
    });

    const {
        CARD_CODE,
        NAME,
        CARD_IMAGE,
        VARIANT,
        CARD_VARIANT_NAME,
        MAIN_ELEMENT,
        WORLD,
        CLASS,
        RANK,
        QUEST,
        PRICE,
        MOVES,
        HEALTH,
        ATTACK,
        DEFENSE,
        SPEED,
        ACCURACY,
        EVASION,
        MORALITY,
        TIER,
        AVAILABLE,
        ZONES,
        WEAKNESS, 
        RESISTANT, 
        REPEL, 
        IMMUNE, 
        ABSORB
    } = data;
    
    useEffect(() => {
        // if (!auth.isAuthenticated) {
        //   history.push('/login')
        // }

        if(!auth.loading){
            axios.get('/isekai/worlds')
                .then((res) => {
                    setWorld({world: res.data, loading: false})
            })
            axios.get('/isekai/cards')
                .then((res) => {
                    setCardData({data: res.data, loading: false})
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
            setTierDefaults(e.target.name, e.target.valueAsNumber, data.TIER)
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
    }

    function setTierDefaults(type, value, tier) {
        if(type === "TIER") {
            switch (value) {
                case 1:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 5000,
                        HEALTH: 1000,
                    })
                    setDefaults({
                        atkDef: 800,
                        apValues: 500
                    })
                    break;
                case 2:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 10000,
                        HEALTH: 1200,
                    })
                    setDefaults({
                        atkDef: 900,
                        apValues: 550
                    })
                    break;
                case 3:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 50000,
                        HEALTH: 1450,
                    })
                    setDefaults({
                        atkDef: 1000,
                        apValues: 600
                    })

                    break;
                case 4:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 100000,
                        HEALTH: 1750,
                    })
                    setDefaults({
                        atkDef: 1300,
                        apValues: 650
                    })
                    break;
                case 5:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 1000000,
                        HEALTH: 2000,
                    })
                    setDefaults({
                        atkDef: 1600,
                        apValues: 700
                    })
                    break;
                case 6:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 5000000,
                        HEALTH: 2400,
                    })
                    setDefaults({
                        atkDef: 1900,
                        apValues: 750
                    })
                    break;
                case 7:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 25000000,
                        HEALTH: 3000,
                    })
                    setDefaults({
                        atkDef: 2300,
                        apValues: 800
                    })
                    break;
                default:
                    break;
            }
            
        }
    }

    const availableHandler = (e) => {
        setData({
            ...data,
            AVAILABLE: Boolean(e.target.value)
        })
    }


    const moveHandler = (e) => {
        if (e.target.type === "number"){
            setMoves({
                ...moves,
                [e.target.name]: e.target.valueAsNumber
            })
        } else {
            setMoves({
                ...moves,
                [e.target.name]: e.target.value
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
                    axios.get(`/isekai/ranks/world/${world.TITLE}`)
                        .then((res) => {
                            setRank({rank: res.data, loading: false})
                    })
                    axios.get(`/isekai/zones/world/${world.TITLE}`)
                        .then((res) => {
                            setZone({zone: res.data, loading: false})
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
                        RANK: rank.RANK_CODE,
                    })
                }
            })
    
        }

    }


    if(!cardData.loading) {
        var cardSelector = cardData.data.map(card => {
            return {
                value: card.NAME, label: `${card.NAME}`
            }
        })
    }

    if(!zones.loading) {
        console.log(zones)
        var zoneSelector = zones.zone.map(zone => {
            return {
                value: zone.ZONE_CODE, label: `${zone.TITLE}`
            }
        })

        // var zoneHandler = (e) => {
        //     let value = e[0]
        //     zones.map(zone => {
        //         if (e.value === zone) {
        //             setData({
        //                 ...data,
        //                 ZONE: zone,
        //             })
        //         }
        //     })
    
        // }
        var zoneHandler = (e) => {
            if(e != null){
                let value = e
                const zoneList = [];
                for(const ti of value){
                    if(!data.ZONES.includes(ti)){
                        zoneList.push(ti.value)
                    }
                }
                if(zoneList){
                    setData({
                        ...data,
                        ZONES: zoneList,
                    })
                }
                
            }
        }

    }


    var classSelector = classes.map(c => {
        return {
            value: c, label: `${c}`
        }
    })


    var elementSelector = elements.map(element => {
        return {
            value: element, label: `${element}`
        }
    })

    var questTypeSelector = questTypes.map(q => {
        return {
            value: q, label: `${q}`
        }
    })


    var classHandler = (e) => {
        let value = e[0]
        classes.map(c => {
            if (e.value === c) {
                setData({
                    ...data,
                    CLASS: c,
                })
            }
        })
    }


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

    var mainElementHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setData({
                    ...data,
                    MAIN_ELEMENT: element,
                })
            }
        })
    }

    var element1Handler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setMoves({
                    ...moves,
                    MOVE1_ELEMENT: element,
                })
            }
        })
    }

    
    var element2Handler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setMoves({
                    ...moves,
                    MOVE2_ELEMENT: element,
                })
            }
        })
    }

    
    var element3Handler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setMoves({
                    ...moves,
                    MOVE3_ELEMENT: element,
                })
            }
        })
    }


    var element4Handler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setMoves({
                    ...moves,
                    MOVE4_ELEMENT: element,
                })
            }
        })
    }
    
    var weaknessHandler = (e) => {
        if(e != null){
            let value = e
            const weaknessList = [];
            for(const ti of value){
                if(!data.WEAKNESS.includes(ti)){
                    weaknessList.push(ti.value)
                }
            }
            if(weaknessList){
                setData({
                    ...data,
                    WEAKNESS: weaknessList,
                })
            }
            
        }
    }
    
    var resistancesHandler = (e) => {
        if(e != null){
            let value = e
            const resistancesList = [];
            for(const ti of value){
                if(!data.RESISTANT.includes(ti)){
                    resistancesList.push(ti.value)
                }
            }
            if(resistancesList){
                setData({
                    ...data,
                    RESISTANT: resistancesList,
                })
            }
            
        }
    }
    
    var repelsHandler = (e) => {
        if(e != null){
            let value = e
            const repelsList = [];
            for(const ti of value){
                if(!data.REPEL.includes(ti)){
                    repelsList.push(ti.value)
                }
            }
            if(repelsList){
                setData({
                    ...data,
                    REPEL: repelsList,
                })
            }
            
        }
    }
    
    var immunityHandler = (e) => {
        if(e != null){
            let value = e
            const immunityList = [];
            for(const ti of value){
                if(!data.IMMUNE.includes(ti)){
                    immunityList.push(ti.value)
                }
            }
            if(immunityList){
                setData({
                    ...data,
                    IMMUNE: immunityList,
                })
            }
            
        }
    }
    
    var absorbHandler = (e) => {
        if(e != null){
            let value = e
            const absorbList = [];
            for(const ti of value){
                if(!data.ABSORB.includes(ti)){
                    absorbList.push(ti.value)
                }
            }
            if(absorbList){
                setData({
                    ...data,
                    ABSORB: absorbList,
                })
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

            setData({
                ...data,
                MOVES: [moves],
                QUEST: [quest],
            })

            var card_update_data = data;
            card_update_data.MOVES = [moves]
            card_update_data.QUEST = [quest]
            card_update_data.STAMINA = Number(moves.MOVE1_STAMINA) + Number(moves.MOVE2_STAMINA) + Number(moves.MOVE3_STAMINA) + Number(moves.MOVE4_STAMINA)
            card_update_data.CARD_CODE = random(7, 'numeric')
            const res = await saveCard(card_update_data)

            setMoves(movesInitialState)
            setData(cardInitialState)
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
                        New Isekai Bot Card
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label><h4>Select World</h4></Form.Label>
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
                                            <Form.Label><h4>Main Element</h4></Form.Label>
                                            <Select
                                                onChange={mainElementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Card Name</Form.Label>
                                            <Form.Control
                                                value={NAME}
                                                name="NAME"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Card Variant Name</Form.Label>
                                            <Form.Control
                                                value={CARD_VARIANT_NAME}
                                                name="CARD_VARIANT_NAME"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Card Image Path</Form.Label>
                                            <Form.Control
                                                value={CARD_IMAGE}
                                                onChange={onChangeHandler}
                                                name="CARD_IMAGE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Card Class</Form.Label>
                                            <Select
                                                onChange={classHandler}
                                                options={
                                                    classSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Card Rank</Form.Label>
                                            <Select
                                                onChange={rankHandler}
                                                options={
                                                    rankSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Card DE (Morality)</Form.Label>
                                            <Form.Control
                                                value={MORALITY}
                                                name="MORALITY"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

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
                                            <Form.Label>Quest Element?</Form.Label>
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
                                            <Form.Label>Quest Quantity</Form.Label>
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

                                    <Form.Row>
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
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                value={PRICE}
                                                name="PRICE"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Health</Form.Label>
                                            <Form.Control
                                                value={HEALTH}
                                                name="HEALTH"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Attack</Form.Label>
                                            <Form.Control
                                                value={ATTACK}
                                                name="ATTACK"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Defense</Form.Label>
                                            <Form.Control
                                                value={DEFENSE}
                                                name="DEFENSE"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Speed</Form.Label>
                                            <Form.Control
                                                value={SPEED}
                                                name="SPEED"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Accuracy</Form.Label>
                                            <Form.Control
                                                value={ACCURACY}
                                                name="ACCURACY"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Evasion</Form.Label>
                                            <Form.Control
                                                value={EVASION}
                                                name="EVASION"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                    </Form.Row>
                                    <p>Total Available Attack / Defense Point Left = {defaults.atkDef - (ATTACK + DEFENSE)}</p>
                                    <p>Total Available Ability Points Left = {defaults.apValues - (moves.MOVE1_POWER + moves.MOVE2_POWER + moves.MOVE3_POWER + moves.MOVE4_POWER)}</p>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Ability Name</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE1_ABILITY}
                                                    name="MOVE1_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Element</Form.Label>
                                            <Select
                                                onChange={element1Handler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={moves.MOVE1_POWER}
                                                name="MOVE1_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Ability UP (Usage Points)</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE1_UP}
                                                    name="MOVE1_UP"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Stamina</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE1_STAMINA}
                                                    name="MOVE1_STAMINA"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>

                                    </Form.Row>
                                    

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Ability Name</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE2_ABILITY}
                                                    name="MOVE2_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Element</Form.Label>
                                            <Select
                                                onChange={element2Handler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={moves.MOVE2_POWER}
                                                name="MOVE2_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Ability UP (Usage Points)</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE2_UP}
                                                    name="MOVE2_UP"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Stamina</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE2_STAMINA}
                                                    name="MOVE2_STAMINA"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>

                                    </Form.Row>


                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Ability Name</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE3_ABILITY}
                                                    name="MOVE3_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Element</Form.Label>
                                            <Select
                                                onChange={element3Handler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={moves.MOVE3_POWER}
                                                name="MOVE3_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Ability UP (Usage Points)</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE3_UP}
                                                    name="MOVE3_UP"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Stamina</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE3_STAMINA}
                                                    name="MOVE3_STAMINA"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>

                                    </Form.Row>


                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Ability Name</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE4_ABILITY}
                                                    name="MOVE4_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Element</Form.Label>
                                            <Select
                                                onChange={element4Handler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={moves.MOVE4_POWER}
                                                name="MOVE4_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Ability UP (Usage Points)</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE4_UP}
                                                    name="MOVE4_UP"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                                <Form.Label>Stamina</Form.Label>
                                                <Form.Control
                                                    value={moves.MOVE4_STAMINA}
                                                    name="MOVE4_STAMINA"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                                        </Form.Group>

                                    </Form.Row>



                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Weaknesses</Form.Label>
                                            <Select
                                                onChange={weaknessHandler}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Resistances</Form.Label>
                                            <Select
                                                onChange={resistancesHandler}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Repels</Form.Label>
                                            <Select
                                                onChange={repelsHandler}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Immunity</Form.Label>
                                            <Select
                                                onChange={immunityHandler}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Absorbs</Form.Label>
                                            <Select
                                                onChange={absorbHandler}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Is This Card Available </Form.Label>

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

                                    <Button type="submit">Create Card</Button>
                                    <br />
                                    <br />
                                    <Link to="/updatecards"><Button variant="warning">Update Cards</Button></Link> 
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

export default connect(mapStateToProps, {saveCard})(NewCard)
