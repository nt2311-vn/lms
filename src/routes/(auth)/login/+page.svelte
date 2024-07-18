<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from 'postcss/lib/input';
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
	</form>
</div>
