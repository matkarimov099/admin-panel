import type {
	User,
	UserCreate,
	UserCreateResponse,
	UserFilter,
	UserUpdate,
} from '@/features/users/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';
import { mockUsers } from '@/features/users/data/mock-users.ts';

export async function createUser(data: UserCreate): Promise<UserCreateResponse> {
	const response = await axiosClient.post<
		UserCreateResponse,
		AxiosResponse<UserCreateResponse, ServerError>
	>('/users', data);
	return response.data;
}

export async function updateUser(id: string, data: UserUpdate) {
	return await axiosClient.put(`/users/${id}`, data);
}

export async function getUsers(filter: UserFilter) {
	// Comment out API call and use mock data instead
	// return await axiosClient.post<PaginatedResponse<User>>('/users', filter);

	// Simulate API delay
	await new Promise(resolve => setTimeout(resolve, 500));

	let filteredUsers = [...mockUsers];

	// Apply search filter
	if (filter.search) {
		const searchTerm = filter.search.toLowerCase();
		filteredUsers = filteredUsers.filter(user =>
			user.name.toLowerCase().includes(searchTerm) ||
			user.email.toLowerCase().includes(searchTerm) ||
			user.phone.includes(searchTerm)
		);
	}

	// Apply sorting
	if (filter.sort_by) {
		filteredUsers.sort((a, b) => {
			const aValue = a[filter.sort_by as keyof User];
			const bValue = b[filter.sort_by as keyof User];

			if (filter.sort_order === 'desc') {
				return bValue > aValue ? 1 : -1;
			}
			return aValue > bValue ? 1 : -1;
		});
	}

	// Apply pagination
	const page = filter.page || 1;
	const per_page = filter.per_page || 10;
	const startIndex = (page - 1) * per_page;
	const endIndex = startIndex + per_page;
	const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

	// Return mock response matching API structure
	return {
		data: {
			data: paginatedUsers,
			current_page: page,
			per_page: per_page,
			total: filteredUsers.length,
			last_page: Math.ceil(filteredUsers.length / per_page)
		}
	};
}

export async function deleteUser(id: string) {
	return await axiosClient.delete(`/users/${id}`);
}

export async function bulkDeleteUsers(ids: (string | number)[]) {
	return await axiosClient.post('/users/bulk-delete', {
		ids: ids.map(id => String(id)),
	});
}

export async function fetchUsersData(filter: UserFilter) {
	const response = await getUsers(filter);
	return response.data;
}
