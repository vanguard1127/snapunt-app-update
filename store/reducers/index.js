import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import loaderReducer from './LoaderReducer';
import errorReducer from './ErrorReducer';
import challengeReducer from "./ChallengeReducer"
import discoverReducer from "./DiscoverReducer"
import followReducer from "./FollowReducer"
import  homeReducer from "./HomeReducer"
import  season1Reducer from "./Season1Reducer"
import  myChallengeReducer from "./MyChallengeReducer"
import  sponsorReducer from "./SponsorReducer"
import  huntReducer from "./HuntReducer"
import featuredReducer from "./FeaturedReducer"

export default combineReducers({
  userReducer,
  loaderReducer,
  errorReducer,
  challengeReducer,
  discoverReducer,
  followReducer,
  homeReducer, 
  season1Reducer,
  myChallengeReducer,
  sponsorReducer,
  huntReducer,
  featuredReducer
});
