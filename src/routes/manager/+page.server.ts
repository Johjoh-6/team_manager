import { Roles } from '$lib/enum/rolesEnum';
import isRole from '$lib/utils/isRole';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';



export const load = (async ({ locals, url, parent }) => {
    try {
        const {team} = await parent();
        if(!team){
            throw new Error('Team not found');
        }
        if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
            throw new Error('Forbidden');
        }
        const page = Number(url.searchParams.get('page')) || 1;
        const perPage = Number(url.searchParams.get('perPage')) || 10;
        const search = url.searchParams.get('search') || '';


        let filterString = "teamID={:team} && created>{:sevenDaysAgo}"
        if (search) {
            filterString += `&& (playerID.first_name~"${search}" || playerID.last_name~"${search}")`;
        }
        const option: Record<string, string> = {
           expand: 'playerID',
            fields: '*,expand.playerID.last_name,expand.playerID.first_name',
            filter: locals.pb.filter(filterString, {
                team: team.id,
                sevenDaysAgo: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            })
        };
        const claims =  await locals.pb.collection('claim_requests').getList(page, perPage, option);
        console.log('claims', claims);
        return {
            claims: claims.items,
            totalPages: claims.totalPages,
            currentPage: claims.page,
            totalItems: claims.totalItems,
            perPage: claims.perPage
        };
    } catch (_) {
        redirect(303, '/');
    }
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const idClaim = form.get('id') as string;
        const status = form.get('status') as string;

        console.log('claim players id', idClaim);
        console.log('claim players status', status);

        const listOfStatus = ['approved', 'rejected', 'pending'];
        
        if (!idClaim || typeof idClaim !== 'string') {
            error(400, 'Bad Request');
        }
        if(!status || typeof status !== 'string'){
            error(400, 'Bad Request');
        }
        if(!listOfStatus.includes(status)){
            error(400, 'Bad Request');
        }

        console.log('claim players id', idClaim);
        if(!idClaim || typeof idClaim !== 'string'){
            error(400, 'Bad Request');
        }
		if (!locals.pb.authStore.isValid) {
			error(401, 'Unauthorized');
		}
		if(!isRole(Roles.MANAGER, locals.user?.expand.role)){
			error(403, 'Forbidden');
		}
		try{
			const update = await locals.pb.collection('claim_requests').update(idClaim, {
                status: status
            });
            console.log('update', update);
            if(update.status === 'approved'){
                const player = await locals.pb.collection('players').update(update.playerID, {
                 claimed: true,
                 user_link: update.userID
                });
                if(player){
                    return { update : true}
                }
                return {
                    error: true
                }
            }

            if(update){
				return { update : true}
			}
			return {
				error: true
			}
		} catch (err) {
			console.error(err);
			error(500, 'Internal Server Error');
		}
    }
}