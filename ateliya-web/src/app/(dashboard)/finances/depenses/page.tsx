"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal, ModalFooterButtons } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { formatXOF, formatDateFR } from "@/lib/utils";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Receipt,
  TrendingDown,
  Package,
  Zap,
  Home,
  Users,
  Wrench,
  Truck,
  Download,
} from "lucide-react";

// Types
interface Depense {
  id: string;
  reference: string;
  libelle: string;
  categorie: string;
  montant: number;
  date: string;
  fournisseur?: string;
  facture?: string;
  notes?: string;
}

// Données mock
const depensesMock: Depense[] = [
  {
    id: "1",
    reference: "DEP-2025-001",
    libelle: "Achat tissu Wax",
    categorie: "fournitures",
    montant: 125000,
    date: "2025-01-15",
    fournisseur: "Vlisco Abidjan",
    facture: "FAC-VL-2025-0152",
  },
  {
    id: "2",
    reference: "DEP-2025-002",
    libelle: "Électricité Janvier",
    categorie: "charges",
    montant: 45000,
    date: "2025-01-10",
    fournisseur: "CIE",
    facture: "CIE-2025-01234",
  },
  {
    id: "3",
    reference: "DEP-2025-003",
    libelle: "Loyer Atelier",
    categorie: "loyer",
    montant: 150000,
    date: "2025-01-05",
    notes: "Loyer mensuel",
  },
  {
    id: "4",
    reference: "DEP-2025-004",
    libelle: "Salaire Employés",
    categorie: "salaires",
    montant: 280000,
    date: "2025-01-02",
    notes: "Salaires de janvier",
  },
  {
    id: "5",
    reference: "DEP-2025-005",
    libelle: "Fil à coudre et aiguilles",
    categorie: "fournitures",
    montant: 18500,
    date: "2025-01-12",
    fournisseur: "Mercerie Centrale",
  },
  {
    id: "6",
    reference: "DEP-2025-006",
    libelle: "Réparation machine à coudre",
    categorie: "maintenance",
    montant: 35000,
    date: "2025-01-08",
    fournisseur: "Tech Couture Services",
    notes: "Remplacement moteur Juki",
  },
  {
    id: "7",
    reference: "DEP-2025-007",
    libelle: "Transport livraisons",
    categorie: "transport",
    montant: 12000,
    date: "2025-01-17",
    notes: "Livraisons semaine 3",
  },
  {
    id: "8",
    reference: "DEP-2025-008",
    libelle: "Bazin riche blanc",
    categorie: "fournitures",
    montant: 96000,
    date: "2025-01-16",
    fournisseur: "Mali Textiles",
    facture: "MT-2025-0089",
  },
];

const categoriesDepenses = [
  {
    value: "fournitures",
    label: "Fournitures",
    icon: <Package className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-700 border-purple-300",
  },
  {
    value: "charges",
    label: "Charges",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-700 border-amber-300",
  },
  {
    value: "loyer",
    label: "Loyer",
    icon: <Home className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-700 border-blue-300",
  },
  {
    value: "salaires",
    label: "Salaires",
    icon: <Users className="h-4 w-4" />,
    color: "bg-teal-100 text-teal-700 border-teal-300",
  },
  {
    value: "maintenance",
    label: "Maintenance",
    icon: <Wrench className="h-4 w-4" />,
    color: "bg-orange-100 text-orange-700 border-orange-300",
  },
  {
    value: "transport",
    label: "Transport",
    icon: <Truck className="h-4 w-4" />,
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
  },
];

const getCategorieConfig = (categorie: string) => {
  return (
    categoriesDepenses.find((c) => c.value === categorie) || {
      label: categorie,
      color: "bg-gray-100 text-gray-700",
      icon: null,
    }
  );
};

export default function DepensesPage() {
  const [depenses, setDepenses] = useState<Depense[]>(depensesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDepense, setSelectedDepense] = useState<Depense | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filtrage
  const filteredDepenses = depenses.filter((d) => {
    const matchSearch =
      d.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.fournisseur?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategorie =
      filterCategorie === "Tous" || d.categorie === filterCategorie;
    return matchSearch && matchCategorie;
  });

  // Stats par catégorie
  const statsByCategorie = categoriesDepenses.map((cat) => ({
    ...cat,
    total: depenses
      .filter((d) => d.categorie === cat.value)
      .reduce((sum, d) => sum + d.montant, 0),
  }));

  const totalDepenses = depenses.reduce((sum, d) => sum + d.montant, 0);

  const handleView = (depense: Depense) => {
    setSelectedDepense(depense);
    setIsViewModalOpen(true);
  };

  const handleEdit = (depense: Depense) => {
    setSelectedDepense(depense);
    setIsModalOpen(true);
  };

  const handleDelete = (depense: Depense) => {
    setSelectedDepense(depense);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDepense) {
      setDepenses(depenses.filter((d) => d.id !== selectedDepense.id));
      setIsDeleteModalOpen(false);
      setSelectedDepense(null);
    }
  };

  const handleCreate = () => {
    setSelectedDepense(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Dépenses</h1>
          <p className="text-teal-600 mt-1">Suivi des dépenses de l'atelier</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-[#B5E5E8] text-teal-700 hover:bg-[#E0F5F6]"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-teal-700 hover:bg-teal-600 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle dépense
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Total dépenses</p>
                <p className="text-xl font-bold text-red-700">
                  {formatXOF(totalDepenses)}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Fournitures</p>
                <p className="text-lg font-bold text-purple-700">
                  {formatXOF(
                    statsByCategorie.find((c) => c.value === "fournitures")
                      ?.total || 0
                  )}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Salaires</p>
                <p className="text-lg font-bold text-teal-700">
                  {formatXOF(
                    statsByCategorie.find((c) => c.value === "salaires")
                      ?.total || 0
                  )}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Loyer</p>
                <p className="text-lg font-bold text-blue-700">
                  {formatXOF(
                    statsByCategorie.find((c) => c.value === "loyer")?.total ||
                      0
                  )}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
                <Input
                  placeholder="Rechercher par référence, libellé, fournisseur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#B5E5E8]"
                />
              </div>
            </div>
            <Select value={filterCategorie} onValueChange={setFilterCategorie}>
              <SelectTrigger className="border-[#B5E5E8]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Toutes catégories</SelectItem>
                {categoriesDepenses.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-700 hover:to-teal-800">
                  <TableHead className="text-white font-bold">
                    Référence
                  </TableHead>
                  <TableHead className="text-white font-bold">Date</TableHead>
                  <TableHead className="text-white font-bold">
                    Libellé
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Catégorie
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Fournisseur
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Montant
                  </TableHead>
                  <TableHead className="text-white font-bold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepenses.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-teal-600"
                    >
                      Aucune dépense trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDepenses.map((depense, index) => {
                    const catConfig = getCategorieConfig(depense.categorie);
                    return (
                      <TableRow
                        key={depense.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#F0FAFA]"
                        } hover:bg-[#E0F5F6] transition-colors`}
                      >
                        <TableCell className="font-mono text-sm font-semibold text-teal-700">
                          {depense.reference}
                        </TableCell>
                        <TableCell className="text-teal-700">
                          {formatDateFR(depense.date)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-teal-800">
                              {depense.libelle}
                            </p>
                            {depense.facture && (
                              <p className="text-xs text-teal-500">
                                Facture: {depense.facture}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${catConfig.color} border flex items-center gap-1 w-fit`}
                          >
                            {catConfig.icon}
                            {catConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-teal-700">
                          {depense.fournisseur || "—"}
                        </TableCell>
                        <TableCell className="font-bold text-red-600">
                          -{formatXOF(depense.montant)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              className="btn-action btn-action-view"
                              onClick={() => handleView(depense)}
                              title="Voir"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-edit"
                              onClick={() => handleEdit(depense)}
                              title="Modifier"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-delete"
                              onClick={() => handleDelete(depense)}
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredDepenses.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Modal Voir Dépense */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails de la dépense"
        size="md"
        variant="gradient"
      >
        {selectedDepense && (
          <div className="space-y-4">
            <div className="text-center bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
              <p className="text-sm opacity-80">Montant</p>
              <p className="text-3xl font-bold">
                -{formatXOF(selectedDepense.montant)}
              </p>
              <Badge
                className={`mt-2 ${
                  getCategorieConfig(selectedDepense.categorie).color
                } border`}
              >
                {getCategorieConfig(selectedDepense.categorie).icon}
                <span className="ml-1">
                  {getCategorieConfig(selectedDepense.categorie).label}
                </span>
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-teal-600">Référence</p>
                <p className="font-mono font-semibold text-teal-800">
                  {selectedDepense.reference}
                </p>
              </div>
              <div>
                <p className="text-xs text-teal-600">Date</p>
                <p className="font-medium text-teal-800">
                  {formatDateFR(selectedDepense.date)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-teal-600">Libellé</p>
                <p className="font-medium text-teal-800">
                  {selectedDepense.libelle}
                </p>
              </div>
              {selectedDepense.fournisseur && (
                <div>
                  <p className="text-xs text-teal-600">Fournisseur</p>
                  <p className="font-medium text-teal-800">
                    {selectedDepense.fournisseur}
                  </p>
                </div>
              )}
              {selectedDepense.facture && (
                <div>
                  <p className="text-xs text-teal-600">N° Facture</p>
                  <p className="font-mono font-medium text-teal-800">
                    {selectedDepense.facture}
                  </p>
                </div>
              )}
            </div>

            {selectedDepense.notes && (
              <div className="pt-4 border-t border-[#B5E5E8]">
                <p className="text-xs text-teal-600 mb-1">Notes</p>
                <p className="text-teal-700 bg-[#F0FAFA] p-3 rounded-lg">
                  {selectedDepense.notes}
                </p>
              </div>
            )}
          </div>
        )}
        <div className="mt-6">
          <ModalFooterButtons
            onCancel={() => setIsViewModalOpen(false)}
            cancelText="Fermer"
          />
        </div>
      </Modal>

      {/* Modal Créer/Modifier Dépense */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDepense ? "Modifier la dépense" : "Nouvelle dépense"}
        size="md"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            cancelText="Annuler"
            confirmText={selectedDepense ? "Enregistrer" : "Créer"}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <Label className="text-teal-700">Libellé *</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="Ex: Achat tissu Wax"
              defaultValue={selectedDepense?.libelle}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-teal-700">Montant (FCFA) *</Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="0"
                defaultValue={selectedDepense?.montant}
              />
            </div>
            <div>
              <Label className="text-teal-700">Date *</Label>
              <Input
                type="date"
                className="mt-1 border-[#B5E5E8]"
                defaultValue={
                  selectedDepense?.date ||
                  new Date().toISOString().split("T")[0]
                }
              />
            </div>
          </div>
          <div>
            <Label className="text-teal-700">Catégorie *</Label>
            <Select defaultValue={selectedDepense?.categorie}>
              <SelectTrigger className="mt-1 border-[#B5E5E8]">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {categoriesDepenses.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-teal-700">Fournisseur</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="Nom du fournisseur"
              defaultValue={selectedDepense?.fournisseur}
            />
          </div>
          <div>
            <Label className="text-teal-700">N° de facture</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="Référence facture"
              defaultValue={selectedDepense?.facture}
            />
          </div>
          <div>
            <Label className="text-teal-700">Notes</Label>
            <Textarea
              className="mt-1 border-[#B5E5E8]"
              placeholder="Notes supplémentaires..."
              rows={2}
              defaultValue={selectedDepense?.notes}
            />
          </div>
        </div>
      </Modal>

      {/* Modal Suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        size="sm"
        variant="light"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            cancelText="Annuler"
            confirmText="Supprimer"
            confirmVariant="destructive"
          />
        }
      >
        <p className="text-teal-700">
          Êtes-vous sûr de vouloir supprimer la dépense{" "}
          <strong>{selectedDepense?.reference}</strong> ?
        </p>
      </Modal>
    </div>
  );
}
