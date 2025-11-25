interface Props {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const Header = ({ title, description, children }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-2 ml-4">
          {children}
        </div>
      )}
    </div>
  );
};
