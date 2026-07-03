"use client";

import { useEffect, useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import { loadRetailers } from "../../../services/retailers/retailerService";
import { getBlueprint } from "../../../services/discovery/blueprint/getBlueprint";
import { useRouter } from "next/navigation";

export default function BlueprintPage() {

    const router = useRouter();

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {

    async function load() {

      const retailers = await loadRetailers();

      const result = [];

      for (const retailer of retailers) {

        try {

         const blueprint =
    await getBlueprint(retailer.id);

console.log("FULL BLUEPRINT:", blueprint);

          result.push({
            retailer,
            blueprint,
          });

        } catch {

          result.push({
            retailer,
            blueprint: null,
          });

        }

      }

      setRows(result);

    }

    load();

  }, []);

  return (

    <>

      <PageHeader
        title="Retailer Blueprints"
        description="Review generated retailer blueprints."
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 30,
        }}
      >

        <thead>

          <tr>

            <th align="left">Retailer</th>
            <th align="left">Status</th>
            <th align="left">Confidence</th>
            <th align="left">Categories</th>
            <th align="left">Action</th>

          </tr>

        </thead>

        <tbody>

          {rows.map((row) => (

            <tr
              key={row.retailer.id}
              style={{
                height: 55,
                borderBottom: "1px solid #eee",
              }}
            >

              <td>{row.retailer.retailer_name}</td>

              <td>
                {row.blueprint
                  ? row.blueprint.status
                  : "Not Generated"}
              </td>

              <td>
                {row.blueprint
                  ? row.blueprint.confidence_score
                  : "-"}
              </td>

              <td>
                {row.blueprint
                  ? row.blueprint.blueprint.categories.length
                  : "-"}
              </td>

              <td>
  {row.blueprint && (
  
<button
  onClick={() =>
    router.push(
      `/blueprints/${row.retailer.id}`
    )
  }
>
  View
</button>

  )}
</td>

            </tr>

          ))}

        </tbody>

      </table>

    </>

  );

}