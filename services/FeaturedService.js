import ApiService from './ApiService';

const ENDPOINTS = {
  GET_FEATURED_CHALLENGES: '/featuredPosts',
};

class FeaturedService extends ApiService {
    getFeaturedChallenges = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.GET_FEATURED_CHALLENGES+"?limit="+data.limit+"&offset="+data.offset)
        }catch(err){
            console.log(err)
        }
      }
}

export const featuredService = new FeaturedService();
