const Card = ({ children, className = '', hover = false, glass = false }) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300';
  const glassStyles = glass ? 'glass-card' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg';
  const hoverStyles = hover ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
