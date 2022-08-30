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
      },
    };
  },

  mutations: {
    setUser(state, payload) {
      state.profile.account = payload;
    },
  },
};
