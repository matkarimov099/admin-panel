import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateUser } from '@/features/users/hooks/use-users';
import { type UserCreateSchema, userCreateSchema } from '@/features/users/schema/users.schema.ts';
import type { UserCreate } from '@/features/users/types';
import { useI18n } from '@/hooks/use-i18n.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddUserProps {
	className?: string;
}

export function AddUser({ className }: AddUserProps = {}) {
	const { t } = useI18n('users');
	const [open, setOpen] = useState(false);

	const form = useForm<UserCreateSchema>({
		resolver: zodResolver(userCreateSchema(t)),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			age: 18,
		},
	});

	const createMutation = useCreateUser();

	const onSubmit = async (data: UserCreate) => {
		try {
			await createMutation.mutateAsync(data);

			// Show a success message
			toast.success(`User "${data.name}" created successfully`);

			// Reset form and close the dialog
			form.reset();
			setOpen(false);
		} catch (error) {
			console.error('Create user failed:', error);
			toast.error('Failed to create user. Please try again.');
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button leftIcon={<PlusIcon className="mr-2 h-4 w-4" />} size="default" className={className}>
					Add User
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-7xl sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Add New User</DialogTitle>
					<DialogDescription>
						Create a new user account. Fill in the required information below.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Full Name</FormLabel>
									<FormControl>
										<Input inputSize="md" placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input type="email" placeholder="john.doe@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input type="tel" placeholder="+1234567890" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="age"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Age</FormLabel>
									<FormControl>
										<Input type="number" min="16" max="120" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={createMutation.isPending}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={createMutation.isPending}>
								{createMutation.isPending ? 'Creating...' : 'Create User'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
