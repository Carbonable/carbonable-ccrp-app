import { useState } from "react";
import { getProjectColor } from "~/utils/utils";

export default function SquaredInitials({ text, color }: { text: string, color: string }) {
    const [backgroundColor] = useState(getProjectColor(color));

    if (!text) return null;

    const cleanText = text.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, ' ');
    
    const getInitials = (text: string): string => {
        const words = text.split(' ');
        const initials = words
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join('');
        return initials;
    }

    return (
        <div
            className="w-10 h-10 flex items-center justify-center text-neutral-50 font-bold text-xl rounded-lg"  style={{backgroundColor: backgroundColor}}
            >
            {getInitials(cleanText)}
        </div>
    )
}