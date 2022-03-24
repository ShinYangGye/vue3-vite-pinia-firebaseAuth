import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        userData: null,
		loadingUser: false,
		loadingSession: false,
    }),

	actions: {
		async registerUser(email, password) {
			this.loadingUser = true;
			try {
				const { user } = await createUserWithEmailAndPassword(auth, email, password);
				//console.log(user);
				this.userData = {email: user.email, uid: user.uid};
				router.push({name: "home"});
			} catch (error) {
				console.log(error);
			} finally {
				this.loadingUser = false;
			}
		},

		async loginUser(email, password) {
			this.loadingUser = true;
			try {
				const { user } = await signInWithEmailAndPassword(auth, email, password);
				this.userData = {email: user.email, uid: user.uid};
				router.push({name: "home"});
			} catch (error) {
				console.log(error);
			} finally {
				this.loadingUser = false;
			}
		},

		async logoutUser() {
			try {
				await signOut(auth);
				this.userData = null;
				router.push({name: "login"});
			} catch (error) {
				console.log(error);
			}
		},

		async currentUser() {
			return new Promise((resolve, reject) => {
				const unsuscribe = onAuthStateChanged(auth, user => {
					if (user) {
						this.userData = {email: user.email, uid: user.uid};
					} else {
						this.userData = null;
					}
					resolve(user);
				}, e => reject(e));
				unsuscribe();
			});
		}
	}
});