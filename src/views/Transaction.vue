<template>
    <layout-main row wrap>
        <v-flex xs12>
            <transaction-form
                ref="form"
                v-model="form"
                @cancel="onEvent"
                @stored="onEvent"
            />
        </v-flex>
    </layout-main>
</template>

<script>
import TransactionForm from '@/components/transactions/Form';
export default {
    components: {
        TransactionForm
    },
    data() {
        return {
            form: {}
        };
    },
    methods: {
        onEvent() {
            this.form = {};
        }
    }
};
</script>
