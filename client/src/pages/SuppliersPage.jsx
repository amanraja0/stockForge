import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeading from "../components/PageHeading";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const SuppliersPage = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [creating, setCreating] = useState(false);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get("/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch suppliers");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setCreating(true);
      await api.post("/suppliers", form);
      setForm(initialForm);
      toast.success("Supplier added successfully");
      fetchSuppliers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add supplier");
    } finally {
      setCreating(false);
    }
  };

  if (user?.role !== "ADMIN") {
    return (
      <DashboardLayout>
        <p className="text-slate-300">Only administrators can manage suppliers.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeading>Suppliers</PageHeading>

      <form
        onSubmit={handleSubmit}
        className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-lg md:grid-cols-2"
      >
        {[
          ["name", "Supplier name", true],
          ["email", "Email", false],
          ["phone", "Phone", false],
          ["address", "Address", false],
        ].map(([name, placeholder, required]) => (
          <input
            key={name}
            name={name}
            type={name === "email" ? "email" : "text"}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
            required={required}
            className="rounded-lg border border-slate-600 bg-slate-700 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        ))}

        <button
          type="submit"
          disabled={creating}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium disabled:opacity-50 md:col-span-2 md:justify-self-start"
        >
          {creating ? "Adding..." : "Add Supplier"}
        </button>
      </form>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-700 bg-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-700 text-slate-400">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b border-slate-700/60">
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.email || "-"}</td>
                <td className="p-3">{supplier.phone || "-"}</td>
                <td className="p-3">{supplier.address || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default SuppliersPage;
