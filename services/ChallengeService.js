import ApiService from './ApiService';

const ENDPOINTS = {
  SAVE_CHALLENGE: '/save/challenge',
  ADD_CLAP: "/add/clap",
  ADD_COMMENT: "/add/comment",
  GET_COMMENTS: "/comments",
  DELETE_DRAFT: "/deleteDraft",
  REPORT: "/report",
  CLAPPED_USERS: "/clappedUsers",
  EDIT_POST: "/editPost",
  PIN_POST: "/pinPost"
};

class ChallengeService extends ApiService {

  saveChallenge = (data) => {

    try{
      console.log('save Challenge ' + JSON.stringify(data));
        let formData = new FormData();
        if (data.media) {
          const uri = data.media
          const name = data.media.split('/').pop();
          const type = data.post_type == "image" ? 'image/jpeg' : "video/mp4";
          formData.append('media', { uri, name, type });
        }
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('privacy', data.privacy);
        formData.append('post_type', data.post_type);
        formData.append('is_draft', data.is_draft);
        formData.append('already_saved', data.already_saved);
        formData.append('uuid', data.uuid);
        formData.append('hunt_id', data.hunt_id);
        formData.append('is_featured', data.featured);
        formData.append('featured_duration', data.duration);
        formData.append('featured_url', data.featured_url);
        console.log("aaa");
        return this.apiClient.post(ENDPOINTS.SAVE_CHALLENGE, formData, {
          headers: {
              'content-type': 'multipart/form-data'
          }
      });

    }catch(err){
      console.log('Save Challenge Catch')
        alert(err)

        console.log(err)
    }
    }

    addClap = (data) => {
        try{
            return this.apiClient.post(ENDPOINTS.ADD_CLAP, {post_id: data})
        }catch(err){
            console.log(err)
        }
      }

    addComment = (data) => {
      try{
          return this.apiClient.post(ENDPOINTS.ADD_COMMENT, data)
      }catch(err){
          console.log(err)
      }
    }

    getComments = (data) => {
      try{
          return this.apiClient.get(ENDPOINTS.GET_COMMENTS+data)
      }catch(err){
          console.log(err)
      }
    }

    deleteDraft = (data) => {
      try{
          return this.apiClient.post(ENDPOINTS.DELETE_DRAFT, data)
      }catch(err){
          console.log(err)
      }
    }

    report = (data) => {
      try{
          return this.apiClient.post(ENDPOINTS.REPORT, data)
      }catch(err){
          console.log(err)
      }
    }

    editPost = (data) => {
      try{
          return this.apiClient.post(ENDPOINTS.EDIT_POST, data)
      }catch(err){
          console.log(err)
      }
    }

    clappedUsers = (data) => {
      try{
          return this.apiClient.get(ENDPOINTS.CLAPPED_USERS+"?limit="+data.limit+"&offset="+data.offset+"&postId="+data.postId)
      }catch(err){
          console.log(err)
      }
    }

    pinPost = (data) => {
      try{
          return this.apiClient.post(ENDPOINTS.PIN_POST, data)
      }catch(err){
          console.log(err)
      }
    }

    getPinPost = (data) => {
      try{
          return this.apiClient.get(ENDPOINTS.PIN_POST, data)
      }catch(err){
          console.log(err)
      }
    }
}

export const challengeService = new ChallengeService();
