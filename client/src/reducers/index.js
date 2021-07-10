import { combineReducers } from "redux";
import auth from './auth';
import arms from './arms';
import bosses from './bosses';
import cards from './cards';
import games from './games';
import gods from './gods';
import matches from './matches';
import pets from './pets';
import sessions from './sessions';
import teams from './teams';
import titles from './titles';
import universes from './universes';
import vaults from './vaults';

export default combineReducers({
    auth,
    arms,
    bosses,
    cards,
    games,
    gods,
    matches,
    pets,
    sessions,
    teams,
    titles,
    universes,
    vaults
});