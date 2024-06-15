import type { RolesRecord } from '$lib/models/pocketbase-types';

const isRole = (roleTarget: string, listRole: RolesRecord[]) => {
	for (const role of listRole) {
		if (role.name === roleTarget) {
			return true;
		}
	}
	return false;
};

export default isRole;
