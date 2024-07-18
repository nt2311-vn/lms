<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { loginSchema } from '$lib/schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data;
	const form = superForm(data.form, { validators: zodClient(loginSchema) });

	const { form: formData, enhance, delayed } = form;
</script>

<div>
	<h1 class="py-5 text-center text-2xl font-semibold">Welcome</h1>
	<!-- form -->
	<form method="POST" use:enhance>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>
	</form>
</div>
