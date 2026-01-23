import React from "react";

type Props = {
	name?: string | null;
	src?: string | null;
	size?: number;
	className?: string;
};

const COLORS = [
	"bg-yellow-500",
	"bg-green-500",
	"bg-indigo-500",
	"bg-pink-500",
	"bg-amber-500",
	"bg-rose-500",
	"bg-sky-500",
];

function initials(name?: string | null) {
	if (!name) return "";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorFor(name?: string | null) {
	if (!name) return COLORS[0];
	let h = 0;
	for (let i = 0; i < name.length; i++) h = (h << 5) - h + name.charCodeAt(i);
	const idx = Math.abs(h) % COLORS.length;
	return COLORS[idx];
}

export default function Avatar({
	name,
	src,
	size = 80,
	className = "",
}: Props) {
	const s = `${size}px`;
	if (src) {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={src}
				alt={name || "avatar"}
				width={size}
				height={size}
				className={`rounded-full object-cover ${className}`}
				style={{ width: s, height: s }}
			/>
		);
	}

	const bg = colorFor(name);
	const text = initials(name) || "?";

	return (
		<div
			className={`rounded-full flex items-center justify-center text-white font-semibold ${bg} ${className}`}
			style={{ width: s, height: s }}
			aria-hidden
		>
			<span>{text}</span>
		</div>
	);
}
