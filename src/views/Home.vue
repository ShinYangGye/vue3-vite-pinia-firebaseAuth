<template>
	<div>
		<h1>Home</h1>

		<form @submit.prevent="handleSubmit">
			<input type="text" placeholder="Url을 입력하세요" v-model="url">
			<button type="submit">등록</button>
		</form>

		<p>{{ userStore.userData?.email }}</p>
		<p v-if="databaseStore.loadingDoc">loading docs...</p>
		<ul v-else>
			<li v-for="item of databaseStore.documents" :key="item.id">
				<p>ID : {{ item.id }}</p>
				<p>NAME : {{ item.name }}</p>
				<p>SHORT : {{ item.short }}</p>
				<button type="button" @click="databaseStore.deleteUrl(item.id)">삭제</button>
				<button type="button" @click="router.push(`/edit/${item.id}`)">수정</button>
				<hr>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useDatabaseStore } from "../store/database";
	import { useUserStore } from "../store/user";
	
	const userStore = useUserStore();
	const databaseStore = useDatabaseStore();
	const router = useRouter();

	databaseStore.getUrls();

	const url = ref('');
	const handleSubmit = () => {
		console.log('handleSubmit');
		databaseStore.addUrl(url.value);
	}

</script>
