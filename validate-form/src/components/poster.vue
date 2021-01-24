<template>
  <div class="container">
      <form class="col s12" @submit.prevent="handleSubmit">
          <!-- Name -->
            <div class="input-field col m8 s12">
                <input id="name" type="text" class="validate" 
                    v-model="userForm.name"
                    :class="{ 'is-invalid': isSubmitted && $v.userForm.name.$error }"
                >
                <label for="name">Full Name</label>
                <div v-if="isSubmitted && $v.userForm.name.$error">
                    <span class="helper-text red-text" data-error="wrong" data-success="right"
                        v-if="isSubmitted && !$v.userForm.name.required">
                        Name is required
                    </span>
                    <span class="helper-text red-text" data-error="wrong" data-success="right"
                        v-if="isSubmitted && !$v.userForm.name.alpha">
                        English characters only
                    </span>
                </div>
            </div>

            <!-- Captcha -->
            <div class="input-field col m8 s12">
                <!-- <script 
                    src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=6Ley3DkaAAAAABQjtu08SNmHyBqBrFQ71ufHsOlT" async defer>
                </script> -->
                <vue-recaptcha
                    class="validate" 
                    @verify="markVerified"
                    id="robotVerified" 
                    sitekey="6LcZ5TkaAAAAAMnmlqDmW_9oI9nijgp2LKn6R6yB"
                    v-model="userForm.robotVerified"
                    :class="{ 'is-invalid': isSubmitted && $v.userForm.robotVerified.$error }"
                    :loadRecaptchaScript="true">
                </vue-recaptcha>
                <div v-if="isSubmitted && $v.userForm.robotVerified.$error">
                    <span class="helper-text red-text" data-error="wrong" data-success="right"
                        v-if="isSubmitted && !$v.userForm.robotVerified.required">
                        Please tick reCAPTCHA
                    </span>
                </div>
            </div>
            

            <div class="col s12"><button class="center-align btn-large teal">Submit</button></div>
      </form>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'
    import VueAxios from 'vue-axios'
    import {
        required,
        alpha,
        alphaNum,
        email,
        numeric,
        minLength,
        maxLength,
        sameAs

    } from "vuelidate/lib/validators";

export default {
    name: 'poster',
    components: { VueRecaptcha },
    data() {
        return {
            userForm: { name: "", robotVerified: false },
            isSubmitted: false
        }
    },
    validations: {
        userForm: {
            name: { required, alpha },
            robotVerified: { required }
        }
    },
    methods: {
        markVerified(response) {
            this.userForm.robotVerified = true;
        },
        handleSubmit() {
            this.isSubmitted = true;
            this.$v.$touch();
            if (!this.userForm.robotVerified){
                return true;
            }
            if (this.$v.$invalid) {
                return;
            }
            axios.post('https://eeeyy.free.beeceptor.com/', 
                this.userForm).then(response => {
                    console.log(response);
                });
            alert("SUCCESS!" + JSON.stringify(this.userForm));
        }
    }
}
</script>

<style>

</style>