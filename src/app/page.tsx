import Image from 'next/image'
import { ContributionsCalendar } from '@/components/ContributionsCalendar'
import IconBadge from '@/components/ui/IconBadge'

export default function Home() {
	return (
		<section className="space-y-8">
			<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-6">
				<Image
					src="/avatar.jpeg"
					alt="FAN's avatar"
					width={416}
					height={416}
					className="size-32 rounded-full border-2 border-(--border-subtle) bg-(--surface-card)"
				/>
				<div className="space-y-1 text-left">
					<h1 className="text-4xl font-bold text-(--text-primary)">
						Hi, I&apos;m FAN 👋
					</h1>
					<p className="text-xl leading-relaxed text-(--text-secondary)">
						I&apos;m striving to be a great front-end developer...
					</p>
				</div>
			</div>

			<div className="space-y-4">
				<h2 className="text-2xl font-semibold text-(--text-primary)">
					Tech Stack
				</h2>
				<div className="flex flex-wrap gap-2 text-(--text-secondary)">
					<IconBadge variant="tech" icon="i-devicon-html5" text="HTML" />
					<IconBadge variant="tech" icon="i-devicon-css3" text="CSS" />
					<IconBadge variant="tech" icon="i-devicon-javascript" text="JavaScript" />
					<IconBadge variant="tech" icon="i-devicon-typescript" text="TypeScript" />
					<IconBadge variant="tech" icon="i-devicon-react" text="React" />
					<IconBadge variant="tech" icon="i-devicon-nextjs" text="Next.js" />
					<IconBadge variant="tech" icon="i-devicon-tailwindcss" text="TailwindCSS" />
					<IconBadge variant="tech" icon="i-devicon-vuejs" text="Vue" />
					<IconBadge variant="tech" icon="i-devicon-nuxt" text="Nuxt" />
					<IconBadge variant="tech" icon="i-devicon-vitejs" text="Vite" />
					<IconBadge variant="tech" icon="i-devicon-nodejs" text="Node" />
				</div>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold text-(--text-primary)">
					Get in Touch
				</h2>
				<div className="flex flex-wrap gap-3 text-(--text-secondary)">
					<IconBadge
						variant="social"
						icon="i-simple-icons-github"
						text="GitHub"
						href="https://github.com/iitsfan"
					/>
					<IconBadge
						variant="social"
						icon="i-simple-icons-bilibili"
						text="Bilibili"
						href="https://space.bilibili.com/11738804"
					/>
					<IconBadge
						variant="social"
						icon="i-simple-icons-steam"
						text="Steam"
						href="https://steamcommunity.com/profiles/76561198975984345"
					/>
					<IconBadge
						variant="social"
						icon="i-simple-icons-maildotru"
						text="Mail"
						href="mailto:i@itsfan.me"
					/>
				</div>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold text-(--text-primary)">
					Github Contributions
				</h2>
				<ContributionsCalendar username="iitsfan" />
			</div>
		</section>

	)
}
