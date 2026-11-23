// A wrapping row of small grey "chips" (tech names, skills).

type ChipListProps = {
  items: string[];
  /** Show at most this many chips; the rest are summed up as "+N". */
  max?: number;
};

export function ChipList({ items, max }: ChipListProps) {
  const visible = max ? items.slice(0, max) : items;
  const hiddenCount = items.length - visible.length;

  return (
    <ul className="flex flex-wrap gap-2">
      {visible.map((item) => (
        <li key={item} className="rounded-md bg-surface px-2 py-1 text-xs text-muted">
          {item}
        </li>
      ))}
      {hiddenCount > 0 && (
        <li className="rounded-md px-2 py-1 text-xs text-muted">+{hiddenCount}</li>
      )}
    </ul>
  );
}
