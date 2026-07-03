"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PageHeader from "../../../../components/common/PageHeader";
import { getBlueprint } from "../../../../services/discovery/blueprint/getBlueprint";

export default function BlueprintDetailsPage() {

  const params = useParams();

  const retailerId = params.retailerId as string;

  const [blueprint, setBlueprint] = useState<any>(null);

  useEffect(() => {

    async function load() {

      const data = await getBlueprint(retailerId);

      setBlueprint(data);

    }

    load();

  }, [retailerId]);

  if (!blueprint) {

    return <div>Loading...</div>;

  }

  return (

    <>

      <PageHeader
        title="Blueprint Details"
        description="Review generated retailer blueprint."
      />

      <pre
        style={{
          marginTop: 30,
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 8,
          overflow: "auto",
        }}
      >
        {JSON.stringify(
          blueprint,
          null,
          2
        )}
      </pre>

    </>

  );

}