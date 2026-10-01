import { useEffect, useState } from "react";

export default function TypeWriter({
  text = "",
  speed = 42,
  className = "",
  as: Tag = "span",
}) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <Tag className={className}>
      {shown}
      <span
        className={`inline-block w-[0.08em] h-[0.85em] ml-1 align-middle bg-ink ${
          done ? "opacity-0" : "caret-blink"
        }`}
        aria-hidden
      />
    </Tag>
  );
}
