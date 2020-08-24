import ApiService from './ApiService';

const ENDPOINTS = {
  GET_SAVED_CHALLENGES: '/savedChallenges',
};

class MyChallengeService extends ApiService {
    getSeason1Data = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.GET_SAVED_CHALLENGES+"?limit="+data.limit+"&offset="+data.offset)
        }catch(err){
            console.log(err)
        }
      }
}

export const myChallengeService = new MyChallengeService();
