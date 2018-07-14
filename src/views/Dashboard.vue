<template>
    <layout-main row wrap>
        <v-flex xs12 sm6 md6 pa-2>
            <stat-accounts />
        </v-flex>
        <v-flex xs12 sm6 md6 pa-2>
            <stat-users />
        </v-flex>
    </layout-main>
</template>

<script>
import StatAccounts from '@/components/dashboard/StatAccounts';
import StatUsers from '@/components/dashboard/StatUsers';
export default {
    components: {
        StatAccounts,
        StatUsers
    }
};
</script>
