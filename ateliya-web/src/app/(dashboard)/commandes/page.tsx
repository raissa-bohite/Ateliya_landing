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
  Calendar,
  User,
  Shirt,
  Clock,
  CheckCircle,
  AlertCircle,
  Ruler,
  Filter,
} from "lucide-react";

// Types
interface Commande {
  id: string;
  reference: string;
  client: {
    nom: string;
    telephone: string;
  };
  article: string;
  categorie: string;
  dateCommande: string;
  dateLivraison: string;
  montant: number;
  avance: number;
  statut:
    | "en_attente"
    | "coupe"
    | "assemblage"
    | "finitions"
    | "essayage"
    | "retouches"
    | "termine"
    | "livre";
  priorite: "basse" | "normale" | "haute" | "urgente";
  notes?: string;
}

// Données mock
const commandesMock: Commande[] = [
  {
    id: "1",
    reference: "CMD-2025-001",
    client: { nom: "Mme Kouadio Aya", telephone: "+225 07 00 00 01" },
    article: "Robe de soirée",
    categorie: "Robe",
    dateCommande: "2025-01-15",
    dateLivraison: "2025-01-30",
    montant: 75000,
    avance: 40000,
    statut: "assemblage",
    priorite: "haute",
    notes: "Tissu wax bleu, broderies dorées",
  },
  {
    id: "2",
    reference: "CMD-2025-002",
    client: { nom: "M. Diallo Ibrahim", telephone: "+225 07 00 00 02" },
    article: "Costume 3 pièces",
    categorie: "Costume",
    dateCommande: "2025-01-16",
    dateLivraison: "2025-02-05",
    montant: 120000,
    avance: 60000,
    statut: "en_attente",
    priorite: "normale",
  },
  {
    id: "3",
    reference: "CMD-2025-003",
    client: { nom: "Mme Traoré Fatou", telephone: "+225 07 00 00 03" },
    article: "Ensemble wax",
    categorie: "Ensemble",
    dateCommande: "2025-01-10",
    dateLivraison: "2025-01-20",
    montant: 45000,
    avance: 45000,
    statut: "essayage",
    priorite: "haute",
  },
  {
    id: "4",
    reference: "CMD-2025-004",
    client: { nom: "M. Koné Amadou", telephone: "+225 07 00 00 04" },
    article: "Chemise sur mesure",
    categorie: "Chemise",
    dateCommande: "2025-01-12",
    dateLivraison: "2025-01-18",
    montant: 25000,
    avance: 25000,
    statut: "termine",
    priorite: "normale",
  },
  {
    id: "5",
    reference: "CMD-2025-005",
    client: { nom: "Mme Bamba Mariam", telephone: "+225 07 00 00 05" },
    article: "Robe de mariée",
    categorie: "Robe",
    dateCommande: "2025-01-05",
    dateLivraison: "2025-02-15",
    montant: 250000,
    avance: 150000,
    statut: "finitions",
    priorite: "urgente",
    notes: "Dentelle blanche, traîne longue, voile inclus",
  },
  {
    id: "6",
    reference: "CMD-2025-006",
    client: { nom: "M. Ouattara Seydou", telephone: "+225 07 00 00 06" },
    article: "Boubou traditionnel",
    categorie: "Boubou",
    dateCommande: "2025-01-17",
    dateLivraison: "2025-01-25",
    montant: 85000,
    avance: 50000,
    statut: "coupe",
    priorite: "normale",
  },
  {
    id: "7",
    reference: "CMD-2025-007",
    client: { nom: "Mme Sanogo Aminata", telephone: "+225 07 00 00 07" },
    article: "Jupe crayon",
    categorie: "Jupe",
    dateCommande: "2025-01-18",
    dateLivraison: "2025-01-22",
    montant: 18000,
    avance: 18000,
    statut: "livre",
    priorite: "basse",
  },
  {
    id: "8",
    reference: "CMD-2025-008",
    client: { nom: "M. Touré Moussa", telephone: "+225 07 00 00 08" },
    article: "Pantalon sur mesure",
    categorie: "Pantalon",
    dateCommande: "2025-01-19",
    dateLivraison: "2025-01-26",
    montant: 22000,
    avance: 10000,
    statut: "en_attente",
    priorite: "normale",
  },
];

const categories = [
  "Tous",
  "Robe",
  "Costume",
  "Ensemble",
  "Chemise",
  "Boubou",
  "Pantalon",
  "Jupe",
];

const getStatutConfig = (statut: string) => {
  const config: Record<
    string,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    en_attente: {
      label: "En attente",
      className: "bg-amber-500 text-white",
      icon: <Clock className="h-3 w-3" />,
    },
    coupe: {
      label: "Coupe",
      className: "bg-blue-500 text-white",
      icon: <Shirt className="h-3 w-3" />,
    },
    assemblage: {
      label: "Assemblage",
      className: "bg-indigo-500 text-white",
      icon: <Shirt className="h-3 w-3" />,
    },
    finitions: {
      label: "Finitions",
      className: "bg-purple-500 text-white",
      icon: <Shirt className="h-3 w-3" />,
    },
    essayage: {
      label: "Essayage",
      className: "bg-pink-500 text-white",
      icon: <User className="h-3 w-3" />,
    },
    retouches: {
      label: "Retouches",
      className: "bg-orange-500 text-white",
      icon: <Shirt className="h-3 w-3" />,
    },
    termine: {
      label: "Terminé",
      className: "bg-emerald-500 text-white",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    livre: {
      label: "Livré",
      className: "bg-slate-500 text-white",
      icon: <CheckCircle className="h-3 w-3" />,
    },
  };
  return (
    config[statut] || {
      label: statut,
      className: "bg-gray-500 text-white",
      icon: null,
    }
  );
};

const getPrioriteConfig = (priorite: string) => {
  const config: Record<string, { label: string; className: string }> = {
    basse: {
      label: "Basse",
      className: "bg-slate-100 text-slate-700 border border-slate-300",
    },
    normale: {
      label: "Normale",
      className: "bg-teal-100 text-teal-700 border border-teal-300",
    },
    haute: {
      label: "Haute",
      className: "bg-orange-100 text-orange-700 border border-orange-300",
    },
    urgente: {
      label: "Urgente",
      className: "bg-red-100 text-red-700 border border-red-300",
    },
  };
  return (
    config[priorite] || {
      label: priorite,
      className: "bg-gray-100 text-gray-700",
    }
  );
};

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>(commandesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("Tous");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filtrage
  const filteredCommandes = commandes.filter((cmd) => {
    const matchSearch =
      cmd.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.article.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategorie =
      filterCategorie === "Tous" || cmd.categorie === filterCategorie;
    const matchStatut = filterStatut === "Tous" || cmd.statut === filterStatut;
    return matchSearch && matchCategorie && matchStatut;
  });

  // Stats
  const stats = {
    total: commandes.length,
    enCours: commandes.filter((c) => !["termine", "livre"].includes(c.statut))
      .length,
    enAttente: commandes.filter((c) => c.statut === "en_attente").length,
    terminees: commandes.filter((c) => c.statut === "termine").length,
  };

  const handleView = (commande: Commande) => {
    setSelectedCommande(commande);
    setIsViewModalOpen(true);
  };

  const handleEdit = (commande: Commande) => {
    setSelectedCommande(commande);
    setIsModalOpen(true);
  };

  const handleDelete = (commande: Commande) => {
    setSelectedCommande(commande);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCommande) {
      setCommandes(commandes.filter((c) => c.id !== selectedCommande.id));
      setIsDeleteModalOpen(false);
      setSelectedCommande(null);
    }
  };

  const handleCreate = () => {
    setSelectedCommande(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Commandes</h1>
          <p className="text-teal-600 mt-1">
            Gérez les commandes de votre atelier
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-teal-700 hover:bg-teal-600 text-white shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle commande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Total</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <Shirt className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">En cours</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.enCours}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">En attente</p>
                <p className="text-2xl font-bold text-amber-700">
                  {stats.enAttente}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">Terminées</p>
                <p className="text-2xl font-bold text-emerald-700">
                  {stats.terminees}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
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
                  placeholder="Rechercher par référence, client, article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#B5E5E8] focus:border-[#53B0B7] focus:ring-[#53B0B7]/30"
                />
              </div>
            </div>
            <Select value={filterCategorie} onValueChange={setFilterCategorie}>
              <SelectTrigger className="border-[#B5E5E8]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatut} onValueChange={setFilterStatut}>
              <SelectTrigger className="border-[#B5E5E8]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Tous les statuts</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
                <SelectItem value="assemblage">Assemblage</SelectItem>
                <SelectItem value="finitions">Finitions</SelectItem>
                <SelectItem value="essayage">Essayage</SelectItem>
                <SelectItem value="retouches">Retouches</SelectItem>
                <SelectItem value="termine">Terminé</SelectItem>
                <SelectItem value="livre">Livré</SelectItem>
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
                  <TableHead className="text-white font-bold">Client</TableHead>
                  <TableHead className="text-white font-bold">
                    Article
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Livraison
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Montant
                  </TableHead>
                  <TableHead className="text-white font-bold">Statut</TableHead>
                  <TableHead className="text-white font-bold">
                    Priorité
                  </TableHead>
                  <TableHead className="text-white font-bold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommandes.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-teal-600"
                    >
                      Aucune commande trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCommandes.map((commande, index) => {
                    const statutConfig = getStatutConfig(commande.statut);
                    const prioriteConfig = getPrioriteConfig(commande.priorite);
                    return (
                      <TableRow
                        key={commande.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#F0FAFA]"
                        } hover:bg-[#E0F5F6] transition-colors`}
                      >
                        <TableCell className="font-mono text-sm font-semibold text-teal-700">
                          {commande.reference}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-teal-800">
                              {commande.client.nom}
                            </p>
                            <p className="text-xs text-teal-600">
                              {commande.client.telephone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-teal-800">
                              {commande.article}
                            </p>
                            <p className="text-xs text-teal-600">
                              {commande.categorie}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-teal-700">
                          {formatDateFR(commande.dateLivraison)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold text-teal-800">
                              {formatXOF(commande.montant)}
                            </p>
                            <p className="text-xs text-teal-600">
                              Avance: {formatXOF(commande.avance)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${statutConfig.className} flex items-center gap-1 w-fit`}
                          >
                            {statutConfig.icon}
                            {statutConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={prioriteConfig.className}>
                            {prioriteConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              className="btn-action btn-action-view"
                              onClick={() => handleView(commande)}
                              title="Voir"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-edit"
                              onClick={() => handleEdit(commande)}
                              title="Modifier"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-document"
                              onClick={() => {}}
                              title="Mesures"
                            >
                              <Ruler size={16} />
                            </button>
                            <button
                              className="btn-action btn-action-delete"
                              onClick={() => handleDelete(commande)}
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
            totalItems={filteredCommandes.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Modal Voir Commande */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails de la commande"
        size="lg"
        variant="gradient"
      >
        {selectedCommande && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-teal-600">Référence</p>
                <p className="font-semibold text-teal-800">
                  {selectedCommande.reference}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-teal-600">Statut</p>
                <Badge
                  className={getStatutConfig(selectedCommande.statut).className}
                >
                  {getStatutConfig(selectedCommande.statut).label}
                </Badge>
              </div>
            </div>

            <div className="border-t border-[#B5E5E8] pt-4">
              <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                <User className="h-4 w-4" /> Client
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Nom</p>
                  <p className="font-medium text-teal-800">
                    {selectedCommande.client.nom}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Téléphone</p>
                  <p className="font-medium text-teal-800">
                    {selectedCommande.client.telephone}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#B5E5E8] pt-4">
              <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                <Shirt className="h-4 w-4" /> Article
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Article</p>
                  <p className="font-medium text-teal-800">
                    {selectedCommande.article}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Catégorie</p>
                  <p className="font-medium text-teal-800">
                    {selectedCommande.categorie}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#B5E5E8] pt-4">
              <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Dates & Paiement
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Date commande</p>
                  <p className="font-medium text-teal-800">
                    {formatDateFR(selectedCommande.dateCommande)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Date livraison</p>
                  <p className="font-medium text-teal-800">
                    {formatDateFR(selectedCommande.dateLivraison)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Montant total</p>
                  <p className="font-semibold text-teal-800">
                    {formatXOF(selectedCommande.montant)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-teal-600">Avance versée</p>
                  <p className="font-semibold text-emerald-600">
                    {formatXOF(selectedCommande.avance)}
                  </p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-sm text-teal-600">Reste à payer</p>
                  <p className="font-semibold text-amber-600">
                    {formatXOF(
                      selectedCommande.montant - selectedCommande.avance
                    )}
                  </p>
                </div>
              </div>
            </div>

            {selectedCommande.notes && (
              <div className="border-t border-[#B5E5E8] pt-4">
                <h4 className="font-semibold text-teal-800 mb-2">Notes</h4>
                <p className="text-teal-700 bg-[#F0FAFA] p-3 rounded-lg">
                  {selectedCommande.notes}
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

      {/* Modal Créer/Modifier Commande */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCommande ? "Modifier la commande" : "Nouvelle commande"}
        size="lg"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            cancelText="Annuler"
            confirmText={selectedCommande ? "Enregistrer" : "Créer"}
          />
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-teal-700">Client</Label>
              <Select defaultValue={selectedCommande?.client.nom}>
                <SelectTrigger className="mt-1 border-[#B5E5E8]">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mme Kouadio Aya">
                    Mme Kouadio Aya
                  </SelectItem>
                  <SelectItem value="M. Diallo Ibrahim">
                    M. Diallo Ibrahim
                  </SelectItem>
                  <SelectItem value="Mme Traoré Fatou">
                    Mme Traoré Fatou
                  </SelectItem>
                  <SelectItem value="M. Koné Amadou">M. Koné Amadou</SelectItem>
                  <SelectItem value="Mme Bamba Mariam">
                    Mme Bamba Mariam
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-teal-700">Article</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Robe de soirée"
                defaultValue={selectedCommande?.article}
              />
            </div>
            <div>
              <Label className="text-teal-700">Catégorie</Label>
              <Select defaultValue={selectedCommande?.categorie}>
                <SelectTrigger className="mt-1 border-[#B5E5E8]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c !== "Tous")
                    .map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-teal-700">Date de livraison</Label>
              <Input
                type="date"
                className="mt-1 border-[#B5E5E8]"
                defaultValue={selectedCommande?.dateLivraison}
              />
            </div>
            <div>
              <Label className="text-teal-700">Priorité</Label>
              <Select defaultValue={selectedCommande?.priorite || "normale"}>
                <SelectTrigger className="mt-1 border-[#B5E5E8]">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basse">Basse</SelectItem>
                  <SelectItem value="normale">Normale</SelectItem>
                  <SelectItem value="haute">Haute</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-teal-700">Montant total (FCFA)</Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="0"
                defaultValue={selectedCommande?.montant}
              />
            </div>
            <div>
              <Label className="text-teal-700">Avance (FCFA)</Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="0"
                defaultValue={selectedCommande?.avance}
              />
            </div>
            {selectedCommande && (
              <div className="col-span-2">
                <Label className="text-teal-700">Statut</Label>
                <Select defaultValue={selectedCommande.statut}>
                  <SelectTrigger className="mt-1 border-[#B5E5E8]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en_attente">En attente</SelectItem>
                    <SelectItem value="coupe">Coupe</SelectItem>
                    <SelectItem value="assemblage">Assemblage</SelectItem>
                    <SelectItem value="finitions">Finitions</SelectItem>
                    <SelectItem value="essayage">Essayage</SelectItem>
                    <SelectItem value="retouches">Retouches</SelectItem>
                    <SelectItem value="termine">Terminé</SelectItem>
                    <SelectItem value="livre">Livré</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="col-span-2">
              <Label className="text-teal-700">Notes / Description</Label>
              <Textarea
                className="mt-1 border-[#B5E5E8]"
                placeholder="Détails sur le vêtement, tissu, couleurs..."
                rows={3}
                defaultValue={selectedCommande?.notes}
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
          Êtes-vous sûr de vouloir supprimer la commande{" "}
          <strong>{selectedCommande?.reference}</strong> ? Cette action est
          irréversible.
        </p>
      </Modal>
    </div>
  );
}
