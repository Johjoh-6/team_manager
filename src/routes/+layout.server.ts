import type { LayoutServerLoad } from './$types';
import type { RolesRecord } from '$lib/models/pocketbase-types';
import type { RecordModel } from 'pocketbase';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';

export const load: LayoutServerLoad = async ({ locals }) => {
	try {
	if (!locals.user) {
		throw new Error();
	}
	if (!locals.pb.authStore.isValid) {
		throw new Error();
	}

	const user = locals.user;
	const userId: string = user.id;
	const roles: RolesRecord[] | null = user.expand.role;
	if (!roles) {
		throw new Error();
	}
	const isUser = isRole(Roles.USER, roles);
	const isManager = isRole(Roles.MANAGER, roles);
	const isPlayer = isRole(Roles.PLAYER, roles);

	const getTeam = async (): Promise<RecordModel | null> => {
		switch (true) {
		  case isManager:
			return await locals.pb.collection('teams').getFirstListItem(`manager="${userId}"`, {
			  fields: '*,expand.manager.last_name,expand.manager.first_name,expand.players.*,expand.sport.name',
			  expand: 'sport,manager,players',
			});
		  case isPlayer:
			return await locals.pb.collection('teams').getFirstListItem(`players?="${userId}"`, {
			  expand: 'sport,manager,players',
			  fields: '*,expand.manager.last_name,expand.manager.first_name,expand.players.*,expand.sport.name',
			});
		  case isUser:
			return null;
		  default:
			return null;
		}
	  };

	return {
		isConnected: !!user,
		isPlayer: isPlayer,
		isManager: isManager,
		team: await getTeam()
	};
} catch (error) {
	console.info('error return');
	return {
		team: null,
		isPlayer: false,
		isManager: false,
		isConnected: false
	};	
}
};

