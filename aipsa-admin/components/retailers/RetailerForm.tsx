"use client";

import FormField from "../common/form/FormField";
import Input from "../common/form/Input";
import Select from "../common/form/Select";
import Checkbox from "../common/form/Checkbox";

import { COUNTRIES } from "../../lib/constants/countries";
import { RETAILER_STATUS } from "../../lib/constants/retailerStatus";
import { RETAILER_CATEGORIES } from "../../lib/constants/categories";

interface Props {
  name: string;
  setName: (value: string) => void;

  baseUrl: string;
  setBaseUrl: (value: string) => void;

  saleUrl: string;
  setSaleUrl: (value: string) => void;

  country: string;
  setCountry: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  active: boolean;
  setActive: (value: boolean) => void;

  categories: string[];
  toggleCategory: (category: string) => void;

  errors: Record<string, string>;
}

export default function RetailerForm({
  name,
  setName,
  baseUrl,
  setBaseUrl,
  saleUrl,
  setSaleUrl,
  country,
  setCountry,
  status,
  setStatus,
  active,
  setActive,
  categories,
  toggleCategory,
  errors,
}: Props) {

  return (
    <>

      <FormField label="Retailer Name">
        <Input
          value={name}
          onChange={setName}
        />
      </FormField>

      {errors.name && (
        <p
          style={{
            color: "#dc2626",
            marginTop: -10,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {errors.name}
        </p>
      )}

      <FormField label="Base URL">
        <Input
          value={baseUrl}
          onChange={setBaseUrl}
        />
      </FormField>

      {errors.baseUrl && (
        <p
          style={{
            color: "#dc2626",
            marginTop: -10,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {errors.baseUrl}
        </p>
      )}

      <FormField label="Sale URL">
        <Input
          value={saleUrl}
          onChange={setSaleUrl}
        />
      </FormField>

      {errors.saleUrl && (
        <p
          style={{
            color: "#dc2626",
            marginTop: -10,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {errors.saleUrl}
        </p>
      )}

      <FormField label="Country">
        <Select
          value={country}
          options={[...COUNTRIES]}
          onChange={setCountry}
        />
      </FormField>

      <FormField label="Categories">
        {RETAILER_CATEGORIES.map((category) => (
          <Checkbox
            key={category}
            label={category}
            checked={categories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
        ))}
      </FormField>

      {errors.categories && (
        <p
          style={{
            color: "#dc2626",
            marginTop: -10,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {errors.categories}
        </p>
      )}

      <FormField label="Status">
        <Select
          value={status}
          options={[...RETAILER_STATUS]}
          onChange={setStatus}
        />
      </FormField>

      <Checkbox
        label="Active"
        checked={active}
        onChange={setActive}
      />

    </>
  );
}