<template>
	<div>
		<h1>Edit ID : {{ route.params.id }}</h1>
		<form @submit.prevent="handleSubmit">
			<input type="text" placeholder="Url을 입력하세요" v-model="url">
			<button type="submit">수정</button>
		</form>
	</div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import router from "../router";
import { useDatabaseStore } from "../store/database";

const databaseStore = useDatabaseStore();

const route = useRoute();

const url = ref('');

const handleSubmit = async () => {
	console.log("eidt");

	await databaseStore.updateUrl(route.params.id, url.value);
	router.push("/");
}

onMounted(async () => {
	url.value = await databaseStore.editGetUrl(route.params.id);
	console.log(url);
});

</script>