<template>
<div class="container">
    <h2>Validation Requirements</h2>
    <div class="row">
        <form class="col s12" @submit.prevent="handleSubmit">
            <div class="row">

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

                <!-- User Name -->
                <div class="input-field col m4 s12">
                    <input id="uname" type="text" class="validate" 
                        v-model="userForm.uname"
                        :class="{ 'is-invalid': isSubmitted && $v.userForm.uname.$error }"
                    >
                    <label for="uname">Username</label>
                    <div v-if="isSubmitted && $v.userForm.uname.$error">
                        <span class="helper-text red-text" data-error="wrong" data-success="right"
                            v-if="isSubmitted && !$v.userForm.uname.required">
                            Username is required
                        </span>
                        <span class="helper-text red-text" data-error="wrong" data-success="right"
                            v-if="isSubmitted && !$v.userForm.uname.alphaNum">
                            Requered alphanumeric 
                        </span>
                    </div>
                </div>

                <!-- Email -->
                <div class="input-field col s12">
                    <input 
                        v-model="userForm.email" 
                        type="email" id="email" name="email" class="validate"
                        :class="{ 'is-invalid': isSubmitted && $v.userForm.email.$error }">
                    <label for="email">Email</label>
                    <div v-if="isSubmitted && $v.userForm.email.$error">
                        <span v-if="!$v.userForm.email.required" class="helper-text red-text" data-error="wrong" data-success="right">
                            Email field is required
                        </span>
                        <span v-if="!$v.userForm.email.email" class="helper-text red-text" data-error="wrong" data-success="right">
                            Please provide valid email
                        </span>
                    </div>
                    <!-- <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> -->
                </div>

                <!-- Mobile -->
                <div class="input-field col s12">
                    <input 
                        v-model="userForm.mobile" 
                        type="number" id="mobile" name="mobile" class="validate"
                        :class="{ 'is-invalid': isSubmitted && $v.userForm.mobile.$error }">
                    <label for="mobile">Mobile</label>
                    <div v-if="isSubmitted && $v.userForm.mobile.$error">
                        <span v-if="!$v.userForm.mobile.required" class="helper-text red-text" data-error="wrong" data-success="right">
                            Mobile number is required
                        </span>
                        <span v-if="!$v.userForm.mobile.numeric" class="helper-text red-text" data-error="wrong" data-success="right">
                            Mobile number must be numeric only
                        </span>
                    </div>
                </div>

                <!-- Password -->
                <div class="input-field col m6 s12">
                    <i class="material-icons prefix">lock</i>
                    <input id="password" type="password" v-model="userForm.password" name="password" class="validate"
                        :class="{ 'is-invalid': isSubmitted && $v.userForm.password.$error }">
                    <label for="password">Password</label>
                    <div v-if="isSubmitted && $v.userForm.password.$error">
                        <span v-if="!$v.userForm.password.required"
                            class="helper-text red-text" data-error="wrong" data-success="right">
                            Password field is required</span>
                        <span v-if="!$v.userForm.password.minLength"
                            class="helper-text red-text" data-error="wrong" data-success="right">
                            Password should be at least 8 characters long</span>
                        <span v-if="!$v.userForm.password.MaxLength"
                            class="helper-text red-text" data-error="wrong" data-success="right">
                            Password should be at max of 12 characters long</span>
                    </div>
                </div>
                <!-- Confirm Password -->
                <div class="input-field col m6 s12">
                    <i class="material-icons prefix">lock_outline</i>
                    <input  v-model="userForm.confirmPassword" id="confirmPassword" name="confirmPassword" type="password" class="validate"
                        :class="{ 'is-invalid': isSubmitted && $v.userForm.confirmPassword.$error }">
                    <label for="confirmPassword">Confirm Password</label>
                    <div v-if="isSubmitted && $v.userForm.confirmPassword.$error">
                        <span v-if="!$v.userForm.confirmPassword.required"
                            class="helper-text red-text" data-error="wrong" data-success="right">
                            Confirm Password field is required</span>
                        <span v-else-if="!$v.userForm.confirmPassword.sameAsPassword"
                            class="helper-text red-text" data-error="wrong" data-success="right">
                            Passwords should be matched</span>
                    </div>
                </div>

                <div class="col s12"><button class="center-align btn-large teal">Submit</button></div>

            </div>
        </form>
   </div>
</div>
    
</template>



<script>
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
    data() {
        return {
            userForm: {
                name: "",
                uname: "",
                email: "",
                mobile: "",
                password: "",
                confirmPassword: "",
            },
            isSubmitted: false
        }
    },
    validations: {
        userForm: {
            name: {
                required,
                alpha
            },
            uname: {
                required,
                alphaNum
            },
            email: {
                required,
                email
            },
            mobile: {
                required,
                numeric
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(12)
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
            handleSubmit() {
                this.isSubmitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                alert("SUCCESS!" + JSON.stringify(this.userForm));
            }
        }
}
    

</script>




<style>
/* label color */
   .input-field label {
     color: #000;
   }
   /* label focus color */
   .input-field input[type=text]:focus + label {
     color: #000;
   }
   /* label underline focus color */
   .input-field input[type=text]:focus {
     border-bottom: 1px solid #000;
     box-shadow: 0 1px 0 0 #000;
   }
   /* valid color */
   .input-field input[type=text].valid {
     border-bottom: 1px solid #000;
     box-shadow: 0 1px 0 0 #000;
   }
   /* invalid color */
   .input-field input[type=text].invalid {
     border-bottom: 1px solid #000;
     box-shadow: 0 1px 0 0 #000;
   }
   /* icon prefix focus color */
   .input-field .prefix.active {
     color: #000;
   }
</style>