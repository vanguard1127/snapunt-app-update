import ApiService from './ApiService';

const ENDPOINTS = {
  SAVE_HUNT: '/saveHunt',
  GET_HUNTS: "/getHunts",
  HUNT_DETAIL: "/huntDetail",
  JOIN_HUNT: "/joinHunt",
  HUNT_SNAPOFFS: "/huntSnapOffs"
};

class HuntService extends ApiService {
  saveHunt = (data) => {

    try{
        let formData = new FormData()
        formData.append("title", data.title)
        formData.append("members", JSON.stringify(data.members))

        var updated = data.challenges.map((ch, key) => {
          if (ch.media) {
            const uri = ch.media
            const name = ch.media.split('/').pop();
            const type = ch.post_type == "image" ? 'image/jpeg' : "video/mp4";
            media = { uri, name, type };
            delete ch["media"]
            formData.append("media-"+key, media)
          }
          return ch
        })

        formData.append("challenges", JSON.stringify(updated))

        return this.apiClient.post(ENDPOINTS.SAVE_HUNT, formData, {
          headers: {
              'content-type': 'multipart/form-data'
          }
      });

    }catch(err){
        console.log(err)
    }
    }

    getHunts = (data) => {
      try{
          return this.apiClient.get(ENDPOINTS.GET_HUNTS+"?limit="+data.limit+"&offset="+data.offset)
      }catch(err){
          console.log(err)
      }
    }

    huntDetail = (data) => {
      try{
          return this.apiClient.get(ENDPOINTS.HUNT_DETAIL+"?uuid="+data)
      }catch(err){
          console.log(err)
      }
    }

    joinHunt = (data) => {
      try{
          return this.apiClient.post(ENDPOINTS.JOIN_HUNT, {hunt_id: data})
      }catch(err){
          console.log(err)
      }
    }

    huntSnapOffs = (data) => {
      try{
          return this.apiClient.get(ENDPOINTS.HUNT_SNAPOFFS+"?limit="+data.limit+"&offset="+data.offset+"&uuid="+data.uuid)
      }catch(err){
          console.log(err)
      }
    }
}

export const huntService = new HuntService();
