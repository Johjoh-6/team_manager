// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { AuthModel } from 'pocketbase';
import type PocketBase from 'pocketbase';
export declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// pb: TypedPocketBase;
			pb: PocketBase;
			user: AuthModel | undefined;
		}
		interface PageData {
			isConnected: boolean;
		}
		// interface PageState {}
		// interface Platform {}
	}
}
