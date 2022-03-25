import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import router from "../router";

export const useDatabaseStore = defineStore('database', {
	state: () => ({
		documents: [],
		loadingDoc: false,
	}),

	actions: {
		async getUrls() {
			if(this.documents.length !== 0) {
				return;
			}

			this.loadingDoc = true;
			try {
				const q = query(
					collection(db, 'urls')
					, where("user", "==", auth.currentUser.uid)
				);
				const querySnapshop = await getDocs(q);
				
				querySnapshop.forEach(doc => {
					console.log(doc.id, doc.data());
					this.documents.push({
						id: doc.id,
						...doc.data(),
					});
				});
			
			} catch (error) {
				console.log(error);
			} finally {
				this.loadingDoc = false;
			}
		},

		async addUrl(name) {
			try {
				const objectDoc = {
					name: name,
					short: nanoid(6),
					user: auth.currentUser.uid,
				};
				const docRef = await addDoc(collection(db, "urls"), objectDoc);
				this.documents.push({
					...objectDoc,
					id: docRef.id,
				});

			} catch (error) {
				console.log(error);
			} finally {

			}
		},

		async deleteUrl(id) {
			try {
				const docRef = doc(db, 'urls', id);
				const docSnap = await getDoc(docRef);
				
				if(!docSnap.exists()){
					throw new Error('데이타가 존재하지 않습니다.');
				}

				if (docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('데이타에 대한 권한이 없습니다.');
				}
			
				await deleteDoc(docRef);
				this.documents = this.documents.filter(item => item.id !== id);
			} catch (error) {
				console.log(error);
			} finally {

			}
		},

		async editGetUrl(id) {
			try {
				const docRef = doc(db, 'urls', id);
				const docSnap = await getDoc(docRef);

				if(!docSnap.exists()){
					throw new Error('데이타가 존재하지 않습니다.');
				}

				if (docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('데이타에 대한 권한이 없습니다.');
				}

				return docSnap.data().name;
			} catch (error) {
				console.log(error.message);
			} finally {

			}
		},

		async updateUrl(id, name) {
			try {
				const docRef = doc(db, 'urls', id);
				const docSnap = await getDoc(docRef);

				if(!docSnap.exists()){
					throw new Error('데이타가 존재하지 않습니다.');
				}

				if (docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('데이타에 대한 권한이 없습니다.');
				}

				await updateDoc(docRef, {name: name});
				this.documents = this.documents.map(item => item.id === id ? ({...item, name: name}) : item);
			} catch (error) {
				console.log(error.message);
			} finally {
				
			}
		}
	}
});