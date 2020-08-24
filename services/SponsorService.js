import ApiService from './ApiService';

const ENDPOINTS = {
  GET_SPONSPOR_CHALLENGES: '/sponsor/challenge',
  GET_SPONSPOR_POSTS: '/sponsor/challenge/posts'
};

class SponsorService extends ApiService {
    getSponsorChallenges = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.GET_SPONSPOR_CHALLENGES+"?limit="+data.limit+"&offset="+data.offset)
        }catch(err){
            console.log(err)
        }
      }

      getSponsorPosts = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.GET_SPONSPOR_POSTS+"?limit="+data.limit+"&offset="+data.offset+"&uuid="+data.uuid)
        }catch(err){
            console.log(err)
        }
      }

}

export const sponsorService = new SponsorService();
