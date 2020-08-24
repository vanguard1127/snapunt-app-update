import ApiService from './ApiService';

const ENDPOINTS = {
  GET_SEASON1_DATA: '/season1Data',
};

class Season1Service extends ApiService {
    getSeason1Data = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.GET_SEASON1_DATA+"?limit="+data.limit+"&offset="+data.offset)
        }catch(err){
            console.log(err)
        }
      }
}

export const season1Service = new Season1Service();
