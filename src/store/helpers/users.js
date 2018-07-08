import { mapState, mapActions } from 'vuex';

export const usersComputed = {
    ...mapState('users', {})
};

export const usersMethods = mapActions('users', ['saveUser', 'fetchAllUsers', 'deleteUser']);
