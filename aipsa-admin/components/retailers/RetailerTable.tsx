import EmptyState from "../common/EmptyState";

interface Props {
  retailers: any[];
  onEdit: (retailer: any) => void;
  onToggleActive: (retailer: any) => void;
}

export default function RetailerTable({

  retailers,
  onEdit,
  onToggleActive,

}: Props) {

  if (retailers.length === 0) {

    return (

      <EmptyState
        title="No retailers found"
        message='Click "Add Retailer" to create your first retailer.'
      />

    );

  }

  return (

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 30,
      }}
    >

      <thead>

        <tr>

        <th>Retailer</th>
        <th>Country</th>
        <th>Status</th>
        <th>Active</th>
        <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {retailers.map((retailer) => (

          <tr
  key={retailer.id}
  style={{
    height: 80,
    borderBottom: "1px solid #eee",
  }}
>

            <td>{retailer.retailer_name}</td>

            <td>{retailer.country}</td>

            <td>{retailer.status}</td>

            <td>

              {retailer.is_active ? "Yes" : "No"}

            </td>

          <td
  style={{
    display: "flex",
    gap: 8,
  }}
>

  <button
    onClick={() => onEdit(retailer)}
    style={{
      padding: "6px 12px",
      cursor: "pointer",
    }}
  >
    Edit
  </button>

  <button
    onClick={() => onToggleActive(retailer)}
    style={{
      padding: "4px 8px",
      cursor: "pointer",
      background: retailer.is_active
        ? "#d57d7d"
        : "#16a34a",
      color: "white",
      border: "none",
      borderRadius: 10,
    }}
  >
    {retailer.is_active ? "Inactive" : "Activate"}
  </button>

</td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}