<template>
	<div>
		<h1>Register</h1>
		<form @submit.prevent="handleSubmit">
			<input type="email" placeholder="이메일을 입력하세요." v-model.trim="email">
			<input type="password" placeholder="패스워드를 입력하세요" v-model.trim="password">
			<button type="submit" :disabled="userStore.loadingUser">회원가입</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
// import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

	const userStore = useUserStore();
	// const router = useRouter();

	const email = ref('');
	const password = ref('');

	const handleSubmit = async () => {

		if(!email.value || password.value.length < 6) {
			return alert('이메일과 패스워드를 입력하세요.');
		}
		
		await userStore.registerUser(email.value, password.value);
		// router.push({name: "home"});
		
	}

</script>