import type { LayoutServerLoad } from './$types';
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
		const roles: RecordModel[] | null = user.expand.role;
		if (!roles) {
			throw new Error();
		}
		const isUser = isRole(Roles.USER, roles);
		const isManager = isRole(Roles.MANAGER, roles);
		const isPlayer = isRole(Roles.PLAYER, roles);

		const getTeam = async (): Promise<RecordModel | null> => {
			try {
				switch (true) {
					case isManager:
						return await locals.pb.collection('teams').getFirstListItem(`manager="${userId}"`, {
							fields: '*,expand.manager.last_name,expand.manager.first_name,expand.sport.name',
							expand: 'sport,manager'
						});
					case isPlayer:
						return await locals.pb
							.collection('teams')
							.getFirstListItem(`players.user_link?="${userId}"`, {
								expand: 'sport,manager',
								fields: '*,expand.manager.last_name,expand.manager.first_name,expand.sport.name'
							});
					case isUser:
						return null;
					default:
						return null;
				}
			} catch (error) {
				console.log('error', error);
				return null;
			}
		};

		const getNextEvent = async (): Promise<RecordModel[] | null> => {
			try {
				const list = await locals.pb.collection('events').getList(1, 3, {
					expand: 'type',
					fields: '*,expand.type.name',
					filter: 'date_start>@now'
				});
				return list.items.length > 0 ? list.items : null;
			} catch (err) {
				// console.error('Error: ', err);
				return null;
			}
		};

		const getPlayers = async (): Promise<RecordModel[] | null> => {
			try {
				const list = await locals.pb.collection('players').getList(1, 3, {
					fields: '*,expand.position.name',
					expand: 'position',
					sort: '-created'
				});
				return list.items.length > 0 ? list.items : null;
			} catch (error) {
				return null;
			}
		};

		const getMatchHistory = async (): Promise<RecordModel[] | null> => {
			try {
				const list = await locals.pb.collection('match_history').getList(1, 3, {
					fields: '*,expand.team_opponent.name',
					expand: 'team_opponent'
				});
				return list.items.length > 0 ? list.items : null;
			} catch (error) {
				return null;
			}
		};

		return {
			isConnected: !!user,
			isPlayer: isPlayer,
			isManager: isManager,
			nextEvent: await getNextEvent(),
			team: await getTeam(),
			newPlayers: await getPlayers(),
			matchHistory: await getMatchHistory()
		};
	} catch (error) {
		return {
			team: null,
			isPlayer: false,
			isManager: false,
			isConnected: false,
			nextEvent: null,
			players: null,
			matchHistory: null
		};
	}
};
