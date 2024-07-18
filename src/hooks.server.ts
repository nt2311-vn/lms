import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, request, url } = event;

	locals.pb = new PocketBase('http://127.0.0.1:8090');

	// Load the store data from the request cookie string
	const cookie = request.headers.get('cookie');
	locals.pb.authStore.loadFromCookie(cookie || '');

	try {
		// Verify and refresh the loaded auth model (if any)
		if (locals.pb.authStore.isValid) {
			await locals.pb.collection('users').authRefresh();
			locals.user = locals.pb.authStore.model;
		}
	} catch (error) {
		// Clear the auth store on failed refresh
		console.error('Failed to refresh auth:', error);
		locals.pb.authStore.clear();
		locals.user = undefined;
	}
	if (
		url.pathname.startsWith('/') &&
		!locals.user &&
		!['/login', '/register'].includes(url.pathname)
	) {
		redirect(303, '/login');
	}
	const response = await resolve(event);

	// Send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', locals.pb.authStore.exportToCookie());

	return response;
};
