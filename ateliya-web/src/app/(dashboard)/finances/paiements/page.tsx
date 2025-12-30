"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  Trash2,
  Wallet,
  CreditCard,
  Smartphone,
  Banknote,
  TrendingUp,
  Calendar,
  FileText,
  Download,
} from "lucide-react";

// Types
interface Paiement {
  id: string;
  reference: string;
  commandeRef: string;
  client: string;
  montant: number;
  methode: "especes" | "mobile_money" | "carte" | "virement";
  operateur?: string;
  numeroTransaction?: string;
  date: string;
  type: "avance" | "solde" | "acompte";
  notes?: string;
}

// Données mock
const paiementsMock: Paiement[] = [
  {
    id: "1",
    reference: "PAY-2025-001",
    commandeRef: "CMD-2025-001",
    client: "Mme Kouadio Aya",
    montant: 40000,
    methode: "mobile_money",
    operateur: "Orange Money",
    numeroTransaction: "OM2025011501234",
    date: "2025-01-15",
    type: "avance",
  },
  {
    id: "2",
    reference: "PAY-2025-002",
    commandeRef: "CMD-2025-002",
    client: "M. Diallo Ibrahim",
    montant: 60000,
    methode: "especes",
    date: "2025-01-16",
    type: "avance",
  },
  {
    id: "3",
    reference: "PAY-2025-003",
    commandeRef: "CMD-2025-003",
    client: "Mme Traoré Fatou",
    montant: 45000,
    methode: "mobile_money",
    operateur: "MTN Money",
    numeroTransaction: "MTN2025011089456",
    date: "2025-01-10",
    type: "solde",
  },
  {
    id: "4",
    reference: "PAY-2025-004",
    commandeRef: "CMD-2025-004",
    client: "M. Koné Amadou",
    montant: 25000,
    methode: "especes",
    date: "2025-01-12",
    type: "solde",
  },
  {
    id: "5",
    reference: "PAY-2025-005",
    commandeRef: "CMD-2025-005",
    client: "Mme Bamba Mariam",
    montant: 150000,
    methode: "virement",
    numeroTransaction: "VIR-BICICI-2025-789",
    date: "2025-01-05",
    type: "avance",
    notes: "Virement bancaire BICICI",
  },
  {
    id: "6",
    reference: "PAY-2025-006",
    commandeRef: "CMD-2025-006",
    client: "M. Ouattara Seydou",
    montant: 50000,
    methode: "mobile_money",
    operateur: "Wave",
    date: "2025-01-17",
    type: "avance",
  },
  {
    id: "7",
    reference: "PAY-2025-007",
    commandeRef: "CMD-2025-007",
    client: "Mme Sanogo Aminata",
    montant: 18000,
    methode: "especes",
    date: "2025-01-18",
    type: "solde",
  },
  {
    id: "8",
    reference: "PAY-2025-008",
    commandeRef: "CMD-2025-001",
    client: "Mme Kouadio Aya",
    montant: 20000,
    methode: "mobile_money",
    operateur: "Orange Money",
    date: "2025-01-19",
    type: "acompte",
  },
];

const getMethodeConfig = (methode: string) => {
  const config: Record<
    string,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    especes: {
      label: "Espèces",
      className: "bg-emerald-100 text-emerald-700 border-emerald-300",
      icon: <Banknote className="h-3 w-3" />,
    },
    mobile_money: {
      label: "Mobile Money",
      className: "bg-orange-100 text-orange-700 border-orange-300",
      icon: <Smartphone className="h-3 w-3" />,
    },
    carte: {
      label: "Carte bancaire",
      className: "bg-blue-100 text-blue-700 border-blue-300",
      icon: <CreditCard className="h-3 w-3" />,
    },
    virement: {
      label: "Virement",
      className: "bg-purple-100 text-purple-700 border-purple-300",
      icon: <Wallet className="h-3 w-3" />,
    },
  };
  return (
    config[methode] || {
      label: methode,
      className: "bg-gray-100 text-gray-700",
      icon: null,
    }
  );
};

const getTypeConfig = (type: string) => {
  const config: Record<string, { label: string; className: string }> = {
    avance: { label: "Avance", className: "bg-teal-500 text-white" },
    acompte: { label: "Acompte", className: "bg-blue-500 text-white" },
    solde: { label: "Solde", className: "bg-emerald-500 text-white" },
  };
  return config[type] || { label: type, className: "bg-gray-500 text-white" };
};

export default function PaiementsPage() {
  const [paiements, setPaiements] = useState<Paiement[]>(paiementsMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethode, setFilterMethode] = useState("Tous");
  const [filterType, setFilterType] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filtrage
  const filteredPaiements = paiements.filter((p) => {
    const matchSearch =
      p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.commandeRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMethode =
      filterMethode === "Tous" || p.methode === filterMethode;
    const matchType = filterType === "Tous" || p.type === filterType;
    return matchSearch && matchMethode && matchType;
  });

  // Stats
  const stats = {
    totalMois: paiements.reduce((sum, p) => sum + p.montant, 0),
    nombrePaiements: paiements.length,
    mobileMoney: paiements
      .filter((p) => p.methode === "mobile_money")
      .reduce((sum, p) => sum + p.montant, 0),
    especes: paiements
      .filter((p) => p.methode === "especes")
      .reduce((sum, p) => sum + p.montant, 0),
  };

  const handleView = (paiement: Paiement) => {
    setSelectedPaiement(paiement);
    setIsViewModalOpen(true);
  };

  const handleDelete = (paiement: Paiement) => {
    setSelectedPaiement(paiement);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPaiement) {
      setPaiements(paiements.filter((p) => p.id !== selectedPaiement.id));
      setIsDeleteModalOpen(false);
      setSelectedPaiement(null);
    }
  };

  const handleCreate = () => {
    setSelectedPaiement(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Paiements</h1>
          <p className="text-teal-600 mt-1">Suivi des paiements clients</p>
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
            Nouveau paiement
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Total du mois</p>
                <p className="text-xl font-bold text-teal-800">
                  {formatXOF(stats.totalMois)}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <Wallet className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Transactions</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.nombrePaiements}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Mobile Money</p>
                <p className="text-xl font-bold text-orange-700">
                  {formatXOF(stats.mobileMoney)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Smartphone className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">Espèces</p>
                <p className="text-xl font-bold text-emerald-700">
                  {formatXOF(stats.especes)}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Banknote className="h-6 w-6 text-emerald-600" />
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
                  placeholder="Rechercher par référence, client, commande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#B5E5E8]"
                />
              </div>
            </div>
            <Select value={filterMethode} onValueChange={setFilterMethode}>
              <SelectTrigger className="border-[#B5E5E8]">
                <SelectValue placeholder="Méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Toutes méthodes</SelectItem>
                <SelectItem value="especes">Espèces</SelectItem>
                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                <SelectItem value="carte">Carte bancaire</SelectItem>
                <SelectItem value="virement">Virement</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-[#B5E5E8]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous types</SelectItem>
                <SelectItem value="avance">Avance</SelectItem>
                <SelectItem value="acompte">Acompte</SelectItem>
                <SelectItem value="solde">Solde</SelectItem>
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
                  <TableHead className="text-white font-bold">Client</TableHead>
                  <TableHead className="text-white font-bold">
                    Commande
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Montant
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Méthode
                  </TableHead>
                  <TableHead className="text-white font-bold">Type</TableHead>
                  <TableHead className="text-white font-bold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaiements.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-teal-600"
                    >
                      Aucun paiement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPaiements.map((paiement, index) => {
                    const methodeConfig = getMethodeConfig(paiement.methode);
                    const typeConfig = getTypeConfig(paiement.type);
                    return (
                      <TableRow
                        key={paiement.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#F0FAFA]"
                        } hover:bg-[#E0F5F6] transition-colors`}
                      >
                        <TableCell className="font-mono text-sm font-semibold text-teal-700">
                          {paiement.reference}
                        </TableCell>
                        <TableCell className="text-teal-700">
                          {formatDateFR(paiement.date)}
                        </TableCell>
                        <TableCell className="font-medium text-teal-800">
                          {paiement.client}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-teal-600">
                          {paiement.commandeRef}
                        </TableCell>
                        <TableCell className="font-bold text-teal-800">
                          {formatXOF(paiement.montant)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${methodeConfig.className} border flex items-center gap-1 w-fit`}
                          >
                            {methodeConfig.icon}
                            {methodeConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={typeConfig.className}>
                            {typeConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              className="btn-action btn-action-view"
                              onClick={() => handleView(paiement)}
                              title="Voir"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-document"
                              title="Reçu"
                            >
                              <FileText size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-delete"
                              onClick={() => handleDelete(paiement)}
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
            totalItems={filteredPaiements.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Modal Voir Paiement */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails du paiement"
        size="md"
        variant="gradient"
      >
        {selectedPaiement && (
          <div className="space-y-4">
            <div className="text-center bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white">
              <p className="text-sm opacity-80">Montant</p>
              <p className="text-3xl font-bold">
                {formatXOF(selectedPaiement.montant)}
              </p>
              <Badge
                className={`mt-2 ${
                  getTypeConfig(selectedPaiement.type).className
                }`}
              >
                {getTypeConfig(selectedPaiement.type).label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-teal-600">Référence</p>
                <p className="font-mono font-semibold text-teal-800">
                  {selectedPaiement.reference}
                </p>
              </div>
              <div>
                <p className="text-xs text-teal-600">Date</p>
                <p className="font-medium text-teal-800">
                  {formatDateFR(selectedPaiement.date)}
                </p>
              </div>
              <div>
                <p className="text-xs text-teal-600">Client</p>
                <p className="font-medium text-teal-800">
                  {selectedPaiement.client}
                </p>
              </div>
              <div>
                <p className="text-xs text-teal-600">Commande</p>
                <p className="font-mono font-medium text-teal-800">
                  {selectedPaiement.commandeRef}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#B5E5E8]">
              <p className="text-xs text-teal-600 mb-2">Méthode de paiement</p>
              <Badge
                className={`${
                  getMethodeConfig(selectedPaiement.methode).className
                } border flex items-center gap-1 w-fit`}
              >
                {getMethodeConfig(selectedPaiement.methode).icon}
                {getMethodeConfig(selectedPaiement.methode).label}
              </Badge>
              {selectedPaiement.operateur && (
                <p className="text-sm text-teal-700 mt-2">
                  Opérateur: {selectedPaiement.operateur}
                </p>
              )}
              {selectedPaiement.numeroTransaction && (
                <p className="text-sm text-teal-700 font-mono">
                  N° Transaction: {selectedPaiement.numeroTransaction}
                </p>
              )}
            </div>

            {selectedPaiement.notes && (
              <div className="pt-4 border-t border-[#B5E5E8]">
                <p className="text-xs text-teal-600 mb-1">Notes</p>
                <p className="text-teal-700 bg-[#F0FAFA] p-3 rounded-lg">
                  {selectedPaiement.notes}
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

      {/* Modal Créer Paiement */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau paiement"
        size="md"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            cancelText="Annuler"
            confirmText="Enregistrer"
          />
        }
      >
        <div className="space-y-4">
          <div>
            <Label className="text-teal-700">Commande *</Label>
            <Select>
              <SelectTrigger className="mt-1 border-[#B5E5E8]">
                <SelectValue placeholder="Sélectionner une commande" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CMD-2025-001">
                  CMD-2025-001 - Mme Kouadio (Reste: 35 000 FCFA)
                </SelectItem>
                <SelectItem value="CMD-2025-002">
                  CMD-2025-002 - M. Diallo (Reste: 60 000 FCFA)
                </SelectItem>
                <SelectItem value="CMD-2025-008">
                  CMD-2025-008 - M. Touré (Reste: 12 000 FCFA)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-teal-700">Montant (FCFA) *</Label>
            <Input
              type="number"
              className="mt-1 border-[#B5E5E8]"
              placeholder="0"
            />
          </div>
          <div>
            <Label className="text-teal-700">Type de paiement *</Label>
            <Select>
              <SelectTrigger className="mt-1 border-[#B5E5E8]">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="avance">Avance</SelectItem>
                <SelectItem value="acompte">Acompte</SelectItem>
                <SelectItem value="solde">Solde</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-teal-700">Méthode de paiement *</Label>
            <Select>
              <SelectTrigger className="mt-1 border-[#B5E5E8]">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="especes">Espèces</SelectItem>
                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                <SelectItem value="carte">Carte bancaire</SelectItem>
                <SelectItem value="virement">Virement bancaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-teal-700">Opérateur Mobile Money</Label>
            <Select>
              <SelectTrigger className="mt-1 border-[#B5E5E8]">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orange">Orange Money</SelectItem>
                <SelectItem value="mtn">MTN Money</SelectItem>
                <SelectItem value="wave">Wave</SelectItem>
                <SelectItem value="moov">Moov Money</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-teal-700">N° de transaction</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="Référence de la transaction"
            />
          </div>
          <div>
            <Label className="text-teal-700">Date</Label>
            <Input
              type="date"
              className="mt-1 border-[#B5E5E8]"
              defaultValue={new Date().toISOString().split("T")[0]}
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
          Êtes-vous sûr de vouloir supprimer le paiement{" "}
          <strong>{selectedPaiement?.reference}</strong> ?
        </p>
      </Modal>
    </div>
  );
}
