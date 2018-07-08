<template>
    <v-card>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
            >
                <v-text-field
                    v-model="value.name"
                    label="name"
                    :rules="rules.name"
                />
                <v-text-field
                    v-model="value.email"
                    :rules="rules.email"
                    label="Email"
                />
                <v-text-field
                    v-model="value.password"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :rules="rules.password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    counter
                    @click:append="showPassword = !showPassword"
                />
                <v-checkbox
                    v-model="value.all"
                    color="green"
                >
                    <div slot="label">All</div>
                </v-checkbox>
                <v-btn @click="onCancel">Cancel</v-btn>
                <v-btn color="success" @click="onSubmit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import VueNotifications from 'vue-notifications';
import { usersMethods } from '@/store/helpers/users';
import _isEmpty from 'lodash/isEmpty';
export default {
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            valid: true,
            showPassword: false,
            rules: {
                name: [
                    v => !!v || 'Name is required',
                    v => v && v.length >= 5 || 'Min 5 characters'
                ],
                email: [
                    v => !!v || 'Email is required',
                    v => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(v) || 'Invalid email.'
                    }
                ],
                password: this.getPasswordRules()
            }
        };
    },
    methods: {
        ...usersMethods,
        getPasswordRules() {
            let rules = [];
            if (_isEmpty(this.value)) {
                rules.push(v => !!v || 'Password is required');
                rules.push(v => v && v.length >= 8 || 'Min 8 characters');
            } else {
                rules.push(v => {
                    const length = v.length;
                    if (length === 0 || length >= 8) {
                        return true;
                    }
                    return 'Min 8 characters';
                });
            }

            return rules;
        },
        onCancel() {
            this.$emit('cancel');
        },
        onSubmit() {
            if (!this.$refs.form.validate()) {
                return;
            }

            this.saveUser(this.value)
                .then(() => {
                    this.$emit('stored');
                    this.showSuccessMsg();
                })
                .catch(this.showErrorMsg);
        },
        prepare() {
            this.loading = true;
            this.prepareNew();
        },
        prepareNew() {
            if (!_isEmpty(this.value)) {
                return;
            }

            this.$emit('input', {
                name: '',
                email: '',
                password: '',
                all: false
            });
        }
    },
    watch: {
        value: 'prepareNew'
    },
    created() {
        this.prepare();
    },
    notifications: {
        showSuccessMsg: {
            type: VueNotifications.types.success,
            title: '',
            message: 'User successfully saved.'
        },
        showErrorMsg: {
            type: VueNotifications.types.error,
            title: '',
            message: 'Could not save user.'
        }
    }
};
</script>
