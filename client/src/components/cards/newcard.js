import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { cardInitialState, enhancements } from '../STATE'
import { saveCard } from '../../actions/cards'

export const NewCard = ({auth, cards, history, saveCard}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });
    const [data, setData] = useState(cardInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [passive, setPassive] = useState({
        ABILITY: "",
        POWER: 20,
        PASSIVE_TYPE: ""
    });
    // Build Passive
    var pass_ability = passive.ABILITY.toString()
    var pass_power = passive.POWER
    var pass_type = passive.PASSIVE_TYPE
    var pass_key = pass_ability
    var passive_Object = {}
    passive_Object[pass_key] = pass_power
    passive_Object["TYPE"] = pass_type

    const [moves, setMoves] = useState({
        MOVE1_ABILITY: "",
        MOVE1_POWER: null,
        MOVE2_ABILITY: "",
        MOVE2_POWER: null,
        MOVE3_ABILITY: "",
        MOVE3_POWER: null,
        ENHANCER_ABILITY: "",
        ENHANCER_POWER: null,
        ENHANCEMENT_TYPE: ""
    });
    // Build Moves
    var move1Object = {}
    var move2Object = {}
    var move3Object = {}
    var enhancerObject = {}
    var movesArray = []

    const {PATH, RPATH, GIF, NAME, RNAME, PRICE, TOURNAMENT_REQUIREMENTS, MOVESET, HLT, STAM, ATK, DEF, TYPE, ACC, PASS, SPD, VUL, UNIVERSE, COLLECTION, HAS_COLLECTION, STOCK, AVAILABLE, DESCRIPTIONS, EXCLUSIVE} = data;
    const {MOVE1_ABILITY, MOVE1_POWER, MOVE2_ABILITY, MOVE2_POWER, MOVE3_ABILITY, MOVE3_POWER, ENHANCER_ABILITY,ENHANCEMENT_TYPE, ENHANCER_POWER} = moves;
    if({...moves}){
        move1Object[MOVE1_ABILITY] = MOVE1_POWER
        move1Object['STAM'] = 10
        
        move2Object[MOVE2_ABILITY] = MOVE2_POWER
        move2Object['STAM'] = 30
        
        move3Object[MOVE3_ABILITY] = MOVE3_POWER
        move3Object['STAM'] = 80
        

        enhancerObject[ENHANCER_ABILITY] = ENHANCER_POWER
        enhancerObject['STAM'] = 20
        enhancerObject['TYPE'] = ENHANCEMENT_TYPE
    }
    
    useEffect(() => {
        // if (!auth.isAuthenticated) {
        //   history.push('/login')
        // }

        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverse({universe: res.data, loading: false})
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

    const exclusiveHandler = (e) => {
        setData({
            ...data,
            EXCLUSIVE: Boolean(e.target.value)
        })
    }

    const passiveHandler = (e) => {
        if (e.target.type === "number"){
            setPassive({
                ...passive,
                [e.target.name]: e.target.valueAsNumber
            })
        } else {
            setPassive({
                ...passive,
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
        
        move2Object[MOVE2_ABILITY] = MOVE2_POWER
        move2Object['STAM'] = 30
        
        move3Object[MOVE3_ABILITY] = MOVE3_POWER
        move3Object['STAM'] = 80
        

        enhancerObject[ENHANCER_ABILITY] = ENHANCER_POWER
        enhancerObject['STAM'] = 20
        enhancerObject['TYPE'] = ENHANCEMENT_TYPE
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
                        UNIVERSE: universe.TITLE,
                    })
                }
            })
        }
    }

    var enhancementSelector = enhancements.map(enhancement => {
        return {
            value: enhancement, label: `${enhancement}`
        }
    })

    var passiveEnhancementHandler = (e) => {
        let value = e[0]
        enhancements.map(enhancement => {
            if (e.value === enhancement) {
                setPassive({
                    ...passive,
                    PASSIVE_TYPE: enhancement,
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
            card_update_data.PASS = [passive_Object]
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
    return auth.loading || universes.loading ? (
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
                                            <Form.Label><h4>Select Universe</h4></Form.Label>
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
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
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

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Stock</Form.Label>
                                            <Form.Control
                                                value={STOCK}
                                                name="STOCK"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Passive Ability</Form.Label>
                                            <Form.Control
                                                value={passive.ABILITY}
                                                name="ABILITY"
                                                onChange={passiveHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Passive Power</Form.Label>
                                            <Form.Control
                                                value={passive.POWER}
                                                name="POWER"
                                                onChange={passiveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Passive Type</Form.Label>
                                            <Select
                                                onChange={passiveEnhancementHandler}
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


                                    <Form.Row>
                                        <Form.Group as={Col} md="11" controlId="validationCustom02">
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
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
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
                                        <Form.Group as={Col} md="11" controlId="validationCustom02">
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
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
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
                                        <Form.Group as={Col} md="11" controlId="validationCustom02">
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
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
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
