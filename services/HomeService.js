import ApiService from './ApiService';

const ENDPOINTS = {
  GET_HOME: '/getHome',
};

class HomeService extends ApiService {
    fetchHomeData = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.GET_HOME+"?offset="+data.offset+"&limit="+data.limit)
        }catch(err){
            console.log(err)
        }
      }
}

export const homeService = new HomeService();
