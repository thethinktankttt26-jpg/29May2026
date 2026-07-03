"use client";

import { useEffect, useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import { loadRetailers } from "../../../services/retailers/retailerService";
import { createDiscovery } from "../../../services/discovery/discoveryService";
import { getDiscoveryStatus } from "../../../services/discovery/discoveryQueries";
import { loadBlueprint } from "../../../services/discovery/blueprint/loadBlueprint";


export default function DiscoveryPage() {

  const [retailers, setRetailers] = useState<any[]>([]);
  const [discoveryStatus, setDiscoveryStatus] = useState<any[]>([]);

  useEffect(() => {

    async function load() {

  const retailerData = await loadRetailers();

  const discoveryData =
    await getDiscoveryStatus();

  setRetailers(retailerData);

  setDiscoveryStatus(discoveryData);

}

    load();

  }, []);

  return (

    <>

      <PageHeader
        title="Discovery Engine"
        description="Discover retailer structure automatically."
      />

      <table
        style={{
          width: "100%",
          marginTop: 30,
          borderCollapse: "collapse",
        }}
      >

        <thead>

          <tr>

            <th align="left">Retailer</th>

            <th align="left">Status</th>

            <th align="left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {retailers.map((retailer) => (

            <tr
              key={retailer.id}
              style={{
                height: 60,
                borderBottom: "1px solid #eee",
              }}
            >

              <td>{retailer.retailer_name}</td>

              <td>

  {(() => {

    const discovery = discoveryStatus.find(
      (item) => item.retailer_id === retailer.id
    );

    const status = discovery
      ? discovery.status
      : "Not Started";

    let background = "#627db4";

    if (status === "PENDING") {
      background = "#f59e0b";
    }

    if (status === "COMPLETED") {
      background = "#16a34a";
    }

    if (status === "FAILED") {
      background = "#dc2626";
    }

    return (

      <span
        style={{
          background,
          color: "white",
          padding: "6px 12px",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {status}
      </span>

    );

  })()}

</td>

              <td>

            <button
  onClick={async () => {

    try {

      console.log("Start Discovery clicked");

const response = await fetch("/api/discovery", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
  url: retailer.base_url,
  retailerId: retailer.id,
}),

});

const result = await response.json();

if (!response.ok) {
  alert(result.error);
  return;
}

console.log(result);

await createDiscovery(
  retailer.id,
  "HOME",
  retailer.base_url
);

const blueprint = await loadBlueprint(retailer.id);

console.log("LOADED BLUEPRINT:", blueprint);

alert("Blueprint generated successfully.");

    } catch (error) {

      console.error("DISCOVERY ERROR:", error);


    }

  }}
>
  Start Discovery
</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </>

  );

}