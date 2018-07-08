<template>
    <layout-main row wrap>
        <v-flex xs12 sm6 md6 pa-2>
            <stat-accounts />
        </v-flex>
        <v-flex xs12 sm6 md6 pa-2>
            <stat-owners />
        </v-flex>
    </layout-main>
</template>

<script>
import StatAccounts from '@/components/dashboard/StatAccounts';
import StatOwners from '@/components/dashboard/StatOwners';
export default {
    components: {
        StatAccounts,
        StatOwners
    }
};
</script>
