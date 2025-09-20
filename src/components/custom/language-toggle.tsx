import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useI18n } from '@/hooks/use-i18n';
import type { Locale } from '@/lib/i18n';
import { addLocaleToPath, removeLocaleFromPath } from '@/plugins/i18n-routing.ts';
import { cn } from '@/utils/utils';
import { CheckIcon, GlobeIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import enFlag from '@/assets/flags/en.svg';
import ruFlag from '@/assets/flags/ru.svg';
// Flag images
import uzFlag from '@/assets/flags/uz.svg';

const languageOptions = [
	{
		code: 'uz' as Locale,
		name: "O'zbekcha",
		description: "O'zbek tili",
		flag: uzFlag,
	},
	{
		code: 'ru' as Locale,
		name: 'Русский',
		description: 'Русский язык',
		flag: ruFlag,
	},
	{
		code: 'en' as Locale,
		name: 'English',
		description: 'English language',
		flag: enFlag,
	},
];

export function LanguageToggle() {
	const { locale, setLocale } = useI18n();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLanguageChange = (newLocale: Locale) => {
		setLocale(newLocale);

		// Update URL with a new locale
		const currentPathWithoutLocale = removeLocaleFromPath(location.pathname);
		const newPath = addLocaleToPath(currentPathWithoutLocale, newLocale);
		navigate(newPath, { replace: true });
	};

	const currentLanguage = languageOptions.find(lang => lang.code === locale);

	return (
		<div className="relative">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="group relative mr-2 h-9 w-9 overflow-hidden p-0 transition-colors duration-200"
					>
						<div className="relative flex h-full w-full items-center justify-center">
							{/* Flag or Globe icon */}
							{currentLanguage ? (
								<img
									src={currentLanguage.flag}
									alt={currentLanguage.name}
									className="h-6 w-6 transition-all duration-300 group-hover:scale-110"
								/>
							) : (
								<GlobeIcon className="h-6 w-6 transition-all duration-300 group-hover:scale-110" />
							)}
						</div>
						<span className="sr-only">Change language</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-64">
					{languageOptions.map(option => {
						const isSelected = locale === option.code;

						return (
							<DropdownMenuItem
								key={option.code}
								onClick={() => handleLanguageChange(option.code)}
								className={cn(
									'group relative mx-1 my-0.5 flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors duration-200 hover:bg-muted/80',
									isSelected && 'bg-[var(--system-blue)]/10 text-foreground'
								)}
							>
								<div className="flex flex-1 items-center gap-3">
									<div className="relative flex items-center justify-center overflow-hidden">
										<img src={option.flag} alt={option.name} className="relative z-10 h-7 w-7" />
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-sm">{option.name}</span>
										<span className="text-muted-foreground text-xs">{option.description}</span>
									</div>
								</div>
								{isSelected && (
									<div className="flex items-center gap-1">
										<CheckIcon className="h-6 w-6" />
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
