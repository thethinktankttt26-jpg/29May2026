"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PageHeader from "../../../../components/common/PageHeader";
import { getBlueprint } from "../../../../services/discovery/blueprint/getBlueprint";

export default function BlueprintDetailsPage() {
  const params = useParams();
  const retailerId = params.retailerId as string;

  const [blueprint, setBlueprint] = useState<any>(null);

const [actionLoading, setActionLoading] = useState<
  "approve" | "reject" | "regenerate" | null
>(null);

  
async function handleApprove() {
  if (actionLoading) return;

  try {
    setActionLoading("approve");

    const response = await fetch(
      `/api/blueprints/${retailerId}/approve`,
      {
        method: "POST",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "Failed to approve blueprint"
      );
    }

    setBlueprint(result.blueprint);
  } catch (error) {
    console.error("APPROVE ERROR:", error);
  } finally {
    setActionLoading(null);
  }
}

async function handleReject() {
  if (actionLoading) return;

  try {
    setActionLoading("reject");

    const response = await fetch(
      `/api/blueprints/${retailerId}/reject`,
      {
        method: "POST",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "Failed to reject blueprint"
      );
    }

    setBlueprint(result.blueprint);
  } catch (error) {
    console.error("REJECT ERROR:", error);
  } finally {
    setActionLoading(null);
  }
}

async function handleRegenerate() {
  if (actionLoading) return;

  try {
    setActionLoading("regenerate");

    const response = await fetch(
      `/api/blueprints/${retailerId}/regenerate`,
      {
        method: "POST",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "Failed to regenerate blueprint"
      );
    }

    setBlueprint(result.blueprint);
  } catch (error) {
    console.error("REGENERATE ERROR:", error);
  } finally {
    setActionLoading(null);
  }
}

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

  const data = blueprint.blueprint || {};

  const categories = data.categories || [];
  const sale = data.sale || [];
  const products = data.products || [];
  const account = data.account || [];
  const help = data.help || [];

  return (
    <>
      <PageHeader
        title="Blueprint Review"
        description="Review and approve the generated retailer blueprint."
      />

      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Header Card */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Status : {blueprint.status}
          </h2>

          <p>
            <strong>Version:</strong> {blueprint.version}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {blueprint.confidence_score ?? 0}%
          </p>

          <progress
            value={blueprint.confidence_score ?? 0}
            max={100}
            style={{
              width: "100%",
              height: 18,
            }}
          />
        </div>

        {/* Summary Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 16,
          }}
        >
          <SummaryCard
            title="Categories"
            count={categories.length}
          />

          <SummaryCard
            title="Sale"
            count={sale.length}
          />

          <SummaryCard
            title="Products"
            count={products.length}
          />

          <SummaryCard
            title="Account"
            count={account.length}
          />

          <SummaryCard
            title="Help"
            count={help.length}
          />
        </div>

        <Section title="Homepage">
          <a
            href={data.homepage}
            target="_blank"
            rel="noreferrer"
          >
            {data.homepage}
          </a>
        </Section>

        <Section
          title="Categories"
          items={categories}
        />

        <Section
          title="Sale Links"
          items={sale}
        />

        <Section
          title="Product Links"
          items={products}
        />

        <Section
          title="Account Links"
          items={account}
        />

        <Section
          title="Help Links"
          items={help}
        />

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 10,
          }}
        >
  <button
  onClick={handleApprove}
  disabled={
    actionLoading !== null ||
    blueprint.status === "APPROVED"
  }
  style={{
    cursor:
      actionLoading !== null ||
      blueprint.status === "APPROVED"
        ? "not-allowed"
        : "pointer",
    padding: "10px 18px",
    borderRadius: 6,
    border: "none",
    background: "#16803c",
    color: "#fff",
    fontWeight: 600,
    opacity:
      actionLoading !== null ||
      blueprint.status === "APPROVED"
        ? 0.6
        : 1,
  }}
>
  {actionLoading === "approve"
    ? "Approving..."
    : blueprint.status === "APPROVED"
      ? "Approved"
      : "Approve Blueprint"}
</button>

<button
  onClick={handleReject}
  disabled={
    actionLoading !== null ||
    blueprint.status === "REJECTED"
  }
  style={{
    cursor:
      actionLoading !== null ||
      blueprint.status === "REJECTED"
        ? "not-allowed"
        : "pointer",
    padding: "10px 18px",
    borderRadius: 6,
    border: "none",
    background: "#c62828",
    color: "#fff",
    fontWeight: 600,
    opacity:
      actionLoading !== null ||
      blueprint.status === "REJECTED"
        ? 0.6
        : 1,
  }}
>
  {actionLoading === "reject"
    ? "Rejecting..."
    : blueprint.status === "REJECTED"
      ? "Rejected"
      : "Reject Blueprint"}
</button>

<button
  onClick={handleRegenerate}
  disabled={actionLoading !== null}
  style={{
    cursor: actionLoading ? "not-allowed" : "pointer",
    padding: "10px 18px",
    borderRadius: 6,
    border: "1px solid #999",
    background: "#e78608",
    fontWeight: 600,
    opacity: actionLoading ? 0.6 : 1,
  }}
>
  {actionLoading === "regenerate"
    ? "Regenerating..."
    : "Regenerate Blueprint"}
</button>

        </div>
      </div>
    </>
  );
}

function SummaryCard({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 20,
        background: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        {count}
      </div>
    </div>
  );
}

function Section({
  title,
  items,
  children,
}: any) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 20,
        background: "#fff",
      }}
    >
      <h3>{title}</h3>

      {children}

      {items && (
        <ul>
          {items.map(
            (
              item: any,
              index: number
            ) => (
              <li key={index}>
                {typeof item === "string"
                  ? item
                  : item.name ||
                    item.url ||
                    JSON.stringify(item)}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}