interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string
}

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const secondaryButton = 'font-inter uppercase rounded-lg px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide hover:bg-opacityLight-5 ';
const greenButton = 'font-inter uppercase rounded-lg px-4 py-2 text-sm text-neutal-500 border border-neutral-500 tracking-wide bg-greenish-500 hover:brightness-110 ';

export function LinkSecondary({ href, children, className }: LinkButtonProps) {
    return <a href={href} target="_blank" className={secondaryButton + className} rel="noreferrer">{children}</a>;
}

export default function SecondaryButton({ children, className, onClick }: ButtonProps) {
    return <button className={secondaryButton + className} onClick={onClick}>{children}</button>;
}

export function MapButton({ children, className, onClick }: ButtonProps) {
    return <button className={`font-inter rounded-lg text-neutral-50 py-2 px-4 text-center focus:outline-none border border-neutral-500 bg-opacityDark-70 hover:bg-opacityDark-60 ` + className} onClick={onClick}>{children}</button>;
}

export function GreenButton({ children, className, onClick, disabled }: ButtonProps) {
    return <button disabled={disabled} className={greenButton + className} onClick={onClick}>{children}</button>;
}
