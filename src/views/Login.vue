<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-card-text>
                                <v-alert
                                    :value="!!authError"
                                    type="error"
                                >{{ authError }}</v-alert>
                                <v-form>
                                    <v-text-field 
                                        prepend-icon="person"
                                        v-model="email"
                                        label="Email"
                                        type="email"
                                    />
                                    <v-text-field 
                                        prepend-icon="lock"
                                        v-model="password"
                                        label="Password"
                                        type="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="onLogin">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            authError: null,
            tryingToLogIn: false
        };
    },
    methods: {
        onLogin() {
            this.beforeLogin();
            this.$store.dispatch('user/logIn', { email: this.email, password: this.password })
                .then(this.loginSuccess)
                .catch(this.loginError);
        },
        beforeLogin() {
            this.tryingToLogIn = true;
            this.authError = null;
        },
        loginSuccess(user) {
            this.tryingToLogIn = false;
            this.$router.push({ name: 'home' });
        },
        loginError({ response }) {
            this.tryingToLogIn = false;
            this.authError = response.data.message;
        }
    }
};
</script>