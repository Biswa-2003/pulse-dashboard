export default function Shimmer({ className }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-zinc-800/30 rounded ${className}`}>
            <div className="absolute inset-0 animate-shimmer" />
        </div>
    );
}
