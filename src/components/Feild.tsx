export default function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-on-surface">{label}</span>
      <input
        {...rest}
        required
        className="rounded-md border border-hairline bg-(--color-surface-container-lowest) px-4 py-3 text-[14px] text-on-surface outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
