<template>
    <v-card class="elevation-2">
        <v-card-title class="primary white--text" primary-title>
            <h1>Users</h1>
        </v-card-title>
        <v-card-title v-if="loading">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </v-card-title>
        <v-list v-else>
            <v-list-tile
                v-for="(stat, key) in stats"
                :key="key"
            >
                <v-flex xs6>{{ stat.owner.name}}</v-flex>
                <v-flex xs6 class="text-xs-right">
                    <h3 class="grey--text">{{ formattedAmount(stat.amount) }}</h3>
                </v-flex>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
import { transactionsMethods } from '@/store/helpers/transactions';
export default {
    data() {
        return {
            loading: true,
            stats: {}
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        ...transactionsMethods,
        load() {
            this.loading = true;
            this.fetchStatsOwner().then(({ data }) => {
                this.loading = false;
                this.stats = data;
            });
        },
        formattedAmount(amount) {
            return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        }
    }
};
</script>
