interface ColumnProps {
  title: string
  children?: React.ReactNode
}

function Column({ title, children }: ColumnProps) {
  return (
    <div
      style={{
        background: "#f9fafb",
        padding: "15px",
        borderRadius: "10px",
        minHeight: "450px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>

      <div
        style={{
          flex: 1,
          borderRadius: "8px",
          border: "2px dashed #e5e7eb",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Column
