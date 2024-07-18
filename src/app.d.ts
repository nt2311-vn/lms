// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase, { type AuthModel } from 'pocketbase';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			pb: PocketBase;
			user: AuthModel | undefined;
		}
	}
}

export {};
