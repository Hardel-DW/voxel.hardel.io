export default function Gallery({ grid = 2, children }: { grid?: number; children?: React.ReactNode }) {
    return (
        <div style={{ gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))` }} className="grid gap-4 mt-4 *:m-0">
            {children}
        </div>
    );
}