<template>
    <v-app>
        <v-navigation-drawer
            persistent
            :mini-variant="miniVariant"
            clipped
            v-model="drawer"
            enable-resize-watcher
            app
        >
            <nav-bar />
        </v-navigation-drawer>
        <v-toolbar
            app
            clipped-left
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
            </v-btn>
            <v-toolbar-title v-text="title" />
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="onLogout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <v-layout
                        :row="row"
                        :column="column" 
                        :wrap="wrap"
                        :align-center="alignCenter"
                        :justify-center="justifyCenter"
                    >
                        <slot />
                    </v-layout>
                </v-slide-y-transition>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { userComputed, userMethods } from '@/store/helpers/user';
import NavBar from '@/components/NavBar.vue';
export default {
    components: {
        NavBar
    },
    props: {
        row: {
            type: Boolean,
            default: false
        },
        column: {
            type: Boolean,
            default: false
        },
        wrap: {
            type: Boolean,
            default: false
        },
        alignCenter: {
            type: Boolean,
            default: false
        },
        justifyCenter: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            drawer: true,
            miniVariant: false,
            title: 'Money Control'
        };
    },
    methods: {
        ...userMethods,
        onLogout() {
            this.logOut().then(() => {
                this.$router.push({ name: 'login' });
            });
        }
    }
};
</script>
