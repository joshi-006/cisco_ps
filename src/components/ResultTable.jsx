import { formatRupees } from "../utils/format.js";

function ResultTable({ result }) {
  // Consolidate has not been run yet
  if (result === null) {
    return (
      <p>Run Consolidate to view the vendor summary.</p>
    );
  }

  // Consolidation was successful, but there are no orders
  if (result.rows.length === 0) {
    return (
      <div>
        <p>Total Units: 0</p>
        <p>Total Revenue: {formatRupees(0)}</p>
      </div>
    );
  }

  const maxUnits = Math.max(
    ...result.rows.map((row) => row.units)
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Variant ID</th>
          <th>Item</th>
          <th>Size</th>
          <th>Colour</th>
          <th>Units</th>
          <th>Unit Price</th>
          <th>Revenue</th>
          <th>Units Bar</th>
        </tr>
      </thead>

      <tbody>
        {result.rows.map((row) => (
          <tr key={row.variantId}>
            <td>{row.variantId}</td>
            <td>{row.item}</td>
            <td>{row.size}</td>
            <td>{row.colour}</td>
            <td>{row.units}</td>

            <td>{formatRupees(row.unitPrice)}</td>

            <td>{formatRupees(row.revenue)}</td>

            <td>
              <div className="unit-bar">
                <div
                  className="unit-bar-fill"
                  style={{
                    width: `${(row.units / maxUnits) * 100}%`,
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultTable;