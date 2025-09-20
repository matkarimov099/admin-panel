import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useTheme } from '@/hooks/use-theme.ts';
import { cn } from '@/utils/utils';
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

const themeOptions = [
	{
		value: 'light',
		label: "Yorug'",
		description: 'Toza va yorqin',
		icon: SunIcon,
		iconColor: 'text-amber-800 dark:text-amber-400',
	},
	{
		value: 'dark',
		label: "Qorong'i",
		description: "Ko'zga qulay",
		icon: MoonIcon,
		iconColor: 'text-slate-600 dark:text-slate-400',
	},
	{
		value: 'system',
		label: 'Tizim',
		description: 'Qurilmaga moslashadi',
		icon: MonitorIcon,
		iconColor: 'text-blue-600 dark:text-blue-400',
	},
];

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	// Actual theme'ni aniqlash
	const currentTheme = themeOptions.find(option => option.value === theme);
	const CurrentIcon = currentTheme?.icon || SunIcon;

	return (
		<div className="relative">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="group relative mr-2 h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-colors duration-200 hover:border-[var(--system-blue)]/30 hover:bg-muted/50"
					>
						<div className="relative flex h-full w-full items-center justify-center">
							{/* Icon with rotation animation */}
							<CurrentIcon
								className={cn(
									'!h-5 !w-5 transition-transform duration-200 group-hover:scale-110',
									currentTheme?.iconColor,
									theme === 'system' && 'animate-pulse'
								)}
							/>
						</div>
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-64">
					{themeOptions.map(option => {
						const Icon = option.icon;
						const isSelected = theme === option.value;

						return (
							<DropdownMenuItem
								key={option.value}
								onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
								className={cn(
									'group relative mx-1 my-0.5 flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3 transition-colors duration-200 hover:bg-muted/80',
									isSelected && 'bg-[var(--system-blue)]/10 text-foreground'
								)}
							>
								<div className="flex flex-1 items-center gap-3">
									<div className="relative flex items-center justify-center overflow-hidden">
										{/* Theme preview background */}
										<Icon className={cn('relative !h-5 !w-5', option.iconColor)} />
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-sm">{option.label}</span>
										<span className="text-muted-foreground text-xs">{option.description}</span>
									</div>
								</div>
								{isSelected && (
									<div className="flex items-center gap-1">
										<CheckIcon className="h-4 w-4" />
									</div>
								)}
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
