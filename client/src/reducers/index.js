import { combineReducers } from "redux";
import auth from './auth';
import ranks from './ranks';
import bosses from './bosses';
import cards from './cards';
import games from './games';
import gods from './gods';
import matches from './matches';
import pets from './pets';
import sessions from './sessions';
import teams from './teams';
import zones from './zones';
import worlds from './worlds';
import abyss from "./abyss";
import vaults from './vaults';
import scenarios from "./scenarios";

export default combineReducers({
    auth,
    ranks,
    bosses,
    cards,
    games,
    gods,
    matches,
    pets,
    sessions,
    teams,
    zones,
    worlds,
    scenarios,
    vaults,
    abyss
});