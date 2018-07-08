import { mapState, mapGetters, mapActions } from 'vuex';

export const userComputed = {
    ...mapState('user', {
        profileImage: state => state.currentUser.photoUrl || null
    }),
    ...mapGetters('user', ['loggedIn', 'currentUser', 'userToken'])
};

export const userMethods = mapActions('user', ['logIn', 'logOut']);
