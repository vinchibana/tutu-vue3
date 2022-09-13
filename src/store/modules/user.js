export default {
  namespaced: true,
  state() {
    return {
      profile: {
        id: "",
        avatar: "",
        nickname: "",
        account: "",
        mobile: "",
        token: "",
        redirectURL: "",
      },
    };
  },

  mutations: {
    setUser(state, payload) {
      state.profile = payload;
    },
    setToken(state, payload = "") {
      state.profile.token = payload;
    },
    setRedirectURL(state, payload = "") {
      state.redirectURL = payload;
    },
  },
};
