import ApiService from './ApiService';

const ENDPOINTS = {
  FOLLOW: '/follow',
  ACCEPT_REQUEST: '/acceptRequest',
  CANCEL_REQUEST: '/cancelRequest',
  GET_FRIENDS: "/getFriends",
  GET_ACTIVITY: "/activities",

  GET_FOLLOWERS: "/followers",
  GET_FOLLOWINGS: "/followings",
  ACTIVITIES: "/only/activities"

};

class FollowService extends ApiService {
    follow = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.FOLLOW+"?following_id="+data)
        }catch(err){
            console.log(err)
        }
      }

      accept = (data) => {
        try{
            return this.apiClient.post(ENDPOINTS.ACCEPT_REQUEST, {follower_id: data})
        }catch(err){
            console.log(err)
        }
      }

      cancel = (data) => {
        try{
          return this.apiClient.post(ENDPOINTS.CANCEL_REQUEST, {follower_id: data})
        }catch(err){
            console.log(err)
        }
      }

      getFriends = (data) => {
        try{
          return this.apiClient.post(ENDPOINTS.GET_FRIENDS+"?limit="+data.limit+"&offset="+data.offset)
        }catch(err){
            console.log(err)
        }
      }

      getActivity = (data) => {
        try{
          return this.apiClient.get(ENDPOINTS.GET_ACTIVITY)
        }catch(err){
            console.log(err)
        }
      }

      getFollowers = (data) => {
        try{
          return this.apiClient.get(ENDPOINTS.GET_FOLLOWERS+"?limit="+data.limit+"&offset="+data.offset+"&userId="+data.userId)
        }catch(err){
            console.log(err)
        }
      }

      getFollowings = (data) => {
        try{
          return this.apiClient.get(ENDPOINTS.GET_FOLLOWINGS+"?limit="+data.limit+"&offset="+data.offset+"&userId="+data.userId)
        }catch(err){
            console.log(err)
        }
      }

      getActivities = (data) => {
        try{
          return this.apiClient.get(ENDPOINTS.ACTIVITIES+"?limit="+data.limit+"&offset="+data.offset)
        }catch(err){
            console.log(err)
        }
      }

      
}

export const followService = new FollowService();
