<template>
    <v-list>
        <v-list-tile
            v-for="(item, i) in items"
            :key="i"
            :to="{ name: item.name }"
        >
            <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    icon: 'dashboard',
                    name: 'dashboard',
                    title: 'Dashboard'
                },
                {
                    icon: 'attach_money',
                    name: 'form',
                    title: 'Form'
                },
                {
                    icon: 'money',
                    name: 'transactions',
                    title: 'Transactions'
                },
                {
                    icon: 'credit_card',
                    name: 'accounts',
                    title: 'Accounts'
                },
                {
                    icon: 'group',
                    name: 'users',
                    title: 'Users'
                }
            ]
        }
    }
};
</script>

