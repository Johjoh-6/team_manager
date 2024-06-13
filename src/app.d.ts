// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { AuthSystemFields, TypedPocketBase, UsersRecord } from '$lib/models/pocketbase-types';

declare namespace App {
	interface Locals {
		pb: TypedPocketBase;
		user: AuthSystemFields<UsersRecord> | undefined;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
