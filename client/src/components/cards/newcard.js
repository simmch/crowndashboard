import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { cardInitialState, enhancements, elements, questTypes, classes } from '../STATE'
import { saveCard } from '../../actions/cards'

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

    const [scenarios, setScenario] = useState({
        scenario: [],
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
        SCENARIO: "",
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
        MOVE2_ABILITY: "",
        MOVE2_POWER: 0,
        MOVE2_ELEMENT: "",
        MOVE3_ABILITY: "",
        MOVE3_POWER: 0,
        MOVE3_ELEMENT: "",
        MOVE4_ABILITY: "",
        MOVE4_POWER: 0,
        MOVE4_ELEMENT: "",
    });
    // Build Moves
    var move1Object = {}
    var move2Object = {}
    var move3Object = {}
    var move4Object = {}
    var movesArray = []

    const {
        CARD_CODE,
        NAME,
        CARD_IMAGE,
        VARIANT,
        CARD_VARIANT_NAME,
        CLASS,
        PRICE,
        MOVES,
        WORLD,
        ATTACK,
        DEFENSE,
        SPEED,
        RANK,
        QUEST,
        MORALITY,
        RARITY,
        TIER,
        AVAILABLE,
        ZONES,
        WEAKNESS, 
        RESISTANT, 
        REPEL, 
        IMMUNE, 
        ABSORB
    } = data;
    const {
        MOVE1_ABILITY, 
        MOVE1_POWER, 
        MOVE1_ELEMENT, 
        MOVE2_ABILITY, 
        MOVE2_POWER, 
        MOVE2_ELEMENT, 
        MOVE3_ABILITY, 
        MOVE3_POWER, 
        MOVE3_ELEMENT,
        MOVE4_ABILITY, 
        MOVE4_POWER, 
        MOVE4_ELEMENT,
    } = moves;
    if({...moves}){
        move1Object[MOVE1_ABILITY] = MOVE1_POWER
        move1Object['STAM'] = 10
        move1Object['ELEMENT'] = MOVE1_ELEMENT
        
        move2Object[MOVE2_ABILITY] = MOVE2_POWER
        move2Object['STAM'] = 30
        move2Object['ELEMENT'] = MOVE2_ELEMENT

        
        move3Object[MOVE3_ABILITY] = MOVE3_POWER
        move3Object['STAM'] = 80
        move3Object['ELEMENT'] = MOVE3_ELEMENT
        

        enhancerObject[ENHANCER_ABILITY] = ENHANCER_POWER
        enhancerObject['STAM'] = 20
        enhancerObject['TYPE'] = ENHANCEMENT_TYPE
    }
    
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
                        HLT: 1725,
                    })
                    setDefaults({
                        atkDef: 325,
                        apValues: 500
                    })
                    break;
                case 2:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 10000,
                        HLT: 1750,
                    })
                    setDefaults({
                        atkDef: 350,
                        apValues: 550
                    })
                    break;
                case 3:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 50000,
                        HLT: 1800,
                    })
                    setDefaults({
                        atkDef: 400,
                        apValues: 600
                    })

                    break;
                case 4:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 100000,
                        HLT: 1850,
                    })
                    setDefaults({
                        atkDef: 425,
                        apValues: 650
                    })
                    break;
                case 5:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 1000000,
                        HLT: 1900,
                    })
                    setDefaults({
                        atkDef: 450,
                        apValues: 700
                    })
                    break;
                case 6:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 5000000,
                        HLT: 1950,
                    })
                    setDefaults({
                        atkDef: 475,
                        apValues: 750
                    })
                    break;
                case 7:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 25000000,
                        HLT: 2000,
                    })
                    setDefaults({
                        atkDef: 500,
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
        
        move1Object[MOVE1_ABILITY] = MOVE1_POWER
        move1Object['STAM'] = 10
        move1Object['ELEMENT'] = MOVE1_ELEMENT
        
        move2Object[MOVE2_ABILITY] = MOVE2_POWER
        move2Object['STAM'] = 30
        move2Object['ELEMENT'] = MOVE2_ELEMENT

        
        move3Object[MOVE3_ABILITY] = MOVE3_POWER
        move3Object['STAM'] = 80
        move3Object['ELEMENT'] = MOVE3_ELEMENT
        

        enhancerObject[ENHANCER_ABILITY] = ENHANCER_POWER
        enhancerObject['STAM'] = 20
        enhancerObject['TYPE'] = ENHANCEMENT_TYPE
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
                    axios.get(`/isekai/scenarios/world/${world.TITLE}`)
                        .then((res) => {
                            setScenario({scenario: res.data, loading: false})
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


    if(!cardData.loading) {
        var cardSelector = cardData.data.map(card => {
            return {
                value: card.NAME, label: `${card.NAME}`
            }
        })
    }

    if(!zones.loading) {
        var zoneSelector = zones.zone.map(zone => {
            return {
                value: zone.ZONE_CODE, label: `${zone.TITLE}`
            }
        })

        var zoneHandler = (e) => {
            let value = e[0]
            zones.map(zone => {
                if (e.value === zone) {
                    setData({
                        ...data,
                        ZONE: zone,
                    })
                }
            })
    
        }

    }

    if(!scenarios.loading) {
        var scenarioSelector = scenarios.scenario.map(scenario => {
            return {
                value: scenario.SCENARIO_CODE, label: `${scenario.TITLE}`
            }
        })

        var scenarioHandler = (e) => {
            let value = e[0]
            scenarios.map(scenario => {
                if (e.value === scenario) {
                    setQuest({
                        ...quest,
                        SCENARIO: scenario,
                    })
                }
            })
    
        }

    }

    var questTypeSelector = questTypes.map(q => {
        return {
            value: q, label: `${q}`
        }
    })


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

    var moveEnhancementHandler = (e) => {
        let value = e[0]
        enhancements.map(enhancement => {
            if (e.value === enhancement) {
                setMoves({
                    ...moves,
                    ENHANCEMENT_TYPE: enhancement,
                })
            }
        })
    }

    var element1EnhancementHandler = (e) => {
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
    
    var element2EnhancementHandler = (e) => {
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
    
    var element3EnhancementHandler = (e) => {
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
                MOVESET: [move1Object, move2Object, move3Object, enhancerObject]
            })

            var card_update_data = data;
            card_update_data.PASS = [quest_Object]
            card_update_data.MOVESET = [move1Object, move2Object, move3Object, enhancerObject]

            const res = await saveCard(data)

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
                        New Crown Unlimited Card
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
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Path</Form.Label>
                                            <Form.Control
                                                value={PATH}
                                                onChange={onChangeHandler}
                                                name="PATH"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Focused Path</Form.Label>
                                            <Form.Control
                                                value={FPATH}
                                                name="FPATH"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>


                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Resolved Path</Form.Label>
                                            <Form.Control
                                                value={RPATH}
                                                name="RPATH"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Ultimate GIF</Form.Label>
                                            <Form.Control
                                                value={GIF}
                                                name="GIF"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Name</Form.Label>
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
                                            <Form.Label>Resolved Name</Form.Label>
                                            <Form.Control
                                                value={RNAME}
                                                name="RNAME"
                                                onChange={onChangeHandler}
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

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
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
                                                value={HLT}
                                                name="HLT"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Stamina</Form.Label>
                                            <Form.Control
                                                disabled
                                                value={STAM}
                                                name="STAM"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Attack</Form.Label>
                                            <Form.Control
                                                value={ATK}
                                                name="ATK"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Defense</Form.Label>
                                            <Form.Control
                                                value={DEF}
                                                name="DEF"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Speed</Form.Label>
                                            <Form.Control
                                                value={SPD}
                                                name="SPD"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Quest Ability</Form.Label>
                                            <Form.Control
                                                value={quest.ABILITY}
                                                name="ABILITY"
                                                onChange={questHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Quest Power</Form.Label>
                                            <Form.Control
                                                value={quest.POWER}
                                                name="POWER"
                                                onChange={questHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Quest Type</Form.Label>
                                            <Select
                                                onChange={questEnhancementHandler}
                                                options={
                                                    enhancementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label> Has Destiny </Form.Label>
                                            <Col sm={10}>
                                                <Form.Check
                                                onChange={onChangeHandler}
                                                type="radio"
                                                label="Yes"
                                                name="formHorizontalRadios"
                                                id="true"
                                                checked = {HAS_COLLECTION === true}
                                                />
                                                <Form.Check
                                                onChange={onChangeHandler}
                                                type="radio"
                                                label="No"
                                                name="formHorizontalRadios"
                                                id="false"
                                                checked = {HAS_COLLECTION === false}
                                                />
                                            </Col>
                                            </Form.Group>

                                        <Form.Group hidden={!HAS_COLLECTION} as={Col} md="10" controlId="validationCustom02">
                                        <Form.Label>Destiny</Form.Label>
                                        <Form.Control
                                                value={COLLECTION}
                                                name="COLLECTION"
                                                onChange={onChangeHandler}
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                    </Form.Row>
                                    <p>Total Available Attack / Defense Point Left = {defaults.atkDef - (ATK + DEF)}</p>
                                    <p>Total Available Ability Points Left = {defaults.apValues - (MOVE1_POWER + MOVE2_POWER + MOVE3_POWER)}</p>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Normal Attack</Form.Label>
                                                <Form.Control
                                                    value={MOVE1_ABILITY}
                                                    name="MOVE1_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={MOVE1_POWER}
                                                name="MOVE1_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element</Form.Label>
                                            <Select
                                                onChange={element1EnhancementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Special Attack</Form.Label>
                                                <Form.Control
                                                    value={MOVE2_ABILITY}
                                                    name="MOVE2_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={MOVE2_POWER}
                                                name="MOVE2_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element</Form.Label>
                                            <Select
                                                onChange={element2EnhancementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>


                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Ultimate Attack</Form.Label>
                                                <Form.Control
                                                    value={MOVE3_ABILITY}
                                                    name="MOVE3_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={MOVE3_POWER}
                                                name="MOVE3_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element</Form.Label>
                                            <Select
                                                onChange={element3EnhancementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="8" controlId="validationCustom02">
                                            <Form.Label>Enhancement</Form.Label>
                                            <Form.Control
                                                value={ENHANCER_ABILITY}
                                                name="ENHANCER_ABILITY"
                                                onChange={moveHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Enhancement Type</Form.Label>
                                            <Select
                                                onChange={moveEnhancementHandler}
                                                options={
                                                    enhancementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={ENHANCER_POWER}
                                                name="ENHANCER_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

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
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                        <Form.Label> Exclusive </Form.Label>
                                        <Form.Control
                                            as="select"
                                            id="inlineFormCustomSelectPref"
                                            onChange={exclusiveHandler}
                                        >
                                            <option value={true} name="true">Yes</option>
                                            <option value={""} name="false">No</option>
                                        </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                        <Form.Label> Is Skin? </Form.Label>
                                        <Form.Control
                                            as="select"
                                            id="inlineFormCustomSelectPref"
                                            onChange={isSkinHandler}
                                        >
                                            <option value={true} name="true">Yes</option>
                                            <option value={""} name="false">No</option>
                                        </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label><h4>Select Character For Skin</h4></Form.Label>
                                            <Select
                                                onChange={skinForHandler}
                                                options={
                                                    cardSelector
                                                }
                                                styles={styleSheet}
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


                                    <Button type="submit">Create Card</Button>
                                    <br />
                                    <br />
                                    <Link to="/updatecards"><Button variant="warning">Update Cards</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}
                                </Form>

                                {/* DESCRIPTION WORK
                                 <Form>
                                <Form.Row>
                                        <Form.Group as={Col} md="10">
                                                <Form.Label>Descriptions</Form.Label>
                                                <Form.Control
                                                    value={desc.TEXT}
                                                    onChange={onDescriptionHandler}
                                                    name={desc.TEXT}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2">
                                            <Form.Label>Queue Description</Form.Label>
                                            <Button onClick={onDescriptionAdd} variant="success">Add</Button>
                                        </Form.Group>
                                        
                                        {desc.DESC.map((item, index) => (
                                        <Form.Group as={Col} md="8">
                                            
                                                <Form.Control
                                                value={item}
                                                name={item}
                                                type="text"
                                                key={index}
                                                />
                                            
                                            <Button onClick={onDescriptionAdd} variant="danger">Delete</Button>
                                        </Form.Group>
                                        ))}
                                        
                                        
                                       
                                    </Form.Row>
                                </Form> */}

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
