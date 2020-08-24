import ApiService from './ApiService';

const ENDPOINTS = {
  ADD_CARD: '/subscribePremium',
  SUBSCRIBED: "/subscribed"
};

class PaymentService extends ApiService {
    subscribePremium = (data) => {
        try{
            return this.apiClient.post(ENDPOINTS.ADD_CARD, data)
        }catch(err){
            console.log(err)
        }
      }

      subscribed = (data) => {
        try{
            return this.apiClient.get(ENDPOINTS.SUBSCRIBED, data)
        }catch(err){
            console.log(err)
        }
      }
}

export const paymentService = new PaymentService();
