import type { LayoutServerLoad } from './$types';
import type { RolesRecord } from '$lib/models/pocketbase-types';
import type { RecordModel } from 'pocketbase';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return {
			team: null,
			isPlayer: false,
			isManager: false,
			isConnected: false
		};
	}
	if (!locals.pb.authStore.isValid) {
		return {
			team: null,
			isPlayer: false,
			isManager: false,
			isConnected: false
		};
	}

	const user = locals.user;
	const userId: string = user.id;
	const roles: RolesRecord[] | null = user.expand.role;
	if (!roles) {
		return {
			team: null,
			isPlayer: false,
			isManager: false,
			isConnected: false
		};
	}

	const isUser = isRole(Roles.USER, roles);
	const isManager = isRole(Roles.MANAGER, roles);
	const isPlayer = isRole(Roles.PLAYER, roles);

	const getTeam = async (): Promise<RecordModel | null> => {
		if (isManager) {
			const teams = await locals.pb.collection('teams').getFirstListItem(`manager="${userId}"`, {
				fields:
					'*,expand.manager.last_name,expand.manager.first_name,expand.players.*,expand.sport.name',
				expand: 'sport,manager,players'
			});
			return teams;
		}
		if (isPlayer) {
			const teams = await locals.pb.collection('teams').getFirstListItem(`players?="${userId}"`, {
				expand: 'sport,manager,players',
				fields:
					'*,expand.manager.last_name,expand.manager.first_name,expand.players.*,expand.sport.name'
			});
			return teams;
		}
		if (isUser) {
			return null;
		}
		return null;
	};

	return {
		isConnected: !!user,
		isPlayer: isPlayer,
		isManager: isManager,
		team: await getTeam()
	};
};
