"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Palette,
  Ruler,
  Truck,
} from "lucide-react";

// Types
interface Tissu {
  id: string;
  reference: string;
  nom: string;
  type: string;
  couleur: string;
  motif?: string;
  fournisseur: string;
  prixAchat: number; // par mètre
  quantite: number; // en mètres
  seuilAlerte: number;
  emplacement?: string;
  dateAchat: string;
  notes?: string;
}

// Données mock
const tissusMock: Tissu[] = [
  {
    id: "1",
    reference: "WAX-001",
    nom: "Wax Hollandais Bleu Royal",
    type: "Wax",
    couleur: "Bleu",
    motif: "Géométrique",
    fournisseur: "Vlisco Abidjan",
    prixAchat: 8500,
    quantite: 25,
    seuilAlerte: 10,
    emplacement: "Étagère A1",
    dateAchat: "2025-01-05",
    notes: "Qualité premium, très demandé",
  },
  {
    id: "2",
    reference: "WAX-002",
    nom: "Wax Africain Multicolore",
    type: "Wax",
    couleur: "Multicolore",
    motif: "Floral",
    fournisseur: "ABC Tissus",
    prixAchat: 5500,
    quantite: 45,
    seuilAlerte: 15,
    emplacement: "Étagère A2",
    dateAchat: "2025-01-10",
  },
  {
    id: "3",
    reference: "BAZ-001",
    nom: "Bazin Riche Blanc",
    type: "Bazin",
    couleur: "Blanc",
    fournisseur: "Mali Textiles",
    prixAchat: 12000,
    quantite: 8,
    seuilAlerte: 10,
    emplacement: "Étagère B1",
    dateAchat: "2024-12-20",
    notes: "Stock bas - à réapprovisionner",
  },
  {
    id: "4",
    reference: "BAZ-002",
    nom: "Bazin Getzner Doré",
    type: "Bazin",
    couleur: "Or",
    fournisseur: "Premium Fabric",
    prixAchat: 18000,
    quantite: 12,
    seuilAlerte: 5,
    emplacement: "Étagère B2",
    dateAchat: "2025-01-08",
  },
  {
    id: "5",
    reference: "SOI-001",
    nom: "Soie Naturelle Ivoire",
    type: "Soie",
    couleur: "Ivoire",
    fournisseur: "Silk House",
    prixAchat: 25000,
    quantite: 6,
    seuilAlerte: 5,
    emplacement: "Étagère C1",
    dateAchat: "2025-01-12",
  },
  {
    id: "6",
    reference: "DEN-001",
    nom: "Dentelle Française Blanche",
    type: "Dentelle",
    couleur: "Blanc",
    motif: "Floral",
    fournisseur: "Paris Lace",
    prixAchat: 35000,
    quantite: 4,
    seuilAlerte: 3,
    emplacement: "Étagère C2",
    dateAchat: "2025-01-15",
    notes: "Pour robes de mariée",
  },
  {
    id: "7",
    reference: "COT-001",
    nom: "Coton Égyptien Blanc",
    type: "Coton",
    couleur: "Blanc",
    fournisseur: "Cotton World",
    prixAchat: 4500,
    quantite: 60,
    seuilAlerte: 20,
    emplacement: "Étagère D1",
    dateAchat: "2025-01-03",
  },
  {
    id: "8",
    reference: "LIN-001",
    nom: "Lin Premium Beige",
    type: "Lin",
    couleur: "Beige",
    fournisseur: "Euro Fabrics",
    prixAchat: 9500,
    quantite: 2,
    seuilAlerte: 8,
    emplacement: "Étagère D2",
    dateAchat: "2024-11-28",
    notes: "RUPTURE IMMINENTE",
  },
];

const typesTissu = [
  "Tous",
  "Wax",
  "Bazin",
  "Soie",
  "Dentelle",
  "Coton",
  "Lin",
  "Satin",
  "Velours",
];

const getStockStatus = (quantite: number, seuil: number) => {
  if (quantite <= 0)
    return {
      label: "Rupture",
      className: "bg-red-500 text-white",
      icon: <AlertTriangle className="h-3 w-3" />,
    };
  if (quantite <= seuil)
    return {
      label: "Stock bas",
      className: "bg-amber-500 text-white",
      icon: <TrendingDown className="h-3 w-3" />,
    };
  return {
    label: "En stock",
    className: "bg-emerald-500 text-white",
    icon: <TrendingUp className="h-3 w-3" />,
  };
};

export default function TissusPage() {
  const [tissus, setTissus] = useState<Tissu[]>(tissusMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [filterStock, setFilterStock] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTissu, setSelectedTissu] = useState<Tissu | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMouvementModalOpen, setIsMouvementModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filtrage
  const filteredTissus = tissus.filter((t) => {
    const matchSearch =
      t.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.fournisseur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "Tous" || t.type === filterType;
    const matchStock =
      filterStock === "Tous" ||
      (filterStock === "bas" &&
        t.quantite <= t.seuilAlerte &&
        t.quantite > 0) ||
      (filterStock === "rupture" && t.quantite <= 0) ||
      (filterStock === "ok" && t.quantite > t.seuilAlerte);
    return matchSearch && matchType && matchStock;
  });

  // Stats
  const stats = {
    totalReferences: tissus.length,
    valeurStock: tissus.reduce((sum, t) => sum + t.prixAchat * t.quantite, 0),
    stockBas: tissus.filter(
      (t) => t.quantite <= t.seuilAlerte && t.quantite > 0
    ).length,
    rupture: tissus.filter((t) => t.quantite <= 0).length,
  };

  const handleView = (tissu: Tissu) => {
    setSelectedTissu(tissu);
    setIsViewModalOpen(true);
  };

  const handleEdit = (tissu: Tissu) => {
    setSelectedTissu(tissu);
    setIsModalOpen(true);
  };

  const handleDelete = (tissu: Tissu) => {
    setSelectedTissu(tissu);
    setIsDeleteModalOpen(true);
  };

  const handleMouvement = (tissu: Tissu) => {
    setSelectedTissu(tissu);
    setIsMouvementModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTissu) {
      setTissus(tissus.filter((t) => t.id !== selectedTissu.id));
      setIsDeleteModalOpen(false);
      setSelectedTissu(null);
    }
  };

  const handleCreate = () => {
    setSelectedTissu(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Tissus</h1>
          <p className="text-teal-600 mt-1">Gérez votre inventaire de tissus</p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-teal-700 hover:bg-teal-600 text-white shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau tissu
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Références</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.totalReferences}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <Package className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Valeur stock</p>
                <p className="text-xl font-bold text-teal-800">
                  {formatXOF(stats.valeurStock)}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <span className="text-emerald-600 font-bold text-sm">FCFA</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Stock bas</p>
                <p className="text-2xl font-bold text-amber-700">
                  {stats.stockBas}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <TrendingDown className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Ruptures</p>
                <p className="text-2xl font-bold text-red-700">
                  {stats.rupture}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
                <Input
                  placeholder="Rechercher par référence, nom, fournisseur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#B5E5E8]"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-[#B5E5E8]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {typesTissu.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStock} onValueChange={setFilterStock}>
              <SelectTrigger className="border-[#B5E5E8]">
                <SelectValue placeholder="État stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous</SelectItem>
                <SelectItem value="ok">En stock</SelectItem>
                <SelectItem value="bas">Stock bas</SelectItem>
                <SelectItem value="rupture">Rupture</SelectItem>
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
                  <TableHead className="text-white font-bold">Tissu</TableHead>
                  <TableHead className="text-white font-bold">Type</TableHead>
                  <TableHead className="text-white font-bold">
                    Fournisseur
                  </TableHead>
                  <TableHead className="text-white font-bold">Prix/m</TableHead>
                  <TableHead className="text-white font-bold">Stock</TableHead>
                  <TableHead className="text-white font-bold">Statut</TableHead>
                  <TableHead className="text-white font-bold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTissus.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-teal-600"
                    >
                      Aucun tissu trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTissus.map((tissu, index) => {
                    const stockStatus = getStockStatus(
                      tissu.quantite,
                      tissu.seuilAlerte
                    );
                    return (
                      <TableRow
                        key={tissu.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#F0FAFA]"
                        } hover:bg-[#E0F5F6] transition-colors`}
                      >
                        <TableCell className="font-mono text-sm font-semibold text-teal-700">
                          {tissu.reference}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-teal-800">
                              {tissu.nom}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Palette className="h-3 w-3 text-teal-500" />
                              <span className="text-xs text-teal-600">
                                {tissu.couleur}
                              </span>
                              {tissu.motif && (
                                <span className="text-xs text-teal-500">
                                  • {tissu.motif}
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-700 border border-purple-300">
                            {tissu.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-teal-700">
                          {tissu.fournisseur}
                        </TableCell>
                        <TableCell className="font-semibold text-teal-800">
                          {formatXOF(tissu.prixAchat)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Ruler className="h-3 w-3 text-teal-500" />
                            <span className="font-semibold text-teal-800">
                              {tissu.quantite}m
                            </span>
                            <span className="text-xs text-teal-500">
                              (seuil: {tissu.seuilAlerte})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${stockStatus.className} flex items-center gap-1 w-fit`}
                          >
                            {stockStatus.icon}
                            {stockStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              className="btn-action btn-action-view"
                              onClick={() => handleView(tissu)}
                              title="Voir"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-success"
                              onClick={() => handleMouvement(tissu)}
                              title="Mouvement stock"
                            >
                              <Package size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-edit"
                              onClick={() => handleEdit(tissu)}
                              title="Modifier"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-delete"
                              onClick={() => handleDelete(tissu)}
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
            totalItems={filteredTissus.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Modal Voir Tissu */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails du tissu"
        size="md"
        variant="gradient"
      >
        {selectedTissu && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <Package className="h-10 w-10 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-teal-600 font-mono">
                  {selectedTissu.reference}
                </p>
                <h3 className="text-lg font-bold text-teal-800">
                  {selectedTissu.nom}
                </h3>
                <Badge className="mt-1 bg-purple-100 text-purple-700 border border-purple-300">
                  {selectedTissu.type}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#B5E5E8]">
              <div>
                <p className="text-xs text-teal-600">Couleur</p>
                <p className="font-medium text-teal-800">
                  {selectedTissu.couleur}
                </p>
              </div>
              {selectedTissu.motif && (
                <div>
                  <p className="text-xs text-teal-600">Motif</p>
                  <p className="font-medium text-teal-800">
                    {selectedTissu.motif}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-teal-600">Fournisseur</p>
                <p className="font-medium text-teal-800">
                  {selectedTissu.fournisseur}
                </p>
              </div>
              <div>
                <p className="text-xs text-teal-600">Date d'achat</p>
                <p className="font-medium text-teal-800">
                  {formatDateFR(selectedTissu.dateAchat)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#B5E5E8]">
              <div className="bg-[#F0FAFA] p-3 rounded-xl">
                <p className="text-xs text-teal-600">Prix/mètre</p>
                <p className="text-lg font-bold text-teal-800">
                  {formatXOF(selectedTissu.prixAchat)}
                </p>
              </div>
              <div className="bg-[#F0FAFA] p-3 rounded-xl">
                <p className="text-xs text-teal-600">Stock actuel</p>
                <p className="text-lg font-bold text-teal-800">
                  {selectedTissu.quantite}m
                </p>
              </div>
              <div className="bg-[#F0FAFA] p-3 rounded-xl">
                <p className="text-xs text-teal-600">Valeur</p>
                <p className="text-lg font-bold text-emerald-600">
                  {formatXOF(selectedTissu.prixAchat * selectedTissu.quantite)}
                </p>
              </div>
            </div>

            {selectedTissu.emplacement && (
              <div className="pt-4 border-t border-[#B5E5E8]">
                <p className="text-xs text-teal-600">Emplacement</p>
                <p className="font-medium text-teal-800">
                  {selectedTissu.emplacement}
                </p>
              </div>
            )}

            {selectedTissu.notes && (
              <div className="pt-4 border-t border-[#B5E5E8]">
                <p className="text-xs text-teal-600 mb-1">Notes</p>
                <p className="text-teal-700 bg-[#F0FAFA] p-3 rounded-lg">
                  {selectedTissu.notes}
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

      {/* Modal Mouvement de stock */}
      <Modal
        isOpen={isMouvementModalOpen}
        onClose={() => setIsMouvementModalOpen(false)}
        title={`Mouvement - ${selectedTissu?.nom || ""}`}
        size="sm"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsMouvementModalOpen(false)}
            onConfirm={() => setIsMouvementModalOpen(false)}
            cancelText="Annuler"
            confirmText="Enregistrer"
          />
        }
      >
        <div className="space-y-4">
          <div className="bg-[#F0FAFA] p-4 rounded-xl text-center">
            <p className="text-sm text-teal-600">Stock actuel</p>
            <p className="text-3xl font-bold text-teal-800">
              {selectedTissu?.quantite}m
            </p>
          </div>

          <div>
            <Label className="text-teal-700">Type de mouvement</Label>
            <Select defaultValue="entree">
              <SelectTrigger className="mt-1 border-[#B5E5E8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entree">+ Entrée (achat/retour)</SelectItem>
                <SelectItem value="sortie">- Sortie (utilisation)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-teal-700">Quantité (mètres)</Label>
            <Input
              type="number"
              className="mt-1 border-[#B5E5E8]"
              placeholder="0"
              min="0"
              step="0.5"
            />
          </div>

          <div>
            <Label className="text-teal-700">Motif</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="Ex: Commande CMD-2025-001"
            />
          </div>
        </div>
      </Modal>

      {/* Modal Créer/Modifier Tissu */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTissu ? "Modifier le tissu" : "Nouveau tissu"}
        size="lg"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            cancelText="Annuler"
            confirmText={selectedTissu ? "Enregistrer" : "Créer"}
          />
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-teal-700">Référence *</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: WAX-001"
                defaultValue={selectedTissu?.reference}
              />
            </div>
            <div>
              <Label className="text-teal-700">Type *</Label>
              <Select defaultValue={selectedTissu?.type}>
                <SelectTrigger className="mt-1 border-[#B5E5E8]">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {typesTissu
                    .filter((t) => t !== "Tous")
                    .map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label className="text-teal-700">Nom / Description *</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Wax Hollandais Bleu Royal"
                defaultValue={selectedTissu?.nom}
              />
            </div>
            <div>
              <Label className="text-teal-700">Couleur *</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Bleu, Multicolore..."
                defaultValue={selectedTissu?.couleur}
              />
            </div>
            <div>
              <Label className="text-teal-700">Motif</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Géométrique, Floral..."
                defaultValue={selectedTissu?.motif}
              />
            </div>
            <div>
              <Label className="text-teal-700">Fournisseur *</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Nom du fournisseur"
                defaultValue={selectedTissu?.fournisseur}
              />
            </div>
            <div>
              <Label className="text-teal-700">Date d'achat</Label>
              <Input
                type="date"
                className="mt-1 border-[#B5E5E8]"
                defaultValue={selectedTissu?.dateAchat}
              />
            </div>
            <div>
              <Label className="text-teal-700">
                Prix d'achat / mètre (FCFA) *
              </Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="0"
                defaultValue={selectedTissu?.prixAchat}
              />
            </div>
            <div>
              <Label className="text-teal-700">
                Quantité initiale (mètres) *
              </Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="0"
                step="0.5"
                defaultValue={selectedTissu?.quantite}
              />
            </div>
            <div>
              <Label className="text-teal-700">Seuil d'alerte (mètres)</Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="10"
                defaultValue={selectedTissu?.seuilAlerte || 10}
              />
            </div>
            <div>
              <Label className="text-teal-700">Emplacement</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Étagère A1"
                defaultValue={selectedTissu?.emplacement}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-teal-700">Notes</Label>
              <Textarea
                className="mt-1 border-[#B5E5E8]"
                placeholder="Notes supplémentaires..."
                rows={2}
                defaultValue={selectedTissu?.notes}
              />
            </div>
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
          Êtes-vous sûr de vouloir supprimer le tissu{" "}
          <strong>{selectedTissu?.nom}</strong> ?
        </p>
      </Modal>
    </div>
  );
}
