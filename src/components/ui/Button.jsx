import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  to,
  type = "button",
  onClick,
  disabled,
  className = "",
  fullWidth = false,
}) {
  const styles = `btn-hard ${fullWidth ? "w-full" : ""} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles} onClick={onClick}>
        <span>{children}</span>
        <ArrowRight size={20} strokeWidth={2.5} />
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      <span>{children}</span>
      <ArrowRight size={20} strokeWidth={2.5} />
    </button>
  );
}
