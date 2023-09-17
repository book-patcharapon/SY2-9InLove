<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import { createUser, updateUser, getUserDetailForUpdate } from "../composable/doUser.js";
import { changeDateTimeFormat } from "../composable/changeDateTimeFormat.js";

const { params } = useRoute();
const user = ref({});
const username = ref();
const name = ref();
const email = ref();
const role = ref();
const edited = ref(true);
const haveInfo = ref(false);
const checkuser = ref({});
const checkpass = ref();

const changeddata = () => {
    if (JSON.stringify(checkuser.value) === JSON.stringify(user.value)) {
        edited.value = true;
    } else {
        edited.value = false;
    }
    console.log(user.value);
}

// check password and re-password
const checkpassword = () => {
    if (JSON.stringify(checkpass.value) === JSON.stringify(user.value.password)) {
        return "password match"
    } else {
        return "password not match"
    }

};
onBeforeMount(async () => {
    if (params.id) {
        haveInfo.value = true
        // Edit mode
        user.value = await getUserDetailForUpdate(params.id)
        checkuser.value = Object.assign({}, user.value)
        if (user.value) {
            haveInfo.value = true

        }
        // watch(
        //     [user,username,name,email,role],
        //     async () => {
        //         edited.value = true;
        //     },
        //     { deep: true }
        // )
    } else {
        // Add mode
        haveInfo.value = true;
        // Default value
        user.value = {
            username: "",
            password: "",
            name: "",
            email: "",
            role: "announcer",
        };
    }
});

const addEditUser = (user) => {
    if (params.id) {
        updateUser(params.id, user) //update to backend
    } else {
        createUser(user); //add to backend
    }
}

function checkPasswordStrength(password) {
  // Check for an uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check for a lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // Check for a number
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }

  // Check for a special character
  if (!/[!/@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // Check password length (between 8 and 12 characters)
  if (password.length < 8 || password.length > 12) {
    return "Password must be between 8 and 12 characters in length.";
  }

  // If all conditions are met
  return "Password meets all the criteria.";
}

</script>
 
<template>
    <div class="w-full flex">
        <!-- <div class="w-1/6">
            <Nav>

            </Nav>
            class="w-5/6"
        </div> -->
        <div class="w-full">
            <div v-if="haveInfo">
                <h1 v-if="params.id" class="text-4xl font-bold flex justify-center">User Detail:</h1>
                <h1 v-else class="text-4xl font-bold flex justify-center">User Detail:</h1>
                <div class="middle">
                    <p class="font-bold text-2xl">Username</p>
                    <input type="text" id="title" v-model="user.username" v-on:input="changeddata"
                        class="ann-username w-full" placeholder="" :maxlength="45" /><br />
                    <!-- pass -->
                    <p v-if="!params.id" class="font-bold text-2xl" >Password</p><span v-if="!params.id" class="red">{{ checkPasswordStrength(user.password) }}</span>
                    <input v-if="!params.id" type="password" id="password" v-model="user.password" v-on:input="checkPasswordStrength(user.password)" class="ann-password w-full" placeholder=""
                        :maxlength="100" /><br v-if="!params.id"/>
                    <p v-if="!params.id" class="font-bold text-2xl">Confirm password</p><span v-if="checkpass" class="red">{{ checkpassword() }}</span>
                    <input v-if="!params.id" required type="password" id="confirmpassword" v-model="checkpass" v-on:input="checkpassword" class="ann-confirm-password w-full"
                        placeholder="" :maxlength="100" /><br v-if="!params.id"/>
                    <!-- pass -->
                    <p class="font-bold text-2xl">Name</p>
                    <input type="text" id="name" v-model="user.name" v-on:input="changeddata" class="ann-name w-full"
                        placeholder="" :maxlength="100" />
                    <p class="font-bold text-2xl">Email</p>
                    <input type="text" id="email" v-model.trim="user.email" v-on:input="changeddata"
                        class="ann-email w-full" placeholder="" :maxlength="150" />
                    <p>Role</p>
                    <select v-model.trim="user.role" v-on:change="changeddata" class="ann-role">
                        <option id="announcer" value='announcer'>announcer</option>
                        <option id="admin" value='admin'>admin</option>
                    </select><br />
                    <div v-if="params.id">
                        <b class="ann-created-on">Created On {{ changeDateTimeFormat(user.createdOn) }}</b>&nbsp;&nbsp;
                        <b class="ann-updated-on">Updated On {{ changeDateTimeFormat(user.updatedOn) }}</b>
                    </div>

                    <!-- <button @click="addEditNewAnnouncement(newAnn)" v-if="!params.id" class="ann-button">
                        Submit
                    </button> -->
                    <!-- :disabled="!edited" -->
                    <button @click="addEditUser(user)" class="ann-button" :disabled="edited">
                        Save
                    </button>

                    <button @click="$router.push('/admin/User')" class="ann-button">
                        Cancel
                    </button>
                </div>
            </div>

            <div v-else>
                <h1>The request page is not available</h1>
            </div>
        </div>
    </div>
</template>
 
<style scoped>
select,
textarea,
input {
    border: 1px solid black;
    margin: 0.5%;
    border-radius: 5px;
}

p {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
}

button {
    border: 2px solid black;
    background-color: lightgrey;
    font-weight: bold;
    padding: 8px;
    margin-top: 10px;
    margin-right: 5px;
    border-radius: 5px;
}

button:enabled:hover {
    background-color: black;
    color: white;
}

.middle {
    margin: 1% 20%;
    padding: 1%;
    border: 3px solid black;
    border-radius: 8px;
}
.red{
    color: red;
}
</style>