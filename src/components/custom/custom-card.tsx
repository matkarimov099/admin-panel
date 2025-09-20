import { cn } from '@/utils/utils.ts';

export const CustomCard = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				'group hover-lift mx-auto w-full max-w-sm rounded-lg border bg-card p-8 shadow-md saturate-[150%] backdrop-blur-[10px] transition-all duration-[var(--motion-medium)]',
				className
			)}
		>
			{children}
		</div>
	);
};

export const CustomCardTitle = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <h3 className={cn('py-2 font-semibold text-primary text-lg', className)}>{children}</h3>;
};

export const CustomCardDescription = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<p
			className={cn(
				'max-w-sm font-[var(--font-sans)] text-secondary text-sm leading-[1.35]',
				className
			)}
		>
			{children}
		</p>
	);
};

export const CustomCardSkeletonContainer = ({
	className,
	children,
	showGradient = true,
}: {
	className?: string;
	children: React.ReactNode;
	showGradient?: boolean;
}) => {
	return (
		<div
			className={cn(
				'z-40 h-[15rem] rounded-lg md:h-[20rem]',
				className,
				showGradient &&
					'bg-[var(--secondaryBackground)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]'
			)}
		>
			{children}
		</div>
	);
};
