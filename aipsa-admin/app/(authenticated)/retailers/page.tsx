"use client";

import { useEffect, useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import PageToolbar from "../../../components/common/PageToolbar";
import RetailerTable from "../../../components/retailers/RetailerTable";
import AddRetailerModal from "../../../components/retailers/AddRetailerModal";

import { loadRetailers } from "../../../services/retailers/retailerService";
import { supabase } from "../../../services/supabase/client";

export default function RetailersPage() {
  const [retailers, setRetailers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRetailer, setSelectedRetailer] =
  useState<any>(null);

  // Check Supabase session
  useEffect(() => {
    async function testSession() {
      const { data, error } = await supabase.auth.getSession();

      console.log("SESSION:", data);
      console.log("ERROR:", error);
    }

    testSession();
  }, []);

  // Load retailers
  const loadData = async () => {
    const data = await loadRetailers();
    setRetailers(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PageHeader
        title="Retailers"
        description="Manage all supported UK retailers."
      />

      <PageToolbar
        buttonText="+ Add Retailer"
        onClick={() => setOpen(true)}
      />

    <RetailerTable
  retailers={retailers}
  onEdit={(retailer) => {

    setSelectedRetailer(retailer);

    setOpen(true);

  }}
  onToggleActive={(retailer) => {

    console.log("Toggle Active:", retailer);

  }}
/>

      <AddRetailerModal
  open={open}
  onClose={() => {
    setOpen(false);
    setSelectedRetailer(null);
  }}
  onSaved={loadData}
  retailer={selectedRetailer}
/>
    </>
  );
}