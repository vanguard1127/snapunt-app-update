import ApiService from './ApiService';

const ENDPOINTS = {
  SEARCH_USERS: '/searchUsers',
  SEARCH_RESULTS: '/searchResults',
  FLAT_RESULTS: '/flatUserResults',
  GET_DISCOVER_DATA: '/discoverData',
  GET_CATEGORY_DATA: '/categoryData',
  GET_FLAT_CAT_DATA: '/flatCatData'
};

class DiscoverService extends ApiService {
  searchUsers = (data) => {
    try {
      return this.apiClient.get(ENDPOINTS.SEARCH_USERS + "?query=" + data)
    } catch (err) {
      console.log(err)
    }
  }

  getSearchResults = (data) => {
    try {
      var detail = data.detail != undefined ? true : false
      return this.apiClient.get(ENDPOINTS.SEARCH_RESULTS + "?query=" + data.username + "&detail=" + detail)
    } catch (err) {
      console.log(err)
    }
  }

  getFlatResults = (data) => {
    try {
      var detail = data.detail != undefined ? true : false
      return this.apiClient.get(ENDPOINTS.FLAT_RESULTS + "?query=" + data.username + "&detail=" + detail)
    } catch (err) {
      console.log(err)
    }
  }

  getDiscoverData = (data) => {
    try {
      // var catIds = data.cat_ids.length > 0 ? data.cat_ids : "all"
      return this.apiClient.get(ENDPOINTS.GET_DISCOVER_DATA + "?offset=" + data.offset + "&limit=" + data.limit)
    } catch (err) {
      console.log(err)
    }
  }

  getFlatCatData = (data) => {
    try {
      return this.apiClient.get(ENDPOINTS.GET_FLAT_CAT_DATA + "?offset=" + data.offset + "&limit=" + data.limit + "&cat_ids=" + data.cat_ids)
    } catch (err) {
      console.log(err)
    }
  }

  getCategoryData = (data) => {
    try {
      return this.apiClient.get(ENDPOINTS.GET_CATEGORY_DATA + "?offset=" + data.offset + "&limit=" + data.limit + "&category_id=" + data.category_id)
    } catch (err) {
      console.log(err)
    }
  }
}

export const discoverService = new DiscoverService();
