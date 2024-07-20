import PocketBase, { ClientResponseError } from 'pocketbase';
import { loginSchema } from '@/schema';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(loginSchema)) };
};

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { pb }
		}: { locals: { pb: PocketBase } } = event;
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await pb.collection('users').authWithPassword(form.data.email, form.data.password);
		} catch (err) {
			const status = err as ClientResponseError;

			return message(form, { status, message: `Error occured ${err}` });
		}

		redirect(303, '/');
	}
};
