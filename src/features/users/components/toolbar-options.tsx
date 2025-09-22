import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

import { CalendarDatePicker } from '@/components/custom/calendar-date-picker.tsx';
import { DatePicker } from '@/components/custom/date-picker.tsx';
import { AddUser } from '@/features/users/components/actions/AddUser.tsx';
import { BulkDeleteUser } from '@/features/users/components/actions/BulkDeleteUser.tsx';

interface ToolbarOptionsProps {
	// Current page selected users with name data
	selectedUsers: { id: string; name: string }[];
	// All selected user IDs across all pages (for operations that only need IDs)
	allSelectedUserIds?: (string | number)[];
	// Total count of selected items across all pages
	totalSelectedCount: number;
	resetSelection: () => void;
}

const ToolbarOptions = ({
	selectedUsers,
	allSelectedUserIds = [],
	totalSelectedCount,
	resetSelection,
}: ToolbarOptionsProps) => {
	const { t } = useTranslation();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [dateRange, setDateRange] = useState<DateRange>({
		from: undefined,
		to: undefined,
	});
	const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());

	// Use total selected count if available, otherwise fall back to the current page selection
	const selectionCount = totalSelectedCount || selectedUsers.length;

	// Determine which IDs to use for operations - prefer all selected IDs if available
	const selectedIds =
		allSelectedUserIds.length > 0 ? allSelectedUserIds : selectedUsers.map(user => user.id);

	return (
		<>
			{/* Desktop layout */}
			<div className="hidden lg:flex lg:items-center lg:gap-2">
				<AddUser />
				<CalendarDatePicker
					date={dateRange}
					onDateSelect={range => {
						console.log('Selected date range:', range);
						if (range.from && range.to) {
							setDateRange(range as DateRange);
						} else {
							// Clear selection
							setDateRange({ from: undefined, to: undefined });
						}
					}}
					placeholder={t('calendar.selectDateRange', 'Select date range')}
					variant="outline"
				/>
				<DatePicker
					date={singleDate}
					onDateSelect={date => {
						console.log('Selected single date:', date);
						setSingleDate(date);
					}}
					placeholder={t('calendar.selectDate', 'Select date')}
					variant="outline"
				/>
				{selectionCount > 0 && (
					<Button variant="outline" size="default" onClick={() => setDeleteDialogOpen(true)}>
						<TrashIcon className="mr-2 size-4" aria-hidden="true" />
						Delete ({selectionCount})
					</Button>
				)}
			</div>

			{/* Mobile layout - Full width below main toolbar controls */}
			<div className="flex flex-col gap-2 lg:hidden">
				<AddUser className="w-full" />
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<CalendarDatePicker
						date={dateRange}
						onDateSelect={range => {
							console.log('Selected date range:', range);
							if (range.from && range.to) {
								setDateRange(range as DateRange);
							} else {
								// Clear selection
								setDateRange({ from: undefined, to: undefined });
							}
						}}
						placeholder={t('calendar.selectDateRange', 'Select date range')}
						variant="outline"
						className="w-full"
					/>
					<DatePicker
						date={singleDate}
						onDateSelect={date => {
							console.log('Selected single date:', date);
							setSingleDate(date);
						}}
						placeholder={t('calendar.selectDate', 'Select date')}
						variant="outline"
						className="w-full"
					/>
				</div>
				{selectionCount > 0 && (
					<Button
						variant="outline"
						size="default"
						onClick={() => setDeleteDialogOpen(true)}
						className="w-full"
					>
						<TrashIcon className="mr-2 size-4" aria-hidden="true" />
						Delete ({selectionCount})
					</Button>
				)}
			</div>

			{selectionCount > 0 && (
				<BulkDeleteUser
					open={deleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					selectedUsers={selectedUsers}
					allSelectedIds={selectedIds}
					totalSelectedCount={selectionCount}
					resetSelection={resetSelection}
				/>
			)}
		</>
	);
};

export default ToolbarOptions;
