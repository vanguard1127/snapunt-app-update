import ApiService from './ApiService';

const ENDPOINTS = {
  PROFILE: '/auth/me',
  CHANGE_PASSWORD: '/user/change-password',
  USER: '/updateUser',
  GET_PROFILE: '/profile'
};

class ProfileService extends ApiService {
  getProfile = (data) => {
    return this.apiClient.get(ENDPOINTS.GET_PROFILE+"?offset="+data.offset+"&limit="+data.limit+"&id="+data.profileId+"&type="+data.type+"&second="+data.second);
  };

  authMe = () => {
    return this.apiClient.get(ENDPOINTS.PROFILE);
  };

  changePassword = data => {
    return this.apiClient.post(ENDPOINTS.CHANGE_PASSWORD, data);
  };

  updateUser = data => {
    let formData = new FormData();
    if (data.avatar) {
      const uri = data.avatar.uri;
      const name = uri.split('/').pop();
      const type = 'image/jpeg';
      formData.append('avatar', { uri, name, type });
    }

    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('username', data.username);
    formData.append('bio', data.bio);
    formData.append('website', data.website);
    return this.apiClient.post(ENDPOINTS.USER, formData);
  };
}

export const profileService = new ProfileService();
